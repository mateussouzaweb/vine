type Context = HTMLElement | Document
type SelectorContext = string | HTMLElement | Document

/**
 * Retrieve the resolved valid context
 * @param context
 */
function getContext(context: SelectorContext): Context {
    context = (typeof context === 'string') ? $(context) : context
    context = (context instanceof Node) ? context : document
    return context
}

/**
 * Select an single element
 * @param selector
 * @param context
 */
export function $(selector: string, context?: SelectorContext): HTMLElement {
    return getContext(context).querySelector(selector)
}

/**
 * Select multiples elements
 * @param selector
 * @param context
 */
export function $$(selector: string, context?: SelectorContext): NodeListOf<HTMLElement> {
    return getContext(context).querySelectorAll(selector)
}

/**
 * Parse selector and return array of items
 * @param element
 * @param context
 */
export function $$$(element: any, context?: SelectorContext): Array<HTMLElement> {

    var items = []

    if (typeof element === 'string') {
        element = $$(element, context)
    }

    if (element instanceof Window) {
        items.push(element)
    }

    if (element instanceof Document) {
        items.push(element)
    }

    if (element instanceof Element) {
        items.push(element)
    }

    if (element instanceof NodeList) {
        Array.prototype.forEach.call(element, function (item: HTMLElement) {
            items.push(item)
        })
    }

    return items
}