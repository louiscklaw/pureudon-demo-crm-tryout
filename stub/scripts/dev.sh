#!/usr/bin/env bash

set -ex

yarn

sudo kill $(fuser 3001/tcp) || true

nodemon ./index.js
