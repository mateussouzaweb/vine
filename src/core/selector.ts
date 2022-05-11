/**
 * Represents an element that can be selectable
 */
declare type Selectable = HTMLElement | Document

/**
 * Represents a context that can select child elements
 */
declare type Context = string | Selectable

/**
 * Retrieve the resolved valid context
 * @param context
 * @returns
 */
function getContext(context?: Context) {
    context = (typeof context === 'string') ? $(context) : context
    context = (context instanceof Node) ? context : document
    return context as Selectable
}

/**
 * Select a single element
 * @param selector
 * @param context
 * @returns
 */
function $(selector: string, context?: Context) {
    return getContext(context).querySelector(selector) as Selectable
}

/**
 * Select multiple elements
 * @param selector
 * @param context
 * @returns
 */
function $$(selector: any, context?: Context) {

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

export type { Selectable, Context }
export { $, $$ }
