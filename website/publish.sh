#!/bin/bash

set -e

# Start in website/ even if run from root directory
cd "$(dirname "$0")"

cd ../../combustion-gh-pages
# git checkout -- .
# git clean -dfx
# git fetch
# git rebase
rm -Rf *
cd ../combustion/website
brunch b
cp -R public/* ../../combustion-gh-pages/
rm -Rf public/
cd ../../combustion-gh-pages
# git add --all
# git commit -m "update website"
# git push
# cd ../combustion/website
