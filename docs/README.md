<a name="V"></a>

## V
Vanilla UI core lib

**Kind**: global variable  

* [V](#V)
    * [.http](#V.http)
        * [.interceptBefore(callback)](#V.http.interceptBefore) ⇒ <code>void</code>
        * [.interceptAfter(callback)](#V.http.interceptAfter) ⇒ <code>void</code>
        * [.request(method, url, data, headers)](#V.http.request) ⇒ <code>Promise</code>
        * [.get(url, data, headers)](#V.http.get) ⇒ <code>Promise</code>
        * [.post(url, data, headers)](#V.http.post) ⇒ <code>Promise</code>
        * [.put(url, data, headers)](#V.http.put) ⇒ <code>Promise</code>
        * [.delete(url, data, headers)](#V.http.delete) ⇒ <code>Promise</code>
    * [.router](#V.router)
        * [.beforeChange(callback)](#V.router.beforeChange) ⇒ <code>Void</code>
        * [.afterChange(callback)](#V.router.afterChange) ⇒ <code>Void</code>
        * [.normalizePath(path, removeQuery)](#V.router.normalizePath) ⇒ <code>String</code>
        * [.add(definition)](#V.router.add) ⇒ <code>void</code>
        * [.change(location, replace)](#V.router.change) ⇒ <code>Void</code>
        * [.retrieveParamsFor(path, match)](#V.router.retrieveParamsFor) ⇒ <code>Object</code>
        * [.retrieveQueryFor(search)](#V.router.retrieveQueryFor) ⇒ <code>Object</code>
        * [.getMatch(path)](#V.router.getMatch) ⇒ <code>Null</code> \| <code>Object</code>
        * [.redirect(location)](#V.router.redirect) ⇒ <code>void</code>
        * [.goBack(level)](#V.router.goBack) ⇒ <code>void</code>
    * [.local](#V.local)
        * [.set(name, value)](#V.local.set) ⇒ <code>Object</code>
        * [.get(name, parse)](#V.local.get) ⇒ <code>Mixed</code>
    * [.session](#V.session)
        * [.set(name, value)](#V.session.set) ⇒ <code>Object</code>
        * [.get(name, parse)](#V.session.get) ⇒ <code>Mixed</code>
    * [.beforeConstructor(callback)](#V.beforeConstructor) ⇒ <code>void</code>
    * [.afterConstructor(callback)](#V.afterConstructor) ⇒ <code>void</code>
    * [.beforeDestructor(callback)](#V.beforeDestructor) ⇒ <code>void</code>
    * [.afterDestructor(callback)](#V.afterDestructor) ⇒ <code>void</code>
    * [.component(selector, data)](#V.component) ⇒ <code>Promise</code>
        * [.element](#V.component.element) : <code>Node</code>
        * [.element](#V.component.element) : <code>String</code>
        * [.constructor(resolve, reject)](#V.component.constructor) ⇒ <code>Promise</code>
        * [.destructor(resolve, reject)](#V.component.destructor) ⇒ <code>Promise</code>
        * [.beforeDestroy(resolve, reject)](#V.component.beforeDestroy) ⇒ <code>Promise</code>
        * [.onDestroy(resolve, reject)](#V.component.onDestroy) ⇒ <code>Promise</code>
        * [.afterDestroy(resolve, reject)](#V.component.afterDestroy) ⇒ <code>Promise</code>
        * [.on(event, selector, callback)](#V.component.on) ⇒ <code>void</code>
        * [.off(event, selector)](#V.component.off) ⇒ <code>void</code>
        * [.beforeMount(resolve, reject)](#V.component.beforeMount) ⇒ <code>Promise</code>
        * [.onMount(resolve, reject)](#V.component.onMount) ⇒ <code>Promise</code>
        * [.afterMount(resolve, reject)](#V.component.afterMount) ⇒ <code>Promise</code>
        * [.shouldRender(resolve, reject)](#V.component.shouldRender) ⇒ <code>Promise</code>
        * [.beforeRender(resolve, reject)](#V.component.beforeRender) ⇒ <code>Promise</code>
        * [.onRender(resolve, reject)](#V.component.onRender) ⇒ <code>Promise</code>
        * [.afterRender(resolve, reject)](#V.component.afterRender) ⇒ <code>Promise</code>
        * [.set(key, value)](#V.component.set) ⇒ <code>Object</code>
        * [.get(key, defaultValue)](#V.component.get) ⇒ <code>mixed</code>
    * [.removeComponent(selector)](#V.removeComponent) ⇒ <code>Promise</code>
    * [.beforeDestroy(callback)](#V.beforeDestroy) ⇒ <code>void</code>
    * [.afterDestroy(callback)](#V.afterDestroy) ⇒ <code>void</code>
    * [.destroy(target)](#V.destroy) ⇒ <code>Promise</code>
    * [.beforeMount(callback)](#V.beforeMount) ⇒ <code>void</code>
    * [.afterMount(callback)](#V.afterMount) ⇒ <code>void</code>
    * [.mount(target)](#V.mount) ⇒ <code>Promise</code>
    * [.beforeRender(callback)](#V.beforeRender) ⇒ <code>void</code>
    * [.afterRender(callback)](#V.afterRender) ⇒ <code>void</code>
    * [.each(items, callback)](#V.each) ⇒ <code>void</code>
    * [.extend(library, plugin)](#V.extend) ⇒ <code>void</code>
    * [.promisify(scope, callback)](#V.promisify) ⇒ <code>Promise</code>
    * [.fakePromise(resolve)](#V.fakePromise) ⇒ <code>void</code>
    * [.on(element, event, selector, callback)](#V.on) ⇒ <code>function</code>
    * [.off(element, event, selector, callback)](#V.off) ⇒ <code>function</code>
    * [.trigger(element, event)](#V.trigger) ⇒ <code>void</code>
    * [.$(selector, context)](#V.$) ⇒ <code>Node</code>
    * [.$$(selector, context)](#V.$$) ⇒ <code>NodeList</code>
    * [.items(element, context)](#V.items) ⇒ <code>Array</code>

<a name="V.http"></a>

### V.http
HTTP request lib

**Kind**: static property of [<code>V</code>](#V)  

* [.http](#V.http)
    * [.interceptBefore(callback)](#V.http.interceptBefore) ⇒ <code>void</code>
    * [.interceptAfter(callback)](#V.http.interceptAfter) ⇒ <code>void</code>
    * [.request(method, url, data, headers)](#V.http.request) ⇒ <code>Promise</code>
    * [.get(url, data, headers)](#V.http.get) ⇒ <code>Promise</code>
    * [.post(url, data, headers)](#V.http.post) ⇒ <code>Promise</code>
    * [.put(url, data, headers)](#V.http.put) ⇒ <code>Promise</code>
    * [.delete(url, data, headers)](#V.http.delete) ⇒ <code>Promise</code>

<a name="V.http.interceptBefore"></a>

#### http.interceptBefore(callback) ⇒ <code>void</code>
Add interceptor callback before each HTTP request

**Kind**: static method of [<code>http</code>](#V.http)  
**Access**: public  

| Param | Type |
| --- | --- |
| callback | <code>function</code> | 

<a name="V.http.interceptAfter"></a>

#### http.interceptAfter(callback) ⇒ <code>void</code>
Add interceptor callback after each HTTP request

**Kind**: static method of [<code>http</code>](#V.http)  
**Access**: public  

| Param | Type |
| --- | --- |
| callback | <code>function</code> | 

<a name="V.http.request"></a>

#### http.request(method, url, data, headers) ⇒ <code>Promise</code>
Make HTTP requests

**Kind**: static method of [<code>http</code>](#V.http)  
**Access**: public  

| Param | Type |
| --- | --- |
| method | <code>String</code> | 
| url | <code>String</code> | 
| data | <code>Object</code> | 
| headers | <code>Object</code> | 

<a name="V.http.get"></a>

#### http.get(url, data, headers) ⇒ <code>Promise</code>
Make GET HTTP requests

**Kind**: static method of [<code>http</code>](#V.http)  
**Access**: public  

| Param | Type |
| --- | --- |
| url | <code>String</code> | 
| data | <code>Object</code> | 
| headers | <code>Object</code> | 

<a name="V.http.post"></a>

#### http.post(url, data, headers) ⇒ <code>Promise</code>
Make POST HTTP requests

**Kind**: static method of [<code>http</code>](#V.http)  
**Access**: public  

| Param | Type |
| --- | --- |
| url | <code>String</code> | 
| data | <code>Object</code> | 
| headers | <code>Object</code> | 

<a name="V.http.put"></a>

#### http.put(url, data, headers) ⇒ <code>Promise</code>
Make PUT HTTP requests

**Kind**: static method of [<code>http</code>](#V.http)  
**Access**: public  

| Param | Type |
| --- | --- |
| url | <code>String</code> | 
| data | <code>Object</code> | 
| headers | <code>Object</code> | 

<a name="V.http.delete"></a>

#### http.delete(url, data, headers) ⇒ <code>Promise</code>
Make DELETE HTTP requests

**Kind**: static method of [<code>http</code>](#V.http)  
**Access**: public  

| Param | Type |
| --- | --- |
| url | <code>String</code> | 
| data | <code>Object</code> | 
| headers | <code>Object</code> | 

<a name="V.router"></a>

### V.router
HTTP router lib

**Kind**: static property of [<code>V</code>](#V)  

* [.router](#V.router)
    * [.beforeChange(callback)](#V.router.beforeChange) ⇒ <code>Void</code>
    * [.afterChange(callback)](#V.router.afterChange) ⇒ <code>Void</code>
    * [.normalizePath(path, removeQuery)](#V.router.normalizePath) ⇒ <code>String</code>
    * [.add(definition)](#V.router.add) ⇒ <code>void</code>
    * [.change(location, replace)](#V.router.change) ⇒ <code>Void</code>
    * [.retrieveParamsFor(path, match)](#V.router.retrieveParamsFor) ⇒ <code>Object</code>
    * [.retrieveQueryFor(search)](#V.router.retrieveQueryFor) ⇒ <code>Object</code>
    * [.getMatch(path)](#V.router.getMatch) ⇒ <code>Null</code> \| <code>Object</code>
    * [.redirect(location)](#V.router.redirect) ⇒ <code>void</code>
    * [.goBack(level)](#V.router.goBack) ⇒ <code>void</code>

<a name="V.router.beforeChange"></a>

#### router.beforeChange(callback) ⇒ <code>Void</code>
Add callback before each route transition

**Kind**: static method of [<code>router</code>](#V.router)  
**Access**: public  

| Param | Type |
| --- | --- |
| callback | <code>function</code> | 

<a name="V.router.afterChange"></a>

#### router.afterChange(callback) ⇒ <code>Void</code>
Add callback after each route transition

**Kind**: static method of [<code>router</code>](#V.router)  
**Access**: public  

| Param | Type |
| --- | --- |
| callback | <code>function</code> | 

<a name="V.router.normalizePath"></a>

#### router.normalizePath(path, removeQuery) ⇒ <code>String</code>
Normalize string path

**Kind**: static method of [<code>router</code>](#V.router)  
**Access**: public  

| Param | Type |
| --- | --- |
| path | <code>String</code> | 
| removeQuery | <code>Boolean</code> | 

<a name="V.router.add"></a>

#### router.add(definition) ⇒ <code>void</code>
Add route to routes

**Kind**: static method of [<code>router</code>](#V.router)  
**Access**: public  

| Param | Type |
| --- | --- |
| definition | <code>Object</code> | 

<a name="V.router.change"></a>

#### router.change(location, replace) ⇒ <code>Void</code>
Process route change

**Kind**: static method of [<code>router</code>](#V.router)  
**Access**: public  

| Param | Type |
| --- | --- |
| location | <code>String</code> | 
| replace | <code>Boolean</code> | 

<a name="V.router.retrieveParamsFor"></a>

#### router.retrieveParamsFor(path, match) ⇒ <code>Object</code>
Process URL and retrieve route params

**Kind**: static method of [<code>router</code>](#V.router)  
**Access**: public  

| Param | Type |
| --- | --- |
| path | <code>String</code> | 
| match | <code>Object</code> | 

<a name="V.router.retrieveQueryFor"></a>

#### router.retrieveQueryFor(search) ⇒ <code>Object</code>
Process URL and retrieve query params

**Kind**: static method of [<code>router</code>](#V.router)  
**Access**: public  

| Param | Type |
| --- | --- |
| search | <code>String</code> | 

<a name="V.router.getMatch"></a>

#### router.getMatch(path) ⇒ <code>Null</code> \| <code>Object</code>
Match the route based on given path

**Kind**: static method of [<code>router</code>](#V.router)  
**Access**: public  

| Param | Type |
| --- | --- |
| path | <code>String</code> | 

<a name="V.router.redirect"></a>

#### router.redirect(location) ⇒ <code>void</code>
Redirect route to given location path

**Kind**: static method of [<code>router</code>](#V.router)  
**Access**: public  

| Param | Type |
| --- | --- |
| location | <code>String</code> | 

<a name="V.router.goBack"></a>

#### router.goBack(level) ⇒ <code>void</code>
Go back to the previous route

**Kind**: static method of [<code>router</code>](#V.router)  
**Access**: public  

| Param | Type |
| --- | --- |
| level | <code>Number</code> | 

<a name="V.local"></a>

### V.local
Local storage lib

**Kind**: static property of [<code>V</code>](#V)  

* [.local](#V.local)
    * [.set(name, value)](#V.local.set) ⇒ <code>Object</code>
    * [.get(name, parse)](#V.local.get) ⇒ <code>Mixed</code>

<a name="V.local.set"></a>

#### local.set(name, value) ⇒ <code>Object</code>
Set item on localStorage

**Kind**: static method of [<code>local</code>](#V.local)  
**Access**: public  

| Param | Type |
| --- | --- |
| name | <code>String</code> | 
| value | <code>Mixed</code> | 

<a name="V.local.get"></a>

#### local.get(name, parse) ⇒ <code>Mixed</code>
Retrieve item of localStorage

**Kind**: static method of [<code>local</code>](#V.local)  
**Access**: public  

| Param | Type |
| --- | --- |
| name | <code>String</code> | 
| parse | <code>Boolean</code> | 

<a name="V.session"></a>

### V.session
Session storage lib

**Kind**: static property of [<code>V</code>](#V)  

* [.session](#V.session)
    * [.set(name, value)](#V.session.set) ⇒ <code>Object</code>
    * [.get(name, parse)](#V.session.get) ⇒ <code>Mixed</code>

<a name="V.session.set"></a>

#### session.set(name, value) ⇒ <code>Object</code>
Set item on sessionStorage

**Kind**: static method of [<code>session</code>](#V.session)  
**Access**: public  

| Param | Type |
| --- | --- |
| name | <code>String</code> | 
| value | <code>Mixed</code> | 

<a name="V.session.get"></a>

#### session.get(name, parse) ⇒ <code>Mixed</code>
Retrieve item of sessionStorage

**Kind**: static method of [<code>session</code>](#V.session)  
**Access**: public  

| Param | Type |
| --- | --- |
| name | <code>String</code> | 
| parse | <code>Boolean</code> | 

<a name="V.beforeConstructor"></a>

### V.beforeConstructor(callback) ⇒ <code>void</code>
Add global callback before component constructor

**Kind**: static method of [<code>V</code>](#V)  
**Access**: public  

| Param | Type |
| --- | --- |
| callback | <code>function</code> | 

<a name="V.afterConstructor"></a>

### V.afterConstructor(callback) ⇒ <code>void</code>
Add global callback after component constructor

**Kind**: static method of [<code>V</code>](#V)  
**Access**: public  

| Param | Type |
| --- | --- |
| callback | <code>function</code> | 

<a name="V.beforeDestructor"></a>

### V.beforeDestructor(callback) ⇒ <code>void</code>
Add global callback before component destructor

**Kind**: static method of [<code>V</code>](#V)  
**Access**: public  

| Param | Type |
| --- | --- |
| callback | <code>function</code> | 

<a name="V.afterDestructor"></a>

### V.afterDestructor(callback) ⇒ <code>void</code>
Add global callback after component destructor

**Kind**: static method of [<code>V</code>](#V)  
**Access**: public  

| Param | Type |
| --- | --- |
| callback | <code>function</code> | 

<a name="V.component"></a>

### V.component(selector, data) ⇒ <code>Promise</code>
Create new component

**Kind**: static method of [<code>V</code>](#V)  
**Access**: public  

| Param | Type |
| --- | --- |
| selector | <code>String</code> | 
| data | <code>Object</code> | 


* [.component(selector, data)](#V.component) ⇒ <code>Promise</code>
    * [.element](#V.component.element) : <code>Node</code>
    * [.element](#V.component.element) : <code>String</code>
    * [.constructor(resolve, reject)](#V.component.constructor) ⇒ <code>Promise</code>
    * [.destructor(resolve, reject)](#V.component.destructor) ⇒ <code>Promise</code>
    * [.beforeDestroy(resolve, reject)](#V.component.beforeDestroy) ⇒ <code>Promise</code>
    * [.onDestroy(resolve, reject)](#V.component.onDestroy) ⇒ <code>Promise</code>
    * [.afterDestroy(resolve, reject)](#V.component.afterDestroy) ⇒ <code>Promise</code>
    * [.on(event, selector, callback)](#V.component.on) ⇒ <code>void</code>
    * [.off(event, selector)](#V.component.off) ⇒ <code>void</code>
    * [.beforeMount(resolve, reject)](#V.component.beforeMount) ⇒ <code>Promise</code>
    * [.onMount(resolve, reject)](#V.component.onMount) ⇒ <code>Promise</code>
    * [.afterMount(resolve, reject)](#V.component.afterMount) ⇒ <code>Promise</code>
    * [.shouldRender(resolve, reject)](#V.component.shouldRender) ⇒ <code>Promise</code>
    * [.beforeRender(resolve, reject)](#V.component.beforeRender) ⇒ <code>Promise</code>
    * [.onRender(resolve, reject)](#V.component.onRender) ⇒ <code>Promise</code>
    * [.afterRender(resolve, reject)](#V.component.afterRender) ⇒ <code>Promise</code>
    * [.set(key, value)](#V.component.set) ⇒ <code>Object</code>
    * [.get(key, defaultValue)](#V.component.get) ⇒ <code>mixed</code>

<a name="V.component.element"></a>

#### component.element : <code>Node</code>
Component DOM element

**Kind**: static property of [<code>component</code>](#V.component)  
**Access**: public  
<a name="V.component.element"></a>

#### component.element : <code>String</code>
Component DOM selector

**Kind**: static property of [<code>component</code>](#V.component)  
**Access**: public  
<a name="V.component.constructor"></a>

#### component.constructor(resolve, reject) ⇒ <code>Promise</code>
Component constructor

**Kind**: static method of [<code>component</code>](#V.component)  
**Access**: public  

| Param | Type |
| --- | --- |
| resolve | <code>function</code> | 
| reject | <code>function</code> | 

<a name="V.component.destructor"></a>

#### component.destructor(resolve, reject) ⇒ <code>Promise</code>
Component destructor

**Kind**: static method of [<code>component</code>](#V.component)  
**Access**: public  

| Param | Type |
| --- | --- |
| resolve | <code>function</code> | 
| reject | <code>function</code> | 

<a name="V.component.beforeDestroy"></a>

#### component.beforeDestroy(resolve, reject) ⇒ <code>Promise</code>
Component before destroy

**Kind**: static method of [<code>component</code>](#V.component)  
**Access**: public  

| Param | Type |
| --- | --- |
| resolve | <code>function</code> | 
| reject | <code>function</code> | 

<a name="V.component.onDestroy"></a>

#### component.onDestroy(resolve, reject) ⇒ <code>Promise</code>
Component on destroy

**Kind**: static method of [<code>component</code>](#V.component)  
**Access**: public  

| Param | Type |
| --- | --- |
| resolve | <code>function</code> | 
| reject | <code>function</code> | 

<a name="V.component.afterDestroy"></a>

#### component.afterDestroy(resolve, reject) ⇒ <code>Promise</code>
Component after destroy

**Kind**: static method of [<code>component</code>](#V.component)  
**Access**: public  

| Param | Type |
| --- | --- |
| resolve | <code>function</code> | 
| reject | <code>function</code> | 

<a name="V.component.on"></a>

#### component.on(event, selector, callback) ⇒ <code>void</code>
Attach event on component

**Kind**: static method of [<code>component</code>](#V.component)  
**Access**: public  

| Param | Type |
| --- | --- |
| event | <code>String</code> | 
| selector | <code>String</code> \| <code>function</code> | 
| callback | <code>function</code> | 

<a name="V.component.off"></a>

#### component.off(event, selector) ⇒ <code>void</code>
Remove event on component

**Kind**: static method of [<code>component</code>](#V.component)  
**Access**: public  

| Param | Type |
| --- | --- |
| event | <code>String</code> | 
| selector | <code>String</code> | 

<a name="V.component.beforeMount"></a>

#### component.beforeMount(resolve, reject) ⇒ <code>Promise</code>
Component before mount

**Kind**: static method of [<code>component</code>](#V.component)  
**Access**: public  

| Param | Type |
| --- | --- |
| resolve | <code>function</code> | 
| reject | <code>function</code> | 

<a name="V.component.onMount"></a>

#### component.onMount(resolve, reject) ⇒ <code>Promise</code>
Component on mount

**Kind**: static method of [<code>component</code>](#V.component)  
**Access**: public  

| Param | Type |
| --- | --- |
| resolve | <code>function</code> | 
| reject | <code>function</code> | 

<a name="V.component.afterMount"></a>

#### component.afterMount(resolve, reject) ⇒ <code>Promise</code>
Component after mount

**Kind**: static method of [<code>component</code>](#V.component)  
**Access**: public  

| Param | Type |
| --- | --- |
| resolve | <code>function</code> | 
| reject | <code>function</code> | 

<a name="V.component.shouldRender"></a>

#### component.shouldRender(resolve, reject) ⇒ <code>Promise</code>
Component should render

**Kind**: static method of [<code>component</code>](#V.component)  
**Access**: public  

| Param | Type |
| --- | --- |
| resolve | <code>function</code> | 
| reject | <code>function</code> | 

<a name="V.component.beforeRender"></a>

#### component.beforeRender(resolve, reject) ⇒ <code>Promise</code>
Component before render

**Kind**: static method of [<code>component</code>](#V.component)  
**Access**: public  

| Param | Type |
| --- | --- |
| resolve | <code>function</code> | 
| reject | <code>function</code> | 

<a name="V.component.onRender"></a>

#### component.onRender(resolve, reject) ⇒ <code>Promise</code>
Component on render

**Kind**: static method of [<code>component</code>](#V.component)  
**Access**: public  

| Param | Type |
| --- | --- |
| resolve | <code>function</code> | 
| reject | <code>function</code> | 

<a name="V.component.afterRender"></a>

#### component.afterRender(resolve, reject) ⇒ <code>Promise</code>
Component after render

**Kind**: static method of [<code>component</code>](#V.component)  
**Access**: public  

| Param | Type |
| --- | --- |
| resolve | <code>function</code> | 
| reject | <code>function</code> | 

<a name="V.component.set"></a>

#### component.set(key, value) ⇒ <code>Object</code>
Set element data

**Kind**: static method of [<code>component</code>](#V.component)  
**Access**: public  

| Param | Type |
| --- | --- |
| key | <code>String</code> | 
| value | <code>mixed</code> | 

<a name="V.component.get"></a>

#### component.get(key, defaultValue) ⇒ <code>mixed</code>
Get element data

**Kind**: static method of [<code>component</code>](#V.component)  
**Access**: public  

| Param | Type |
| --- | --- |
| key | <code>String</code> | 
| defaultValue | <code>mixed</code> | 

<a name="V.removeComponent"></a>

### V.removeComponent(selector) ⇒ <code>Promise</code>
Remove component

**Kind**: static method of [<code>V</code>](#V)  
**Access**: public  

| Param | Type |
| --- | --- |
| selector | <code>String</code> | 

<a name="V.beforeDestroy"></a>

### V.beforeDestroy(callback) ⇒ <code>void</code>
Add global callback before component destroy

**Kind**: static method of [<code>V</code>](#V)  
**Access**: public  

| Param | Type |
| --- | --- |
| callback | <code>function</code> | 

<a name="V.afterDestroy"></a>

### V.afterDestroy(callback) ⇒ <code>void</code>
Add global callback after component destroy

**Kind**: static method of [<code>V</code>](#V)  
**Access**: public  

| Param | Type |
| --- | --- |
| callback | <code>function</code> | 

<a name="V.destroy"></a>

### V.destroy(target) ⇒ <code>Promise</code>
destroy components on given target child elements

**Kind**: static method of [<code>V</code>](#V)  
**Access**: public  

| Param | Type |
| --- | --- |
| target | <code>Node</code> | 

<a name="V.beforeMount"></a>

### V.beforeMount(callback) ⇒ <code>void</code>
Add global callback before component mount

**Kind**: static method of [<code>V</code>](#V)  
**Access**: public  

| Param | Type |
| --- | --- |
| callback | <code>function</code> | 

<a name="V.afterMount"></a>

### V.afterMount(callback) ⇒ <code>void</code>
Add global callback after component mount

**Kind**: static method of [<code>V</code>](#V)  
**Access**: public  

| Param | Type |
| --- | --- |
| callback | <code>function</code> | 

<a name="V.mount"></a>

### V.mount(target) ⇒ <code>Promise</code>
Mount components on given target child elements

**Kind**: static method of [<code>V</code>](#V)  
**Access**: public  

| Param | Type |
| --- | --- |
| target | <code>Node</code> | 

<a name="V.beforeRender"></a>

### V.beforeRender(callback) ⇒ <code>void</code>
Add global callback before component render

**Kind**: static method of [<code>V</code>](#V)  
**Access**: public  

| Param | Type |
| --- | --- |
| callback | <code>function</code> | 

<a name="V.afterRender"></a>

### V.afterRender(callback) ⇒ <code>void</code>
Add global callback after component render

**Kind**: static method of [<code>V</code>](#V)  
**Access**: public  

| Param | Type |
| --- | --- |
| callback | <code>function</code> | 

<a name="V.each"></a>

### V.each(items, callback) ⇒ <code>void</code>
Run loop on items

**Kind**: static method of [<code>V</code>](#V)  
**Access**: public  

| Param | Type |
| --- | --- |
| items | <code>Array</code> \| <code>Object</code> | 
| callback | <code>function</code> | 

<a name="V.extend"></a>

### V.extend(library, plugin) ⇒ <code>void</code>
Load an plugin on the library

**Kind**: static method of [<code>V</code>](#V)  
**Access**: public  

| Param | Type |
| --- | --- |
| library | <code>Object</code> | 
| plugin | <code>Object</code> | 

<a name="V.promisify"></a>

### V.promisify(scope, callback) ⇒ <code>Promise</code>
Promisify the callback

**Kind**: static method of [<code>V</code>](#V)  
**Access**: public  

| Param | Type |
| --- | --- |
| scope | <code>Object</code> | 
| callback | <code>function</code> | 

<a name="V.fakePromise"></a>

### V.fakePromise(resolve) ⇒ <code>void</code>
Fake promise instance

**Kind**: static method of [<code>V</code>](#V)  
**Access**: public  

| Param | Type |
| --- | --- |
| resolve | <code>function</code> | 

<a name="V.on"></a>

### V.on(element, event, selector, callback) ⇒ <code>function</code>
Add event to element

**Kind**: static method of [<code>V</code>](#V)  
**Access**: public  

| Param | Type |
| --- | --- |
| element | <code>Node</code> | 
| event | <code>String</code> | 
| selector | <code>String</code> | 
| callback | <code>function</code> | 

<a name="V.off"></a>

### V.off(element, event, selector, callback) ⇒ <code>function</code>
Remove event from element

**Kind**: static method of [<code>V</code>](#V)  
**Access**: public  

| Param | Type |
| --- | --- |
| element | <code>Node</code> | 
| event | <code>String</code> | 
| selector | <code>String</code> | 
| callback | <code>function</code> | 

<a name="V.trigger"></a>

### V.trigger(element, event) ⇒ <code>void</code>
Trigger event on element

**Kind**: static method of [<code>V</code>](#V)  
**Access**: public  

| Param | Type |
| --- | --- |
| element | <code>Node</code> | 
| event | <code>String</code> | 

<a name="V.$"></a>

### V.$(selector, context) ⇒ <code>Node</code>
Select an single element

**Kind**: static method of [<code>V</code>](#V)  
**Access**: public  

| Param | Type |
| --- | --- |
| selector | <code>String</code> | 
| context | <code>Mixed</code> | 

<a name="V.$$"></a>

### V.$$(selector, context) ⇒ <code>NodeList</code>
Select multiples elements

**Kind**: static method of [<code>V</code>](#V)  
**Access**: public  

| Param | Type |
| --- | --- |
| selector | <code>String</code> | 
| context | <code>Mixed</code> | 

<a name="V.items"></a>

### V.items(element, context) ⇒ <code>Array</code>
Parse selector and return array of items

**Kind**: static method of [<code>V</code>](#V)  
**Access**: public  

| Param | Type |
| --- | --- |
| element | <code>Mixed</code> | 
| context | <code>Mixed</code> | 

