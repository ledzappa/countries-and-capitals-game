#!/bin/bash

rm -rf ./docs
mkdir ./docs
rsync -av --progress . ./docs --exclude ./docs
rm -rf ./docs/package.json
rm -rf ./docs/package-lock.json
rm -rf ./docs/docs
rm -rf ./docs/deploy.sh
rm -rf ./docs/.vscode
rm -rf ./docs/README.md 
rm -rf ./docs/.gitignore
rm -rf ./docs/_config.yml