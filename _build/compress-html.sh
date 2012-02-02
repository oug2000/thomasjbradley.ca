#!/usr/bin/env sh

htmlcompressor --type html --recursive --preserve-php --preserve-server-script --remove-quotes --simple-bool-attr -o ./__remote/ ./__remote/
