# Vanilla UI

Easy and functional vanilla JS components to simplify your life:

- Just works, super easy usage.
- No need of NPM scripts, build tools, anything.
- Zero dependencies, including module loaders.

Some of the features:

- Very small memory usage.
- Full async (everything can be asynchronous).
- Optimized selector with context.
- Event delegation by default.
- Components with `mount`, `render` and `destroy` events.
- State and template management for components.
- Support to build observable event system.
- Template parse engine with IF/ELSE and FOR loops.
- Route handling library.
- HTTP request library.

## Usage

Just put the distribution file in your project and start coding:

```html
<script src="vanilla.min.js"></script>
<script>
    V... // Your code goes here
</script>
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
