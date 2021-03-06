#!/usr/bin/env bash

set -x

echo 'checking modified'
MODIFIED=`git status $PWD | \
  grep -v '.json' | \
  grep -v '.del' | \
  grep -i '.js' | \
  grep -i modified | \
  awk -F: -F' ' '{print $2}'`

for i in $MODIFIED; do
  yarn fix-lint-errors $i &
done


echo 'checking new file'
MODIFIED=`git status $PWD | \
  grep -v '.json' | \
  grep -v '.del' | \
  grep -i '.js' | \
  grep -i "new file" | \
  awk -F: -F' ' '{print $3}'`

for i in $MODIFIED; do
  yarn fix-lint-errors $i &
done

wait


echo 'checking untracked'
UNTRACKED=`git ls-files --others --exclude-standard $PWD | \
  grep -v '.json' | \
  grep -v '.del' | \
  grep -i '.js' `

for i in $UNTRACKED; do
  yarn fix-lint-errors $i &
done


wait
