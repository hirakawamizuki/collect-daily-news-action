#!/bin/sh -l
node index.js
# How to pass value on this action
echo "::set-output name=result::'$(node index.js)'"