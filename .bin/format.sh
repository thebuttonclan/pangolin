#!/usr/bin/env bash

set -eo pipefail

files=("$@")

echo format-sh
echo $files
echo format-sh-end

yarn run eslint --ext .js,.jsx,.ts,.tsx $files
