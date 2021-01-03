import {promises} from "../core/promise"
import {hook} from "../core/utils"

interface RequestObject {
    method: string
    url: string
    data: BodyInit
    headers: HeadersInit
    options: RequestInit
    response: Response | null
}

/**
 * Add interceptor callback before each HTTP request
 * @param callback
 */
export function interceptBefore(callback: Function) {
    hook('httpInterceptBefore', callback)
}

/**
 * Add interceptor callback after each HTTP request
 * @param callback
 */
export function interceptAfter(callback: Function) {
    hook('httpInterceptAfter', callback)
}

/**
 * Make HTTP requests
 * @param method
 * @param url
 * @param data
 * @param headers
 */
export async function request(method: string, url: string, data?: BodyInit, headers?: HeadersInit) {

    var request: RequestObject = {
        method: method,
        url: url,
        data: data,
        headers: headers,
        options: {},
        response: null
    }

    await promises(request, hook('httpInterceptBefore'))

    if (request.headers) {
        request.options.headers = request.headers
    }
    if (request.method) {
        request.options.method = request.method
    }

    if (request.options.method != 'GET') {

        if( request.data instanceof FormData == false ){
            request.data = JSON.stringify(request.data)
        }

        request.options.body = request.data

    } else {

        var query = ''

        if( typeof request.data == 'string' ){
            query = request.data
        }else if( request.data ){
            query = Object.keys(request.data).map(function (k) {
                var _k = encodeURIComponent(k)
                var _v = encodeURIComponent(request.data[k])
                return _k + "=" + _v
            }).join('&')
        }

        if (query) {
            request.url += '?' + query
        }

    }

    return fetch(request.url, request.options)
    .then(async function (response) {
        request.response = response
        await promises(request, hook('httpInterceptAfter'))
        return request.response
    })
    .then(async function (response) {

        if (!response.ok) {
            throw response
        }

        const text = await response.text()
        try {
            var json = JSON.parse(text)
            return json
        } catch (error) {
            return text
        }
    })
}

/**
 * Make OPTIONS HTTP requests
 * @param url
 * @param data
 * @param headers
 */
export function options(url: string, data?: BodyInit, headers?: HeadersInit) {
    return request('OPTIONS', url, data, headers)
}

/**
 * Make HEAD HTTP requests
 * @param url
 * @param data
 * @param headers
 */
export function head(url: string, data?: BodyInit, headers?: HeadersInit) {
    return request('HEAD', url, data, headers)
}

/**
 * Make GET HTTP requests
 * @param url
 * @param data
 * @param headers
 */
export function get(url: string, data?: BodyInit, headers?: HeadersInit) {
    return request('GET', url, data, headers)
}

/**
 * Make POST HTTP requests
 * @param url
 * @param data
 * @param headers
 */
export function post(url: string, data?: BodyInit, headers?: HeadersInit) {
    return request('POST', url, data, headers)
}

/**
 * Make PUT HTTP requests
 * @param url
 * @param data
 * @param headers
 */
export function put(url: string, data?: BodyInit, headers?: HeadersInit) {
    return request('PUT', url, data, headers)
}

/**
 * Make PATCH HTTP requests
 * @param url
 * @param data
 * @param headers
 */
export function patch(url: string, data?: BodyInit, headers?: HeadersInit) {
    return request('PATCH', url, data, headers)
}

/**
 * Make DELETE HTTP requests
 * @param url
 * @param data
 * @param headers
 */
export function _delete(url: string, data?: BodyInit, headers?: HeadersInit) {
    return request('DELETE', url, data, headers)
}