if [ -z "$1" ]; then
  echo Usage: create-test-sample.sh test-type feature-name
  echo "test-type: unit | integrated"
  exit 1
fi

dirname=$1
if cd ${dirname:?"Cannot found directory name"}
then
  if [ -z "$2" ]; then
    echo "Usage: create-test-sample.sh test-type feature-name"
    echo "test-type: unit | integrated"
    exit 1
  fi

  mkdir $2 && cd $2
  mkdir fixture && touch test-$2.ls
  echo -e "# 使用utils.load-fixture FIXTURE_PATH + '/somefilename'来加载需要的数据
# 比如加载fixture/users-in-db.ls文件，可以这样写 utils.load-fixture FIXTURE_PATH + 'users-in-db'
FIXTURE_PATH = '$1/$2/fixture/'

describe '$1 test -- $2', !->
  before-each !(done)->
    <-! server.start
    socket-helper.clear-all-client-sockets!
    # 通过第二个参数来加载需要的fixture，比如['users']表示加载fixture/users-in-db.ls文件到数据库
    utils.clean-db-and-load-fixture '$1/$2', [], done

  after-each !(done)->
    socket-helper.Sockets-destroyer.get!.destroy-all!
    server.shutdown!
    done!
" > test-$2.ls

else
  echo "Failed."
fi
