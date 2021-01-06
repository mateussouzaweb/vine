# Vanilla UI

Easy and functional vanilla JS components to simplify your life:

- Just works, super easy usage.
- No need of NPM scripts, build tools, anything.
- Zero dependencies, including module loaders.

Some of the features:

- Very small memory usage.
- Full async (everything can be asynchronous).
- Event delegation by default.
- Hookable and extendable system.
- Components with `mount`, `render` and `destroy` events.
- State management and events for components.
- Template engine with IF/ELSE and FOR loops.
- Route library.
- HTTP request library.
- Local and session storage library.
- Easy multi-components communication in a same element.

## Usage

Simple put the distribution file in your project and start coding:

```html
<script src="vanilla.min.js"></script>
<script>
    V... // Your code goes here
</script>
```

## Component Lifecycle

You can use the following cycle to understand how component works and attach the appropriated code to id:

```html
Component:
Construct ↓
    Mount ↓
        ⇅ Render (Loop) ↺
    Destroy ↓
Destruct
```

1 - CONSTRUCT

- **Only once** without element attached
- Setup component to be attached on elements
- Component events: ``constructor``

2 - MOUNT

- **Only once** with element attached
- Useful to setup component events and initial data
- Global events: ``beforeMount``, ``afterMount``
- Component events: ``beforeMount``, ``onMount``, ``afterMount``

3 - RENDER ↺

- **After mount and each time the component state changes**
- Calls mount/render on child components after render and wait for it
- Condition events: ``shouldRender``
- Global events: ``beforeRender``, ``afterRender``
- Component events: ``template``, ``beforeRender``, ``onRender``, ``afterRender``

4 - DESTROY

- **Only once** with the attached element
- Destroy the component from the element
- Useful to remove component events
- Component to be mounted again later with new mounts
- Calls destroy on child components also
- Global events: ``beforeDestroy``, ``afterDestroy``
- Component events: ``beforeDestroy``, ``onDestroy``, ``afterDestroy``

5 - REMOVE

- **Only once** for each attached element
- Remove the component from index, cannot be used again
- This do not run the destroy lifecycle, you should call it first
- Component events: ``destructor``
