import { fire, watch } from '../core/observers'

/**
 * Represents a HTTP request
 */
declare interface HTTPRequest extends RequestInit {
    method: string
    url: string
    data: BodyInit
    headers: HeadersInit
}

/**
 * Represents the result of a HTTP request
 */
declare interface HTTPResult {
    request: HTTPRequest
    response: Response
    body: any
}

/**
 * Callback to be executed when HTTP events are intercepted
 */
declare type HTTPCallback = (details: HTTPRequest | HTTPResult) => void | Promise<void>

/**
 * Add interceptor callback before each HTTP request
 * @param callback
 */
function interceptBefore(callback: HTTPCallback) {
    watch('HTTP', 'HTTPInterceptBefore', callback)
}

/**
 * Add interceptor callback after each HTTP request
 * @param callback
 */
function interceptAfter(callback: HTTPCallback) {
    watch('HTTP', 'HTTPInterceptAfter', callback)
}

/**
 * Make a HTTP request with given method
 * @param method
 * @param url
 * @param data
 * @param headers
 * @returns
 */
async function request(method: string, url: string, data?: BodyInit, headers?: HeadersInit): Promise<any> {

    const request: HTTPRequest = {
        method: method,
        url: url,
        data: data,
        headers: headers
    }

    await fire('HTTPInterceptBefore', request)
    const options = {
        ...request
    }

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

        let query = ''

        if (typeof request.data === 'string') {
            query = request.data
        } else if (request.data) {
            query = Object.keys(request.data).map((k) => {
                const _k = encodeURIComponent(k)
                const _v = encodeURIComponent(request.data[k])
                return _k + "=" + _v
            }).join('&')
        }

        if (query) {
            request.url += '?' + query
        }

    }

    const response = await fetch(request.url, options)
    let body = await response.text()

    try {
        const json = JSON.parse(body)
        body = json
    } catch (error) {
    }

    const details: HTTPResult = {
        request: request,
        response: response,
        body: body
    }

    await fire('HTTPInterceptAfter', details)

    if (!response.ok) {
        throw details
    }

    return body
}

/**
 * Make a HTTP OPTIONS request
 * @param url
 * @param data
 * @param headers
 * @returns
 */
async function options(url: string, data?: BodyInit, headers?: HeadersInit) {
    return await request('OPTIONS', url, data, headers)
}

/**
 * Make a HTTP HEAD request
 * @param url
 * @param data
 * @param headers
 * @returns
 */
async function head(url: string, data?: BodyInit, headers?: HeadersInit) {
    return await request('HEAD', url, data, headers)
}

/**
 * Make a HTTP GET request
 * @param url
 * @param data
 * @param headers
 * @returns
 */
async function get(url: string, data?: BodyInit, headers?: HeadersInit) {
    return await request('GET', url, data, headers)
}

/**
 * Make a HTTP POST request
 * @param url
 * @param data
 * @param headers
 * @returns
 */
async function post(url: string, data?: BodyInit, headers?: HeadersInit) {
    return await request('POST', url, data, headers)
}

/**
 * Make a HTTP PUT request
 * @param url
 * @param data
 * @param headers
 * @returns
 */
async function put(url: string, data?: BodyInit, headers?: HeadersInit) {
    return await request('PUT', url, data, headers)
}

/**
 * Make a HTTP PATCH request
 * @param url
 * @param data
 * @param headers
 * @returns
 */
async function patch(url: string, data?: BodyInit, headers?: HeadersInit) {
    return await request('PATCH', url, data, headers)
}

/**
 * Make a HTTP DELETE request
 * @param url
 * @param data
 * @param headers
 * @returns
 */
async function _delete(url: string, data?: BodyInit, headers?: HeadersInit) {
    return await request('DELETE', url, data, headers)
}

export type { HTTPRequest, HTTPResult, HTTPCallback }

export const HTTP = {
    interceptBefore,
    interceptAfter,
    request,
    options,
    head,
    get,
    post,
    put,
    patch,
    _delete
}