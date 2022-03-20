declare interface RequestDetails extends RequestInit {
    method: string
    url: string
    data: BodyInit
    headers: HeadersInit
}

declare interface ResponseDetails {
    request: RequestDetails
    response: Response
    body: string
}

declare type Callback = (details: RequestDetails | ResponseDetails) => void | Promise<void>

let _before: Array<Callback> = []
let _after: Array<Callback> = []

/**
 * Add interceptor callback before each HTTP request
 * @param callback
 */
export function interceptBefore(callback: Callback) {
    _before.push(callback)
}

/**
 * Add interceptor callback after each HTTP request
 * @param callback
 */
export function interceptAfter(callback: Callback) {
    _after.push(callback)
}

/**
 * Make HTTP requests
 * @param method
 * @param url
 * @param data
 * @param headers
 * @returns
 */
export async function request(method: string, url: string, data?: BodyInit, headers?: HeadersInit) {

    const request: RequestDetails = {
        method: method,
        url: url,
        data: data,
        headers: headers
    }

    const runInterceptors = async (callbacks: Array<Callback>, data: RequestDetails | ResponseDetails) => {
        for (const callback of callbacks) {
            try {
                await callback.apply({}, data)
            } catch (error) {
                return Promise.reject(error)
            }
        }
    }

    await runInterceptors(_before, request)
    const options = Object.assign({}, request)

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

    const details: ResponseDetails = {
        request: request,
        response: response,
        body: body
    }

    await runInterceptors(_after, details)

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
 * @returns
 */
export async function options(url: string, data?: BodyInit, headers?: HeadersInit) {
    return await request('OPTIONS', url, data, headers)
}

/**
 * Make HEAD HTTP requests
 * @param url
 * @param data
 * @param headers
 * @returns
 */
export async function head(url: string, data?: BodyInit, headers?: HeadersInit) {
    return await request('HEAD', url, data, headers)
}

/**
 * Make GET HTTP requests
 * @param url
 * @param data
 * @param headers
 * @returns
 */
export async function get(url: string, data?: BodyInit, headers?: HeadersInit) {
    return await request('GET', url, data, headers)
}

/**
 * Make POST HTTP requests
 * @param url
 * @param data
 * @param headers
 * @returns
 */
export async function post(url: string, data?: BodyInit, headers?: HeadersInit) {
    return await request('POST', url, data, headers)
}

/**
 * Make PUT HTTP requests
 * @param url
 * @param data
 * @param headers
 * @returns
 */
export async function put(url: string, data?: BodyInit, headers?: HeadersInit) {
    return await request('PUT', url, data, headers)
}

/**
 * Make PATCH HTTP requests
 * @param url
 * @param data
 * @param headers
 * @returns
 */
export async function patch(url: string, data?: BodyInit, headers?: HeadersInit) {
    return await request('PATCH', url, data, headers)
}

/**
 * Make DELETE HTTP requests
 * @param url
 * @param data
 * @param headers
 * @returns
 */
export async function _delete(url: string, data?: BodyInit, headers?: HeadersInit) {
    return await request('DELETE', url, data, headers)
}