#!/usr/bin/env bash

set -ex

CRM_DEMO_DIR=$PUREUDON_HOMEPAGE_PATH/demo/CRM-demo

./scripts/build.sh

ncftpput -R -v -m \
  -u $PUREUDON_FTP_USERNAME \
  -p $PUREUDON_FTP_PASSWORD \
  -Y "rm -rf $CRM_DEMO_DIR" \
  $PUREUDON_FTP_HOST \
  $CRM_DEMO_DIR \
  $PWD/build/*
