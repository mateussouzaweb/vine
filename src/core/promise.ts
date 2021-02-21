/**
 * Simple fake promise
 */
export async function fakePromise() {}

/**
 * Take a normal function callback and make it async
 * @param scope
 * @param callback
 * @param data
 */
export async function promisify(scope: Object, callback: () => void, data?: any) {
    try {
        return await callback.apply(scope, data)
    } catch (error) {
        return Promise.reject(error)
    }
}

/**
 * Wait the resolution of various promisify callbacks
 * @param scope
 * @param callbacks
 */
export async function promises(scope: Object, callbacks: Array<() => void>): Promise<Object> {

    var promises = []

    for (let index = 0; index < callbacks.length; index++) {
        if( typeof callbacks[index] === 'function' ){
            promises.push(
                promisify(scope, callbacks[index])
            )
        }
    }

    await Promise.all(promises)

    return scope
}