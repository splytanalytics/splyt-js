#!/bin/bash

echo "Copying unmangled source into Tools..."
grunt debug
cp ~/rsb/splyt-sdk/js/bin/Splyt.slim.js ~/rsb/splyt-tools/server/presentation/js/splyt/

echo "Copying minified source into Tools..."
grunt
cp ~/rsb/splyt-sdk/js/bin/Splyt.slim.min.js ~/rsb/splyt-tools/server/presentation/js/splyt/

echo "Done"