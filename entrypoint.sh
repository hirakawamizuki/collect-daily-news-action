#!/bin/sh -l
npm install
# How to pass value on this action
echo "::set-output name=result::'$(node index.js)'"