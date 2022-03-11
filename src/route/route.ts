import { on } from "../core/events"
import { promises } from "../core/promise"
import { hook } from "../core/utils"

interface AbstractRoute {
    path: string,
    regex: RegExp,
    _query: Object,
    _params: Object,
    param: Function,
    query: Function,
    location: Function
}

/**
 * Abstract route
 * @private
 * @const {Object}
 */
const _abstractRoute: AbstractRoute = {

    path: null,
    regex: null,

    _query: {},
    _params: {},

    /**
     * Retrieve route param value
     * @param name
     */
    param(name?: string): string {

        if (name === undefined) {
            return this._params
        }

        if (this._params[name] !== undefined) {
            return this._params[name]
        }

        return undefined
    },

    /**
     * Retrieve query value
     * @param name
     */
    query(name?: string): string {

        if (name === undefined) {
            return this._query
        }

        if (this._query[name] !== undefined) {
            return this._query[name]
        }

        return undefined
    },

    /**
     * Retrieve parsed route path location
     */
    location(): string {

        const params = this._params
        let location = this.path

        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                location = location.replace(':' + key, params[key])
            }
        }

        return location
    }

}

const _routes = []
let _active = _abstractRoute

export const options = {

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
 * Normalize string path
 * @param path
 * @param removeQuery
 */
function normalizePath(path: string, removeQuery?: boolean): string {

    path = path.replace(window.location.origin, '')
    path = path.replace(options.base, '')
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
 * @param match
 */
function paramsFor(path: string, match: { path: string }): Object {

    const params = {}

    const parts = normalizePath(match.path, true)
        .split('/')
        .filter(Boolean)

    const url = normalizePath(path, true)
        .split('/')
        .filter(Boolean)

    url.forEach(function (value: string, index: number) {
        if (parts[index] !== undefined && ':'.charCodeAt(0) === parts[index].charCodeAt(0)) {
            const key = parts[index].substring(1)
            params[key] = decodeURIComponent(value)
        }
    })

    return params
}

/**
 * Process URL and retrieve query params
 * @param location
 */
function queryFor(location: string): Object {

    const query = {}
    let search = (location.indexOf('?') !== -1) ? location.split('?')[1] : ''
    search = String(search).trim().replace(/^(\?|#|&)/, '')

    if (search === '') {
        return query
    }

    search.split('&').forEach(function (param) {

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
 * Add callback before each route transition
 * @param callback
 */
export function beforeChange(callback: Function) {
    hook('routeBeforeChange', callback)
}

/**
 * Add callback after each route transition
 * @param callback
 */
export function afterChange(callback: Function) {
    hook('routeAfterChange', callback)
}

/**
 * Add route to routes
 * @param definition
 */
export function add(definition: Array<Object> | Object) {

    if (Array.isArray(definition)) {
        return definition.forEach(function (item) {
            add(item)
        })
    }

    const route = Object.assign(
        {},
        _abstractRoute,
        definition
    )

    route.path = normalizePath(route.path, true)

    let regex = route.path
    const pattern = ['(:[a-zA-Z]+)']
    const replace = ['([^\/]+)']

    pattern.forEach(function (value, index) {
        regex = regex.replace(
            new RegExp(value, 'g'), replace[index]
        )
    })

    route.regex = new RegExp('^' + regex + '$', 'i')
    _routes.push(route)

}

/**
 * Process route change
 * @param location
 * @param replace
 */
export async function change(location: string, replace?: boolean) {

    const routeChange = function () {

        if (this.replace) {
            options.prevent = true

            if (options.mode === 'history') {
                history.pushState({}, null, this.location)
            } else {
                window.location.hash = this.location
            }

            options.prevent = false
        }

        const next = this.next

        if (!next) {
            return _active = null
        }

        const query = queryFor(this.location)
        const params = paramsFor(this.location, next)

        next._query = query
        next._params = params
        _active = next

    }

    try {

        location = normalizePath(location)

        const change = {
            previous: _active,
            next: match(location),
            location: location,
            replace: replace
        }

        // if (!change.next) {
        //     throw 'Route not found: ' + location
        // }

        await promises(change, [].concat(
            hook('routeBeforeChange'),
            [routeChange],
            hook('routeAfterChange')
        ))

    } catch (error) {
        console.warn('[V] Route error:', error)
    }

}

/**
 * Match the route based on given path
 * @param path
 */
export function match(path: string): null | Object {

    const url = normalizePath(path, true)
    let match = null

    for (let index = 0; index < _routes.length; index++) {
        const item = _routes[index]

        if (url.match(item.regex)) {
            match = item
            break
        }
    }

    return match
}

/**
 * Return the current active route
 */
export function active(): AbstractRoute {
    return _active
}

/**
 * Redirect route to given location path
 * @param toLocation
 */
export function redirect(toLocation: string) {
    return change(toLocation, true)
}

/**
 * Navigate on history
 * @param delta
 */
export function go(delta?: number) {
    window.history.go(delta)
}

/**
 * Go to the next route
 * @param delta
 */
export function forward(delta?: number) {
    go(delta === undefined ? 1 : delta)
}

/**
 * Go back to the previous route
 * @param delta
 */
export function back(delta?: number) {
    go(delta === undefined ? -1 : delta)
}

/**
 * Execute route change on popstate event
 */
function popstate() {

    if (options.prevent) {
        return
    }

    const path = (options.mode === 'hash')
        ? window.location.hash.replace('#', '')
        : window.location.href

    change(path)

}

/**
 * Execute route change on link click event
 * @param event
 */
function linkClick(event: KeyboardEvent) {

    const link = (event.target as HTMLAnchorElement).closest('a')
    const location = window.location

    const stripHash = function (location: Location | HTMLAnchorElement): String {
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
    if (options.mode !== 'hash'
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
export function attachEvents() {

    on(window, 'popstate', popstate)
    on(document, 'click', 'a', linkClick)

}