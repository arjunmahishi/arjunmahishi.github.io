# !/bin/bash

hugo
rm -rf docs
mv public docs
