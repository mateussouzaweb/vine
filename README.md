# Vine Framework

Tiny, easy and functional JS framework to simplify the building of enhanced web projects:

- Just works, super easy usage.
- Zero dependencies, including module loaders.
- Import directly as Typescript.
- Or use the compiled Javascript code.

Some of the features:

- Very small memory usage.
- Full async (everything can be asynchronous).
- Optimized selector with context.
- Event delegation by default.
- Components with `mount`, `render` and `destroy` events.
- State and template management for components.
- Support to build observable event system.
- Template parse engine with `if` / `else` and `for` loops.
- Route handling library.
- HTTP request library.

## Usage

Just put the distribution file in your project and start coding:

```html
<script src="lib/vine.js"></script>
<script>
    // Your code goes here
    Vine.register(...)
</script>
```

You can also use it with TypeScript and ES6:

```js
import { register } from "lib/vine"

// Your code goes here
register(...)
```

## Component Lifecycle

You can use the following cycle to understand how components work and attach the appropriate code when building components:

```html
Register ↓
    ↓ Mount ↓
        ⇅ Render (Loop) ↺
    ↑ Destroy ↓
UnRegister
```

1 - REGISTER

- **Only once** without element attached
- Setup component to be attached to elements

2 - MOUNT

- **Only once** for each element attached
- Useful to set up component events
- Component event: ``onMount``

3 - RENDER ↺

- **After mount and each time the component renders again**
- Update output from template
- Calls lifecycle events on child components after render and wait for it
- Component events: ``template``, ``onRender``

4 - DESTROY

- **Only once** for each attached element if mounted
- Destroys the component from the element
- Can be mounted again later with new mounts
- Destroy child components also and wait for it
- Useful to remove component events
- Component events: ``onDestroy``

5 - UNREGISTER

- **Only once** without element attached
- Removes the component definition from index, cannot be used again
- This does not run the destroy lifecycle, you should call it first
