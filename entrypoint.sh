#!/bin/sh -l
npm bin
# How to pass value on this action
echo "::set-output name=result::'$(node index.js)'"