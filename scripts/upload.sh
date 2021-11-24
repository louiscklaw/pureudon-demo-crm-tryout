#!/usr/bin/env bash

set -ex

CRM_DEMO_DIR=$PUREUDON_HOMEPAGE_PATH/demo/CRM-demo

sleep 1
./scripts/build.sh
sleep 1

pushd build
  rm -rf **/*.map
popd

ncftpput -R -v -m \
  -u $PUREUDON_FTP_USERNAME \
  -p $PUREUDON_FTP_PASSWORD \
  -Y "rm -rf $CRM_DEMO_DIR" \
  $PUREUDON_FTP_HOST \
  $CRM_DEMO_DIR \
  $PWD/build/*

ncftpput -R -v -m \
  -u $PUREUDON_FTP_USERNAME \
  -p $PUREUDON_FTP_PASSWORD \
  -Y "rm -rf $CRM_DEMO_DIR" \
  $PUREUDON_FTP_HOST \
  $CRM_DEMO_DIR \
  $PWD/overlay/.htaccess


# ncftpput -R -v -m \
#   -u $PUREUDON_FTP_USERNAME \
#   -p $PUREUDON_FTP_PASSWORD \
#   -Y "rm -rf $CRM_DEMO_DIR" \
#   $PUREUDON_FTP_HOST \
#   $CRM_DEMO_DIR \
#   $PWD/build/index.html