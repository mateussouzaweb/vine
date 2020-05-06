#!/bin/bash

echo "Creating distribution file..."

if [ -f dist/vanilla.ui.js ]
then
    rm dist/vanilla.ui.js
fi

if [ -f dist/vanilla.ui.min.js ]
then
    rm dist/vanilla.ui.min.js
fi

touch dist/vanilla.ui.js
touch dist/vanilla.ui.min.js

cat src/core/core.js \
    src/core/selector.js \
    src/core/events.js \
    src/component/component.js \
    src/component/mount.js \
    src/component/render.js \
    src/component/destroy.js \
    src/component/events.js \
    src/component/storage.js \
    src/http/http.js \
    src/storage/local.js \
    src/storage/session.js \
    >> dist/vanilla.ui.js

#cat src/http/router.js >> dist/vanilla.ui.js

curl -X POST -s --data-urlencode 'input@dist/vanilla.ui.js' https://javascript-minifier.com/raw > dist/vanilla.ui.min.js

echo "Done"

echo "Creating documentation..."

# npm install -g jsdoc
# npm install -g jsdoc-to-markdown
jsdoc2md ./src/*/*.js > ./docs/README.md

echo "Done"