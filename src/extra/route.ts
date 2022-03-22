import { on } from "../core/events"
import { fire, watch } from "../core/observers"

declare interface RoutePath {
    path: string
    regex?: RegExp
    location?: string,
    [key: string]: any
}

declare interface RouteChange {
    previous: RoutePath,
    next: RoutePath,
    toLocation: string,
    replace: boolean
}

declare type RouteCallback = (change: RouteChange) => void | Promise<void>

let _routes: Array<RoutePath> = []
let _active: RoutePath

const _options = {

    /**
     * Route mode definition
     */
    mode: window.history.pushState ? 'history' : 'hash',

    /**
     * Route base URL
     */
    base: '',

    /**
     * Route change prevention
     */
    prevent: false

}

/**
 * Add callback before each route transition
 * @param callback
 */
function beforeChange(callback: RouteCallback) {
    watch('RouteChangeBefore', callback)
}

/**
 * Add callback after each route transition
 * @param callback
 */
function afterChange(callback: RouteCallback) {
    watch('RouteChangeAfter', callback)
}

/**
 * Normalize string path
 * @param path
 * @param removeQuery
 * @returns
 */
function normalizePath(path: string, removeQuery?: boolean) {

    path = path.replace(window.location.origin, '')
    path = path.replace(_options.base, '')
    path = path.replace('/?', '?')
    path = path.replace(new RegExp('[/]*$'), '')
    path = path.replace(new RegExp('^[/]*'), '')
    path = ('/' + path).replace('//', '/')

    if (removeQuery) {
        path = path.split('?')[0]
    }

    return path
}

/**
 * Process URL and retrieve route params
 * @param path
 * @param format
 * @returns
 */
function paramsFor(path: string, format: string) {

    const url = normalizePath(path, true)
        .split('/')
        .filter(Boolean)

    const parts = normalizePath(format, true)
        .split('/')
        .filter(Boolean)

    const params: Record<string, string> = {}
    url.forEach((value: string, index: number) => {
        if (parts[index] !== undefined
            && ':'.charCodeAt(0) === parts[index].charCodeAt(0)) {
            const key = parts[index].substring(1)
            params[key] = decodeURIComponent(value)
        }
    })

    return params
}

/**
 * Process URL and retrieve query params
 * @param location
 * @returns
 */
function queryFor(location: string) {

    const query: Record<string, string> = {}
    let search = (location.indexOf('?') !== -1) ? location.split('?')[1] : ''
    search = String(search).trim().replace(/^(\?|#|&)/, '')

    if (search === '') {
        return query
    }

    search.split('&').forEach((param) => {

        const parts = param.replace(/\+/g, ' ').split('=')
        const key = decodeURIComponent(parts.shift())
        const value = parts.length > 0 ? decodeURIComponent(parts.join('=')) : null

        if (query[key] === undefined) {
            query[key] = value
        }

    })

    return query
}

/**
 * Retrieve route param value
 * @param name
 * @param route
 * @returns
 */
function getParam(name?: string, route?: RoutePath) {

    if (route === undefined) {
        route = active()
    }

    const params = paramsFor(route.location, route.path)

    if (name === undefined) {
        return params
    }

    return params[name]
}

/**
 * Retrieve query value
 * @param name
 * @param route
 * @returns
 */
function getQuery(name?: string, route?: RoutePath) {

    if (route === undefined) {
        route = active()
    }

    const query = queryFor(route.location)

    if (name === undefined) {
        return query
    }

    return query[name]
}

/**
 * Create and retrieve parsed route path location
 * @param route
 * @param params
 * @returns
 */
function getLocation(route?: RoutePath, params?: Record<string, string>) {

    if (route === undefined) {
        route = active()
    }

    let theParams = (params !== undefined) ? params : paramsFor(route.location, route.path)
    let location = route.path

    for (const key in theParams) {
        if (theParams.hasOwnProperty(key)) {
            location = location.replace(':' + key, theParams[key])
        }
    }

    return location
}

/**
 * Add route to routes
 * @param definition
 */
function add(definition: RoutePath) {

    const route: RoutePath = Object.assign({
        path: '',
        regex: ''
    }, definition)

    route.path = normalizePath(route.path, true)

    let regex = route.path
    const pattern = ['(:[a-zA-Z]+)']
    const replace = ['([^\/]+)']

    pattern.forEach((value, index) => {
        regex = regex.replace(
            new RegExp(value, 'g'), replace[index]
        )
    })

    route.regex = new RegExp('^' + regex + '$', 'i')
    _routes.push(route)

}

/**
 * Match and return the route based on given path
 * @param path
 * @returns
 */
function match(path: string): null | RoutePath {

    const url = normalizePath(path, true)
    let match = null

    for (const item of _routes) {
        if (url.match(item.regex)) {
            match = item
            break
        }
    }

    return match
}

/**
 * Return the current active route
 * @returns
 */
function active(): RoutePath {

    if (_active === null || _active === undefined) {
        _active = { path: '', regex: new RegExp(''), location: '' }
    }

    return _active
}

/**
 * Process route change
 * @param toLocation
 * @param replace
 */
async function change(toLocation: string, replace?: boolean) {

    const next = match(toLocation)
    if (next !== null) {
        next.location = toLocation
    }

    const change: RouteChange = {
        previous: _active,
        next: next,
        toLocation: normalizePath(toLocation),
        replace: replace
    }

    await fire('RouteChangeBefore', change)

    if (change.replace) {
        _options.prevent = true

        if (_options.mode === 'history') {
            history.pushState({}, null, change.toLocation)
        } else {
            window.location.hash = change.toLocation
        }

        _options.prevent = false
    }

    _active = (change.next) ? change.next : null

    await fire('RouteChangeAfter', change)

}

/**
 * Redirect route to given location path
 * @param toLocation
 */
function redirect(toLocation: string) {
    return change(toLocation, true)
}

/**
 * Navigate on history
 * @param delta
 */
function go(delta?: number) {
    window.history.go(delta)
}

/**
 * Go to the next route
 * @param delta
 */
function forward(delta?: number) {
    go(delta === undefined ? 1 : delta)
}

/**
 * Go back to the previous route
 * @param delta
 */
function back(delta?: number) {
    go(delta === undefined ? -1 : delta)
}

/**
 * Execute route change on popstate event
 */
function onPopState() {

    if (_options.prevent) {
        return
    }

    return change(
        (_options.mode === 'hash')
            ? window.location.hash.replace('#', '')
            : window.location.href
    )
}

/**
 * Execute route change on link click event
 * @param event
 */
function onLinkClick(event: MouseEvent) {

    const link = (event.target as HTMLAnchorElement).closest('a')
    const location = window.location

    const stripHash = (location: Location | HTMLAnchorElement) => {
        return location.href.replace(/#.*/, '')
    }

    // Middle click, cmd click, and ctrl click should open
    // links in a new tab as normal.
    if (event.metaKey
        || event.ctrlKey
        || event.shiftKey
        || event.altKey) {
        return
    }

    // Ignore cross origin links
    if (link.protocol && location.protocol !== link.protocol
        || link.hostname && location.hostname !== link.hostname) {
        return
    }

    // Ignore case when a hash is being tacked on the current URL
    if (_options.mode !== 'hash'
        && link.href
        && link.href.indexOf('#') > -1
        && stripHash(link) === stripHash(location)) {
        return
    }

    // Ignore when opening a new or in the same tab
    // _blank, _self, ...
    if (link.target
        && link.target !== '') {
        return
    }

    // Ignore event with default prevented
    if (event.defaultPrevented) {
        return
    }

    redirect(link.href)
    event.preventDefault()

}

/**
 * Attach events route automation
 */
function attachEvents() {
    on(window, 'popstate', onPopState)
    on(document, 'click', 'a', onLinkClick)
}

/**
 * Init route by setting options and attaching events
 * @param options
 */
function init(options: Record<string, string>) {

    Object.keys(options).map((key) => {
        _options[key] = options[key]
    })

    attachEvents()
}

export type { RoutePath, RouteChange, RouteCallback }
export const Route = {
    beforeChange,
    afterChange,
    normalizePath,
    paramsFor,
    queryFor,
    getParam,
    getQuery,
    getLocation,
    add,
    match,
    change,
    active,
    redirect,
    go,
    forward,
    back,
    init
}