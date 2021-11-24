#!/usr/bin/env bash

set -ex

./scripts/lint_modified.sh

rm -rf build

yarn build
