#!/bin/bash

# npm install -g typescript
# npm install -g rollup

echo "Creating distribution files..."

tsc --target 'ES2018' \
    --removeComments \
    --outDir 'temp/' \
    src/vanilla.ts

rollup temp/vanilla.js \
    --format iife \
    --name "V" \
    --file dist/vanilla.js

rm -r temp/

echo "Creating minify distribution file..."

curl -X POST -s \
    --data-urlencode 'input@dist/vanilla.js' \
    https://javascript-minifier.com/raw > dist/vanilla.min.js

echo "Creating documentation..."

# npm install -g jsdoc
# npm install -g jsdoc-to-markdown
# jsdoc2md ./src/*/*.js > ./docs/README.md

echo "DONE!"