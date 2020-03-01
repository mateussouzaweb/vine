<a name="V"></a>

## V
Vanilla UI core lib

**Kind**: global variable  

* [V](#V)
    * [.http](#V.http)
        * [.interceptBefore(callback)](#V.http.interceptBefore) ⇒ <code>void</code>
        * [.interceptAfter(callback)](#V.http.interceptAfter) ⇒ <code>void</code>
        * [.request(method, url, data, headers)](#V.http.request) ⇒ <code>Object</code>
        * [.get(url, data, headers)](#V.http.get) ⇒ <code>Promise</code>
        * [.post(url, data, headers)](#V.http.post) ⇒ <code>Promise</code>
        * [.put(url, data, headers)](#V.http.put) ⇒ <code>Promise</code>
        * [.delete(url, data, headers)](#V.http.delete) ⇒ <code>Promise</code>
    * [.router](#V.router)
        * [.beforeChange(callback)](#V.router.beforeChange) ⇒ <code>Void</code>
        * [.afterChange(callback)](#V.router.afterChange) ⇒ <code>Void</code>
        * [.add(definition)](#V.router.add) ⇒ <code>void</code>
        * [.getParam(name)](#V.router.getParam) ⇒ <code>mixed</code>
        * [.getQuery(name)](#V.router.getQuery) ⇒ <code>mixed</code>
        * [.getActive()](#V.router.getActive) ⇒ <code>void</code>
        * [.getLocation()](#V.router.getLocation) ⇒ <code>string</code>
        * [.redirect(location)](#V.router.redirect) ⇒ <code>void</code>
        * [.goBack(level)](#V.router.goBack) ⇒ <code>void</code>
    * [.localStorage](#V.localStorage)
        * [.set(name, value)](#V.localStorage.set) ⇒ <code>Object</code>
        * [.get(name, parse)](#V.localStorage.get) ⇒ <code>Mixed</code>
    * [.beforeRender(callback)](#V.beforeRender) ⇒ <code>void</code>
    * [.afterRender(callback)](#V.afterRender) ⇒ <code>void</code>
    * [.beforeDestroy(callback)](#V.beforeDestroy) ⇒ <code>void</code>
    * [.afterDestroy(callback)](#V.afterDestroy) ⇒ <code>void</code>
    * [.component(selector, data)](#V.component) ⇒ <code>Promise</code>
        * [.set(key, value)](#V.component.set) ⇒ <code>Object</code>
        * [.get(key, defaultValue)](#V.component.get) ⇒ <code>mixed</code>
        * [.on(event, selector, callback)](#V.component.on) ⇒ <code>void</code>
        * [.off(event, selector)](#V.component.off) ⇒ <code>void</code>
    * [.removeComponent(selector)](#V.removeComponent) ⇒ <code>Promise</code>
    * [.mount(target)](#V.mount) ⇒ <code>Promise</code>
    * [.unMount(target)](#V.unMount) ⇒ <code>Promise</code>
    * [.mountComponent(component)](#V.mountComponent) ⇒ <code>Promise</code>
    * [.unMountComponent(component)](#V.unMountComponent) ⇒ <code>Promise</code>
    * [.render(component)](#V.render) ⇒ <code>Promise</code>
    * [.destroy(component)](#V.destroy) ⇒ <code>Promise</code>
    * [.each(items, callback)](#V.each) ⇒ <code>void</code>
    * [.extend(plugin)](#V.extend) ⇒ <code>void</code>
    * [.promisify(scope, callback)](#V.promisify) ⇒ <code>Promise</code>
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
    * [.request(method, url, data, headers)](#V.http.request) ⇒ <code>Object</code>
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

#### http.request(method, url, data, headers) ⇒ <code>Object</code>
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
    * [.add(definition)](#V.router.add) ⇒ <code>void</code>
    * [.getParam(name)](#V.router.getParam) ⇒ <code>mixed</code>
    * [.getQuery(name)](#V.router.getQuery) ⇒ <code>mixed</code>
    * [.getActive()](#V.router.getActive) ⇒ <code>void</code>
    * [.getLocation()](#V.router.getLocation) ⇒ <code>string</code>
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

<a name="V.router.add"></a>

#### router.add(definition) ⇒ <code>void</code>
Add route to routes

**Kind**: static method of [<code>router</code>](#V.router)  
**Access**: public  

| Param | Type |
| --- | --- |
| definition | <code>Object</code> | 

<a name="V.router.getParam"></a>

#### router.getParam(name) ⇒ <code>mixed</code>
Retrieve route param value

**Kind**: static method of [<code>router</code>](#V.router)  
**Access**: public  

| Param | Type |
| --- | --- |
| name | <code>String</code> | 

<a name="V.router.getQuery"></a>

#### router.getQuery(name) ⇒ <code>mixed</code>
Retrieve query param value

**Kind**: static method of [<code>router</code>](#V.router)  
**Access**: public  

| Param | Type |
| --- | --- |
| name | <code>String</code> | 

<a name="V.router.getActive"></a>

#### router.getActive() ⇒ <code>void</code>
Retrieve the active route config

**Kind**: static method of [<code>router</code>](#V.router)  
**Access**: public  
<a name="V.router.getLocation"></a>

#### router.getLocation() ⇒ <code>string</code>
Retrieve parsed active route path

**Kind**: static method of [<code>router</code>](#V.router)  
**Access**: public  
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

<a name="V.localStorage"></a>

### V.localStorage
Local storage lib

**Kind**: static property of [<code>V</code>](#V)  

* [.localStorage](#V.localStorage)
    * [.set(name, value)](#V.localStorage.set) ⇒ <code>Object</code>
    * [.get(name, parse)](#V.localStorage.get) ⇒ <code>Mixed</code>

<a name="V.localStorage.set"></a>

#### localStorage.set(name, value) ⇒ <code>Object</code>
Set item on localStorage

**Kind**: static method of [<code>localStorage</code>](#V.localStorage)  
**Access**: public  

| Param | Type |
| --- | --- |
| name | <code>String</code> | 
| value | <code>Mixed</code> | 

<a name="V.localStorage.get"></a>

#### localStorage.get(name, parse) ⇒ <code>Mixed</code>
Retrieve item of localStorage

**Kind**: static method of [<code>localStorage</code>](#V.localStorage)  
**Access**: public  

| Param | Type |
| --- | --- |
| name | <code>String</code> | 
| parse | <code>Boolean</code> | 

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
    * [.set(key, value)](#V.component.set) ⇒ <code>Object</code>
    * [.get(key, defaultValue)](#V.component.get) ⇒ <code>mixed</code>
    * [.on(event, selector, callback)](#V.component.on) ⇒ <code>void</code>
    * [.off(event, selector)](#V.component.off) ⇒ <code>void</code>

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

<a name="V.removeComponent"></a>

### V.removeComponent(selector) ⇒ <code>Promise</code>
Remove component

**Kind**: static method of [<code>V</code>](#V)  
**Access**: public  

| Param | Type |
| --- | --- |
| selector | <code>String</code> | 

<a name="V.mount"></a>

### V.mount(target) ⇒ <code>Promise</code>
Mount components on given target child elements

**Kind**: static method of [<code>V</code>](#V)  
**Access**: public  

| Param | Type |
| --- | --- |
| target | <code>Node</code> | 

<a name="V.unMount"></a>

### V.unMount(target) ⇒ <code>Promise</code>
unMount components on given target child elements

**Kind**: static method of [<code>V</code>](#V)  
**Access**: public  

| Param | Type |
| --- | --- |
| target | <code>Node</code> | 

<a name="V.mountComponent"></a>

### V.mountComponent(component) ⇒ <code>Promise</code>
Mount component to start render process

**Kind**: static method of [<code>V</code>](#V)  
**Access**: public  

| Param | Type |
| --- | --- |
| component | <code>Object</code> | 

<a name="V.unMountComponent"></a>

### V.unMountComponent(component) ⇒ <code>Promise</code>
UnMount component to start destroy process

**Kind**: static method of [<code>V</code>](#V)  
**Access**: public  

| Param | Type |
| --- | --- |
| component | <code>mixed</code> | 

<a name="V.render"></a>

### V.render(component) ⇒ <code>Promise</code>
Render component

**Kind**: static method of [<code>V</code>](#V)  
**Access**: public  

| Param | Type |
| --- | --- |
| component | <code>Object</code> | 

<a name="V.destroy"></a>

### V.destroy(component) ⇒ <code>Promise</code>
Process component destroy

**Kind**: static method of [<code>V</code>](#V)  
**Access**: public  

| Param | Type |
| --- | --- |
| component | <code>Object</code> | 

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

### V.extend(plugin) ⇒ <code>void</code>
Load an plugin on the library

**Kind**: static method of [<code>V</code>](#V)  
**Access**: public  

| Param | Type |
| --- | --- |
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

