<a name="V"></a>

## V
Vanilla UI core lib

**Kind**: global variable  

* [V](#V)
    * [.beforeRender](#V.beforeRender) ⇒ <code>void</code>
    * [.afterRender](#V.afterRender) ⇒ <code>void</code>
    * [.beforeDestroy](#V.beforeDestroy) ⇒ <code>void</code>
    * [.afterDestroy](#V.afterDestroy) ⇒ <code>void</code>
    * [.component](#V.component) ⇒ <code>Promise</code>
        * [.set](#V.component.set) ⇒ <code>Object</code>
        * [.get](#V.component.get) ⇒ <code>mixed</code>
        * [.on](#V.component.on) ⇒ <code>void</code>
        * [.off](#V.component.off) ⇒ <code>void</code>
    * [.removeComponent](#V.removeComponent) ⇒ <code>Promise</code>
    * [.mount](#V.mount) ⇒ <code>Promise</code>
    * [.unMount](#V.unMount) ⇒ <code>Promise</code>
    * [.mountComponent](#V.mountComponent) ⇒ <code>Promise</code>
    * [.unMountComponent](#V.unMountComponent) ⇒ <code>Promise</code>
    * [.render](#V.render) ⇒ <code>Promise</code>
    * [.destroy](#V.destroy) ⇒ <code>Promise</code>
    * [.each](#V.each) ⇒ <code>void</code>
    * [.extend](#V.extend) ⇒ <code>void</code>
    * [.promisify](#V.promisify) ⇒ <code>Promise</code>
    * [.on](#V.on) ⇒ <code>function</code>
    * [.off](#V.off) ⇒ <code>function</code>
    * [.trigger](#V.trigger) ⇒ <code>void</code>
    * [.$](#V.$) ⇒ <code>Node</code>
    * [.$$](#V.$$) ⇒ <code>NodeList</code>
    * [.items](#V.items) ⇒ <code>Array</code>
    * [.http](#V.http)
        * [.interceptBefore](#V.http.interceptBefore) ⇒ <code>void</code>
        * [.interceptAfter](#V.http.interceptAfter) ⇒ <code>void</code>
        * [.request](#V.http.request) ⇒ <code>Object</code>
        * [.get](#V.http.get) ⇒ <code>Promise</code>
        * [.post](#V.http.post) ⇒ <code>Promise</code>
        * [.put](#V.http.put) ⇒ <code>Promise</code>
        * [.delete](#V.http.delete) ⇒ <code>Promise</code>
    * [.router](#V.router)
        * [.beforeChange](#V.router.beforeChange) ⇒ <code>Void</code>
        * [.afterChange](#V.router.afterChange) ⇒ <code>Void</code>
        * [.add](#V.router.add) ⇒ <code>void</code>
        * [.getParam](#V.router.getParam) ⇒ <code>mixed</code>
        * [.getQuery](#V.router.getQuery) ⇒ <code>mixed</code>
        * [.getActive](#V.router.getActive) ⇒ <code>void</code>
        * [.getLocation](#V.router.getLocation) ⇒ <code>string</code>
        * [.redirect](#V.router.redirect) ⇒ <code>void</code>
        * [.goBack](#V.router.goBack) ⇒ <code>void</code>
    * [.localStorage](#V.localStorage)
        * [.set](#V.localStorage.set) ⇒ <code>Object</code>
        * [.get](#V.localStorage.get) ⇒ <code>Mixed</code>

<a name="V.beforeRender"></a>

### V.beforeRender ⇒ <code>void</code>
Add global callback before component render

**Kind**: static property of [<code>V</code>](#V)  
**Access**: public  

| Param | Type |
| --- | --- |
| callback | <code>function</code> | 

<a name="V.afterRender"></a>

### V.afterRender ⇒ <code>void</code>
Add global callback after component render

**Kind**: static property of [<code>V</code>](#V)  
**Access**: public  

| Param | Type |
| --- | --- |
| callback | <code>function</code> | 

<a name="V.beforeDestroy"></a>

### V.beforeDestroy ⇒ <code>void</code>
Add global callback before component destroy

**Kind**: static property of [<code>V</code>](#V)  
**Access**: public  

| Param | Type |
| --- | --- |
| callback | <code>function</code> | 

<a name="V.afterDestroy"></a>

### V.afterDestroy ⇒ <code>void</code>
Add global callback after component destroy

**Kind**: static property of [<code>V</code>](#V)  
**Access**: public  

| Param | Type |
| --- | --- |
| callback | <code>function</code> | 

<a name="V.component"></a>

### V.component ⇒ <code>Promise</code>
Create new component

**Kind**: static property of [<code>V</code>](#V)  
**Access**: public  

| Param | Type |
| --- | --- |
| selector | <code>String</code> | 
| data | <code>Object</code> | 


* [.component](#V.component) ⇒ <code>Promise</code>
    * [.set](#V.component.set) ⇒ <code>Object</code>
    * [.get](#V.component.get) ⇒ <code>mixed</code>
    * [.on](#V.component.on) ⇒ <code>void</code>
    * [.off](#V.component.off) ⇒ <code>void</code>

<a name="V.component.set"></a>

#### component.set ⇒ <code>Object</code>
Set element data

**Kind**: static property of [<code>component</code>](#V.component)  
**Access**: public  

| Param | Type |
| --- | --- |
| key | <code>String</code> | 
| value | <code>mixed</code> | 

<a name="V.component.get"></a>

#### component.get ⇒ <code>mixed</code>
Get element data

**Kind**: static property of [<code>component</code>](#V.component)  
**Access**: public  

| Param | Type |
| --- | --- |
| key | <code>String</code> | 
| defaultValue | <code>mixed</code> | 

<a name="V.component.on"></a>

#### component.on ⇒ <code>void</code>
Attach event on component

**Kind**: static property of [<code>component</code>](#V.component)  
**Access**: public  

| Param | Type |
| --- | --- |
| event | <code>String</code> | 
| selector | <code>String</code> \| <code>function</code> | 
| callback | <code>function</code> | 

<a name="V.component.off"></a>

#### component.off ⇒ <code>void</code>
Remove event on component

**Kind**: static property of [<code>component</code>](#V.component)  
**Access**: public  

| Param | Type |
| --- | --- |
| event | <code>String</code> | 
| selector | <code>String</code> | 

<a name="V.removeComponent"></a>

### V.removeComponent ⇒ <code>Promise</code>
Remove component

**Kind**: static property of [<code>V</code>](#V)  
**Access**: public  

| Param | Type |
| --- | --- |
| selector | <code>String</code> | 

<a name="V.mount"></a>

### V.mount ⇒ <code>Promise</code>
Mount components on given target child elements

**Kind**: static property of [<code>V</code>](#V)  
**Access**: public  

| Param | Type |
| --- | --- |
| target | <code>Node</code> | 

<a name="V.unMount"></a>

### V.unMount ⇒ <code>Promise</code>
unMount components on given target child elements

**Kind**: static property of [<code>V</code>](#V)  
**Access**: public  

| Param | Type |
| --- | --- |
| target | <code>Node</code> | 

<a name="V.mountComponent"></a>

### V.mountComponent ⇒ <code>Promise</code>
Mount component to start render process

**Kind**: static property of [<code>V</code>](#V)  
**Access**: public  

| Param | Type |
| --- | --- |
| component | <code>Object</code> | 

<a name="V.unMountComponent"></a>

### V.unMountComponent ⇒ <code>Promise</code>
UnMount component to start destroy process

**Kind**: static property of [<code>V</code>](#V)  
**Access**: public  

| Param | Type |
| --- | --- |
| component | <code>mixed</code> | 

<a name="V.render"></a>

### V.render ⇒ <code>Promise</code>
Render component

**Kind**: static property of [<code>V</code>](#V)  
**Access**: public  

| Param | Type |
| --- | --- |
| component | <code>Object</code> | 

<a name="V.destroy"></a>

### V.destroy ⇒ <code>Promise</code>
Process component destroy

**Kind**: static property of [<code>V</code>](#V)  
**Access**: public  

| Param | Type |
| --- | --- |
| component | <code>Object</code> | 

<a name="V.each"></a>

### V.each ⇒ <code>void</code>
Run loop on items

**Kind**: static property of [<code>V</code>](#V)  
**Access**: public  

| Param | Type |
| --- | --- |
| items | <code>Array</code> \| <code>Object</code> | 
| callback | <code>function</code> | 

<a name="V.extend"></a>

### V.extend ⇒ <code>void</code>
Load an plugin on the library

**Kind**: static property of [<code>V</code>](#V)  
**Access**: public  

| Param | Type |
| --- | --- |
| plugin | <code>Object</code> | 

<a name="V.promisify"></a>

### V.promisify ⇒ <code>Promise</code>
Promisify the callback

**Kind**: static property of [<code>V</code>](#V)  
**Access**: public  

| Param | Type |
| --- | --- |
| scope | <code>Object</code> | 
| callback | <code>function</code> | 

<a name="V.on"></a>

### V.on ⇒ <code>function</code>
Add event to element

**Kind**: static property of [<code>V</code>](#V)  
**Access**: public  

| Param | Type |
| --- | --- |
| element | <code>Node</code> | 
| event | <code>String</code> | 
| selector | <code>String</code> | 
| callback | <code>function</code> | 

<a name="V.off"></a>

### V.off ⇒ <code>function</code>
Remove event from element

**Kind**: static property of [<code>V</code>](#V)  
**Access**: public  

| Param | Type |
| --- | --- |
| element | <code>Node</code> | 
| event | <code>String</code> | 
| selector | <code>String</code> | 
| callback | <code>function</code> | 

<a name="V.trigger"></a>

### V.trigger ⇒ <code>void</code>
Trigger event on element

**Kind**: static property of [<code>V</code>](#V)  
**Access**: public  

| Param | Type |
| --- | --- |
| element | <code>Node</code> | 
| event | <code>String</code> | 

<a name="V.$"></a>

### V.$ ⇒ <code>Node</code>
Select an single element

**Kind**: static property of [<code>V</code>](#V)  
**Access**: public  

| Param | Type |
| --- | --- |
| selector | <code>String</code> | 
| context | <code>Mixed</code> | 

<a name="V.$$"></a>

### V.$$ ⇒ <code>NodeList</code>
Select multiples elements

**Kind**: static property of [<code>V</code>](#V)  
**Access**: public  

| Param | Type |
| --- | --- |
| selector | <code>String</code> | 
| context | <code>Mixed</code> | 

<a name="V.items"></a>

### V.items ⇒ <code>Array</code>
Parse selector and return array of items

**Kind**: static property of [<code>V</code>](#V)  
**Access**: public  

| Param | Type |
| --- | --- |
| element | <code>Mixed</code> | 
| context | <code>Mixed</code> | 

<a name="V.http"></a>

### V.http
HTTP request lib

**Kind**: static property of [<code>V</code>](#V)  

* [.http](#V.http)
    * [.interceptBefore](#V.http.interceptBefore) ⇒ <code>void</code>
    * [.interceptAfter](#V.http.interceptAfter) ⇒ <code>void</code>
    * [.request](#V.http.request) ⇒ <code>Object</code>
    * [.get](#V.http.get) ⇒ <code>Promise</code>
    * [.post](#V.http.post) ⇒ <code>Promise</code>
    * [.put](#V.http.put) ⇒ <code>Promise</code>
    * [.delete](#V.http.delete) ⇒ <code>Promise</code>

<a name="V.http.interceptBefore"></a>

#### http.interceptBefore ⇒ <code>void</code>
Add interceptor callback before each HTTP request

**Kind**: static property of [<code>http</code>](#V.http)  
**Access**: public  

| Param | Type |
| --- | --- |
| callback | <code>function</code> | 

<a name="V.http.interceptAfter"></a>

#### http.interceptAfter ⇒ <code>void</code>
Add interceptor callback after each HTTP request

**Kind**: static property of [<code>http</code>](#V.http)  
**Access**: public  

| Param | Type |
| --- | --- |
| callback | <code>function</code> | 

<a name="V.http.request"></a>

#### http.request ⇒ <code>Object</code>
Make HTTP requests

**Kind**: static property of [<code>http</code>](#V.http)  
**Access**: public  

| Param | Type |
| --- | --- |
| method | <code>String</code> | 
| url | <code>String</code> | 
| data | <code>Object</code> | 
| headers | <code>Object</code> | 

<a name="V.http.get"></a>

#### http.get ⇒ <code>Promise</code>
Make GET HTTP requests

**Kind**: static property of [<code>http</code>](#V.http)  
**Access**: public  

| Param | Type |
| --- | --- |
| url | <code>String</code> | 
| data | <code>Object</code> | 
| headers | <code>Object</code> | 

<a name="V.http.post"></a>

#### http.post ⇒ <code>Promise</code>
Make POST HTTP requests

**Kind**: static property of [<code>http</code>](#V.http)  
**Access**: public  

| Param | Type |
| --- | --- |
| url | <code>String</code> | 
| data | <code>Object</code> | 
| headers | <code>Object</code> | 

<a name="V.http.put"></a>

#### http.put ⇒ <code>Promise</code>
Make PUT HTTP requests

**Kind**: static property of [<code>http</code>](#V.http)  
**Access**: public  

| Param | Type |
| --- | --- |
| url | <code>String</code> | 
| data | <code>Object</code> | 
| headers | <code>Object</code> | 

<a name="V.http.delete"></a>

#### http.delete ⇒ <code>Promise</code>
Make DELETE HTTP requests

**Kind**: static property of [<code>http</code>](#V.http)  
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
    * [.beforeChange](#V.router.beforeChange) ⇒ <code>Void</code>
    * [.afterChange](#V.router.afterChange) ⇒ <code>Void</code>
    * [.add](#V.router.add) ⇒ <code>void</code>
    * [.getParam](#V.router.getParam) ⇒ <code>mixed</code>
    * [.getQuery](#V.router.getQuery) ⇒ <code>mixed</code>
    * [.getActive](#V.router.getActive) ⇒ <code>void</code>
    * [.getLocation](#V.router.getLocation) ⇒ <code>string</code>
    * [.redirect](#V.router.redirect) ⇒ <code>void</code>
    * [.goBack](#V.router.goBack) ⇒ <code>void</code>

<a name="V.router.beforeChange"></a>

#### router.beforeChange ⇒ <code>Void</code>
Add callback before each route transition

**Kind**: static property of [<code>router</code>](#V.router)  
**Access**: public  

| Param | Type |
| --- | --- |
| callback | <code>function</code> | 

<a name="V.router.afterChange"></a>

#### router.afterChange ⇒ <code>Void</code>
Add callback after each route transition

**Kind**: static property of [<code>router</code>](#V.router)  
**Access**: public  

| Param | Type |
| --- | --- |
| callback | <code>function</code> | 

<a name="V.router.add"></a>

#### router.add ⇒ <code>void</code>
Add route to routes

**Kind**: static property of [<code>router</code>](#V.router)  
**Access**: public  

| Param | Type |
| --- | --- |
| definition | <code>Object</code> | 

<a name="V.router.getParam"></a>

#### router.getParam ⇒ <code>mixed</code>
Retrieve route param value

**Kind**: static property of [<code>router</code>](#V.router)  
**Access**: public  

| Param | Type |
| --- | --- |
| name | <code>String</code> | 

<a name="V.router.getQuery"></a>

#### router.getQuery ⇒ <code>mixed</code>
Retrieve query param value

**Kind**: static property of [<code>router</code>](#V.router)  
**Access**: public  

| Param | Type |
| --- | --- |
| name | <code>String</code> | 

<a name="V.router.getActive"></a>

#### router.getActive ⇒ <code>void</code>
Retrieve the active route config

**Kind**: static property of [<code>router</code>](#V.router)  
**Access**: public  
<a name="V.router.getLocation"></a>

#### router.getLocation ⇒ <code>string</code>
Retrieve parsed active route path

**Kind**: static property of [<code>router</code>](#V.router)  
**Access**: public  
<a name="V.router.redirect"></a>

#### router.redirect ⇒ <code>void</code>
Redirect route to given location path

**Kind**: static property of [<code>router</code>](#V.router)  
**Access**: public  

| Param | Type |
| --- | --- |
| location | <code>String</code> | 

<a name="V.router.goBack"></a>

#### router.goBack ⇒ <code>void</code>
Go back to the previous route

**Kind**: static property of [<code>router</code>](#V.router)  
**Access**: public  

| Param | Type |
| --- | --- |
| level | <code>Number</code> | 

<a name="V.localStorage"></a>

### V.localStorage
Local storage lib

**Kind**: static property of [<code>V</code>](#V)  

* [.localStorage](#V.localStorage)
    * [.set](#V.localStorage.set) ⇒ <code>Object</code>
    * [.get](#V.localStorage.get) ⇒ <code>Mixed</code>

<a name="V.localStorage.set"></a>

#### localStorage.set ⇒ <code>Object</code>
Set item on localStorage

**Kind**: static property of [<code>localStorage</code>](#V.localStorage)  
**Access**: public  

| Param | Type |
| --- | --- |
| name | <code>String</code> | 
| value | <code>Mixed</code> | 

<a name="V.localStorage.get"></a>

#### localStorage.get ⇒ <code>Mixed</code>
Retrieve item of localStorage

**Kind**: static property of [<code>localStorage</code>](#V.localStorage)  
**Access**: public  

| Param | Type |
| --- | --- |
| name | <code>String</code> | 
| parse | <code>Boolean</code> | 

