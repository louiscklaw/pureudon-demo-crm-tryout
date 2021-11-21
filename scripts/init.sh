#!/usr/bin/env bash

set -ex

# rm -rf node_modules

npx browserslist@latest --update-db

yarn add react-i18next
yarn add notistack@latest-mui-v4

yarn --dev
