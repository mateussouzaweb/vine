install:
	npm install -g typescript rollup terser

compile:
	tsc src/vanilla.ts \
		--target ES6 \
		--module ES6 \
		--removeComments \
		--sourceMap \
		--outDir compiled/

bundle:
	rollup compiled/vanilla.js \
		--name V \
		--format iife \
		--sourcemap \
		--file dist/vanilla.js \

declaration:
	tsc dist/vanilla.js \
		--allowJs \
		--target ES6 \
		--removeComments \
		--declaration \
		--declarationMap \
		--emitDeclarationOnly \
		--outFile dist/vanilla.d.ts && \
	sed -i 's/\"vanilla\"/V/' dist/vanilla.d.ts

minify:
	terser dist/vanilla.js \
		--comments \
		--source-map includeSources,base='dist',filename='vanilla.min.js.map',url='vanilla.min.js.map' \
		--output dist/vanilla.min.js

clean:
	rm -r compiled

build: compile bundle declaration minify clean