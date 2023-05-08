#!/usr/bin/env bash

# if command 语句
# ----------------------------------------
if
    grep <"$(dirname "$0")"/_tmp.txt 'duoli'
then
    echo 'found duoli'
else
    echo 'not found duoli'
fi
