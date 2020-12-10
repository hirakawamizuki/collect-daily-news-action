#!/bin/sh -l
npm bin
ls
# How to pass value on this action
echo "::set-output name=result::'$(node index.js)'"