#!/bin/bash
# Author: Shin
# Last-modify-time: 2013-12-4 13:05

# 命令说明
DESCRIPTION='
Usage:
  make [options] api-name

options:
  -h            Display this help text.
  -c            Whether compile the test directory.
  --help        Same as -h option.
  --compile     Same as -c option.
'

TEST_FILE=''
COMPILE_CMD=''

# 动态解析 mocha 命令的路径
CMD_DIR="`dirname $0`"
TEST_CMD="$CMD_DIR/node_modules/.bin/mocha"
TEST_DIR="$CMD_DIR/test-bin"

# 使用mocha的 spec reporter
DEFAULT_MOCHA_OPTIONS="-R spec"

# 检测 mocha 是否已经安装
if [ ! -e $TEST_CMD ]; then
  echo "
Warnning!

Cannot find the 'mocha' command, use following command to install mocha:
    
    npm install mocha

If you have installed, you can see it in '$CMD_DIR/node_modules/.bin/mocha'.
  "
  exit 1
fi

# 函数定义：
# 根据参数获取测试文件
get_test_case_cmd () {
  case $1 in
    -h|--help)
      echo "$DESCRIPTION"
      exit 0
      ;;
    all)
      TEST_FILE="$TEST_DIR/**/test-*.js"
      ;;
    unit)
      TEST_FILE="$TEST_DIR/unit/**/test-*.js"
      ;;
    integrated)
      TEST_FILE="$TEST_DIR/integrated/**/test-*.js"
      ;;
		apis)
			node "$TEST_DIR/api-complier.js"
			exit 0
			;;
    *)
      if [ -d "$TEST_DIR/unit/$1" ]; then
        TEST_FILE="$TEST_DIR/unit/$1/test-$1.js"
      elif [ -d "$TEST_DIR/integrated/$1" ]; then
        TEST_FILE="$TEST_DIR/integrated/$1/test-$1.js"
      else
        echo "Error: Cannot find the test case '$1'."
        exit 1
      fi
      ;;
   esac
}

# 根据参数获取编译命令
get_compile_cmd () {
  if [ $1 = '-c' ] || [ $1 = '--compile' ]; then
    COMPILE_CMD='grunt compile'
  else
    echo "Error: Unknow option '$1'."
    exit 1
  fi
}

# 参数解析
if [ $# -eq 1 ]; then
  get_test_case_cmd $1
elif [ $# -eq 2 ]; then
  get_compile_cmd $1
  get_test_case_cmd $2
else
  echo "Error: Wrong parameters."
  echo "$DESCRIPTION"
  exit 1
fi

# 开始运行
echo "Start testing.."
$COMPILE_CMD && SERVER_ALREADY_RUNNING=true $TEST_CMD $DEFAULT_MOCHA_OPTIONS $TEST_FILE

exit 0
