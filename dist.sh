#!/bin/bash
create_dist() {

    if [ -f dist/$1.js ]; then
        rm dist/$1.js
    fi

    if [ -f dist/$1.min.js ]; then
        rm dist/$1.min.js
    fi

    touch dist/$1.js
    touch dist/$1.min.js

}

create_minify() {

    curl -X POST -s \
        --data-urlencode 'input@dist/'$1'.js' \
        https://javascript-minifier.com/raw > dist/$1.min.js

}

echo "Creating distribution files..."

create_dist vanilla.ui;
create_dist vanilla.component;
create_dist vanilla.router;

cat src/core/core.js \
    src/core/selector.js \
    src/core/events.js \
    src/http/http.js \
    src/storage/local.js \
    src/storage/session.js \
    >> dist/vanilla.ui.js

cat src/component/component.js \
    src/component/mount.js \
    src/component/render.js \
    src/component/destroy.js \
    src/component/events.js \
    src/component/storage.js \
    >> dist/vanilla.component.js

cat src/router/router.js \
    >> dist/vanilla.router.js

echo "Creating minify version distribution file..."

create_minify vanilla.ui
create_minify vanilla.component
create_minify vanilla.router

echo "Creating documentation..."

# npm install -g jsdoc
# npm install -g jsdoc-to-markdown
jsdoc2md ./src/*/*.js > ./docs/README.md

echo "Done"