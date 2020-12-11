#!/bin/sh -l
# Require command when this action runs on /github/workspace directory (GitHub Actions default workspace).
# It does not affect performance when this action runs on pure docker container.
npm install
# How to pass value on this action
echo "::set-output name=result::'$(node index.js aws)'"