#!/bin/bash
# 和其他语言一样，Shell 也可以包含外部脚本。这样可以很方便的封装一些公用的代码作为一个独立的文件。
# 表示引入另一个文件

. ./hello.sh

echo $test
