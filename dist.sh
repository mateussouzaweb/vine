#!/bin/bash

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

cat src/core/core.js >> dist/vanilla.ui.js
cat src/core/selector.js >> dist/vanilla.ui.js
cat src/core/events.js >> dist/vanilla.ui.js

cat src/component/component.js >> dist/vanilla.ui.js

cat src/http/http.js >> dist/vanilla.ui.js
#cat src/http/router.js >> dist/vanilla.ui.js

curl -X POST -s --data-urlencode 'input@dist/vanilla.ui.js' https://javascript-minifier.com/raw > dist/vanilla.ui.min.js

echo "Done"