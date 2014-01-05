#!/bin/bash
touch requests-responses/$1-channel/request-$2.ls
echo "request-$2 = {}" > requests-responses/$1-channel/request-$2.ls

touch requests-responses/$1-channel/response-$2.ls
echo -e "response-$2 =\n  result: \"success\"\n  errors: []" > requests-responses/$1-channel/response-$2.ls

touch schema/$1-channel/$2-schema.ls
echo "$2-schema = {}" > schema/$1-channel/$2-schema.ls

vi -p requests-responses/$1-channel/request-$2.ls requests-responses/$1-channel/response-$2.ls schema/$1-channel/$2-schema.ls
