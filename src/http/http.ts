import { promises } from "../core/promise"
import { hook } from "../core/utils"

interface RequestObject extends RequestInit {
    method: string
    url: string
    data: BodyInit
    headers: HeadersInit
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
        headers: headers
    }

    await promises(request, hook('httpInterceptBefore'))

    var options = Object.assign({}, request)

    delete options.url
    delete options.data

    if (options.method != 'GET') {

        if (options.body === undefined || options.body === null) {
            options.body = request.data

            if (options.body instanceof FormData === false) {
                options.body = JSON.stringify(options.body)
                options.headers['Content-Type'] = 'application/json; charset=utf8'
            }
        }

    } else {

        var query = ''

        if (typeof request.data === 'string') {
            query = request.data
        } else if (request.data) {
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

    var response = await fetch(request.url, options)
    var body = await response.text()

    try {
        var json = JSON.parse(body)
        body = json
    } catch (error) {
    }

    var details = {
        request: request,
        response: response,
        body: body
    }

    await promises(details, hook('httpInterceptAfter'))

    if (!response.ok) {
        throw details
    }

    return body
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