#!/bin/bash

set -e

# Start in combustion/ even if run from root directory
cd "$(dirname "$0")"

cd ../combustion-release
# git checkout -- .
# git clean -dfx
# git fetch
# git rebase
rm -Rf *
cd ../combustion
yarn build
cp -R build/* ../combustion-release/
rm -Rf build/
# git add --all
# git commit -m "update website"
# git push
# cd ../combustion/website
