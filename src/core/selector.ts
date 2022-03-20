declare type Selectable = HTMLElement | Element | Document
declare type Context = string | Selectable

export type { Selectable, Context }

/**
 * Retrieve the resolved valid context
 * @param context
 * @returns
 */
function getContext(context?: Context): Selectable {
    context = (typeof context === 'string') ? $(context) : context
    context = (context instanceof Node) ? context : document
    return context
}

/**
 * Select an single element
 * @param selector
 * @param context
 * @returns
 */
export function $(selector: string, context?: Context) {
    return getContext(context).querySelector(selector)
}

/**
 * Select multiple elements
 * @param selector
 * @param context
 * @returns
 */
export function $$(selector: any, context?: Context) {

    const items: Array<Selectable> = []

    if (typeof selector === 'string') {
        selector = getContext(context).querySelectorAll(selector)
    }

    if (selector instanceof Node) {
        items.push(selector as Selectable)
    }

    if (selector instanceof NodeList) {
        Array.prototype.forEach.call(selector, (item: Selectable) => {
            items.push(item)
        })
    }

    return items
}