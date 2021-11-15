#!/bin/bash

echo "syncing images with oss"

ACCESS_KEY_ID=$1
ACCESS_SECRET=$2
CONFIG_FILE="./ossconfig"
BUCKET="haopai-public"
REGION="cn-shenzhen"

echo -e "[Credentials]" > "$CONFIG_FILE"
echo -e "language=EN" >> "$CONFIG_FILE"
echo -e "endpoint=https://oss-${REGION}.aliyuncs.com" >> "$CONFIG_FILE"
echo -e "accessKeyID=${1}" >> "$CONFIG_FILE"
echo -e "accessKeySecret=${2}" >> "$CONFIG_FILE"

chmod 755 ./ossutil64
yes | ./ossutil64 sync ./images "oss://$BUCKET/news/" --delete -c "$CONFIG_FILE"
