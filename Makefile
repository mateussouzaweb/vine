install:
	npm install -g typescript rollup terser

merge:
	mkdir -p dist/ && awk '{print}' \
		src/vine.ts \
		src/core/selector.ts \
		src/core/events.ts \
		src/core/observers.ts \
		src/core/component.ts \
		src/extra/engine.ts \
		src/extra/http.ts \
		src/extra/route.ts \
		> dist/vine.ts

	sed -i '/import/d' dist/vine.ts

compile:
	tsc dist/vine.ts \
		--lib ES2018,DOM \
		--target ES3 \
		--module ES6 \
		--sourceMap \
		--declaration \
		--outDir dist

	rollup dist/vine.js \
		--exports named \
		--format iife \
		--context window \
		--name Vine \
		--sourcemap \
		--file dist/vine.js \

minify:
	terser dist/vine.js \
		--comments \
		--source-map includeSources,base='dist',filename='vine.min.js.map',url='vine.min.js.map' \
		--output dist/vine.min.js

build: merge compile minify