#!/bin/bash

URL="localhost:3000"

while :
do
    curl -s $URL -X POST -d value=$(($RANDOM % 1000)) > /dev/null
done
