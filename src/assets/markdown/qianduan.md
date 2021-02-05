# mongoDB 数据库

## 1.进入 mongodb

```
mongo
```

## 2.数据库操作

#### 2.1 显示所有数据库

```
show dbs
```

#### 2.2 使用数据库

```
use itying
```

#### 2.3 创建数据集合（表）并新增一条数据

```
db.user.insert({"username":"zhangsan","age":25})
```

#### 2.4 删除数据库

```
use itying
db.dropDatabase()
```

## 3.数据集合(表)操作

#### 3.1 查看数据库有哪些数据集合（表）

```
show collections
```

#### 3.2.删除集合

```
db.user.drop()
```

## 4.查询数据

#### 4.1 查询表内所有数据

```
db.user.find()
```

#### 4.2 查询 age=25 的记录

```
db.user.find({"age":25});
```

#### 4.3 查询 age&gt;=25 的记录

```
db.user.find({"age":{&#36;gt:25}});
```

#### 4.4 查询 age&lt;=25 的记录

```
db.user.find({"age":{&#36;lt:25}});
```

#### 4.5 查询 age&gt;=23 并且&lt;=26 的记录

```
db.user.find({"age":{&#36;gte:23,&#36;lte:26}})
```

#### 4.6 查询 name 中包含 mongo 的数据 (模糊查询)

```
db.user.find({"name":/mongo/})
```

#### 4.7 查询 name 中以 mogon 开头的

```
db.user.find({"name":/^mongo/})
```

#### 4.8 查询 name 中以 mogon 结尾的

```
db.user.find({"name":/mongo&#36;/})
```

#### 4.9 查询指定列数据

```
db.user.find({},{age:1})
```

#### 4.10 升序

```
db.user.find().sort({age:1})
```

#### 4.11 降序

```
db.user.find().sort({age:-1})
```

#### 4.12 查询前 5 条数据

```
db.user.find().limit(5)
```

#### 4.13 查询 10 条以后的数据

```
db.user.find().skip(10)
```

#### 4.13 查询第 3、4 条数据的数据

```
db.user.find().skip(2).limit(2)
```

#### 4.14 查询表里有多少条数据

```
db.user.find().count()
```

#### 4.15 分页查询

每一页 10 条数据 查询第 3 页的数据
skip((Page-1)\*PageSize)
limit(PageSize)

```
db.user.find().skip(20).limit(10)
```

#### 4.16 或者 or 查询

```
db.user.find({&#36;or:[{age:22},{age:25}]});
```

#### 4.17 查询第一条数据

```
db.user.findOne()
```

## 5.修改数据

#### 查找名字叫"小明"的，把年龄更改为"16"岁

```
db.user.update({"name":"小明"},{&#36;set:{"age":16}})
```

#### 查找名字叫"wangwu"并且年龄等于 13 的，把性别改成"男"

```
db.user.update({"name":"wangwu","age":13},{&#36;set:{"sex":"男"}})
```

如果不使用\$set 会将数据整个替换掉

#### 批量修改数据(更改所有匹配的项目)

查找年龄等于 13 岁的，把所有人的性别改成"男"

```
db.user.update({"name":13},{&#36;set:{"sex":"男"}},{multi:true})
```

#### 查找名字叫"Lisi"的，把年龄加"50"

```
db.user.update({"name":"Lisi"},{&#36;inc:{"age":50}},false,true);
```

#### 查找名字叫"Lisi"的，把年龄加"50"名字改为"hoho"

```
db.user.update({"name":"Lisi"},{&#36;inc:{"age:50},&#36;set{"name":"hoho"}},false,true);
```

## 6.删除数据

#### 把"name"为"wangwu111"的所有数据删除

```
db.user.remove({"name":"wangwu111"})
```

#### 把"name"为"wangwu111"的一条数据删除

```
db.user.remove({"name":"wangwu111"},{justOne:true})
```

## 7. 查询语句执行时间

```
db.user.find({"name":"wangwu"}).explain("executionStats")
```

## 8.索引

#### 创建索引

1 表示升序
-1 表示降序
"username"为列名

```
db.user.ensureIndex({"username":1})
```

#### 获取当前集合的索引

```
db.user.getIndexes()
```

#### 删除索引

```
db.user.dropIndex({"username":1})
```

#### 复合索引

```
db.user.ensureIndex({"username":1,"age":-1})
```

如果只用后面的字段查询 不会命中索引

#### 创建索引时命名

```
db.user.ensureIndex({"username":1},{"name":"userindex"})
```

#### 创建唯一索

```
db.user.ensureIndex({"userid":1},{"unique":true})
```

## 账户权限管理

- 1.数据库用户角色:read、readWrite;
- 2.数据库管理角色:adAdmin、adOwner、userAdmin;
- 3.集群管理角色:clusterAdmin、clusterManager、clusterMonitor、hostManager;
- 4.备份恢复角色:backup、restore;
- 5.所有数据库角色:readAnyDatabase、readWriteAnyDatabase、userAdminAnyDatabase、dbAdminAnyDatabase
- 6.超级管理员:root

#### 创建超级管理员账户

- 1.use admin 进入 admin 数据库
- 2.show users 显示所有管理员账户和权限
- 3.创建超级管理员

```
db.createUser({
	user:&apos;admin&apos;,
	pwd:&apos;123456&apos;,
	roles[{role:&apos;root&apos;,db:&apos;admin&apos;}]
})
```

- 4.修改 mongodb 数据库配置文件(MongoDB\Server\4.0\vin\mongod.cfg)

```
security:
	authorization:enabled
```

- 5.使用超级管理员账户链接数据库

```
mongon admin -u 用户名 -p 密码

// 远程链接数据库
// mongon 192.168.1.200:27017/数据库 -u 用户名 -p 密码
```

- 6.给某个数据库添加管理员账户

```
db.createUser({
	user:&apos;dbadmin&apos;,
	pwd:&apos;123456&apos;,
	roles[{role:&apos;dbOwner&apos;,db:&apos;数据库&apos;}]
})
```

#### 删除管理员账户

```
db.dropUser(&apos;admin&apos;)
```

#### 修改用户密码

```
db.updateUser("admin",{pwd:"password"})
```

#### 密码认证

```
db.auth("admin","password")
```

## 聚合管道（aggregate(【{}】))

### 管道操作符

- \$project:增加、删除、重命名字段
- \$match:条件匹配。只满足条件的文档才能进入下一阶段
- \$limit:限制结果的数量
- \$skip:跳过文档的数量
- \$sort:条件排序
- \$group:条件组合的结果 统计
- \$lookup:用以引用其他集合的数据

### 管道表达式

- \$addToSet:将文档指定字段去重
- \$max:文档指定字段最大值
- \$min:文档指定字段最小值
- \$sum:文档指定字段求和
- \$avg:文档指定字段求平均
- \$gt:大于给定值
- \$lt:小于给定值
- \$gte:大于等于给定值
- \$lte:小于等于给定值

### 使用管道

#### 只显示想要的字段(\$project)

```
db.order.aggreate([
	{&#36;project:{&apos;order_id&apos;:1,&apos;trade_no&apos;:1,&apos;all_price&apos;:1}}
])

//等同于

db.order.find({},{&apos;order_id&apos;:1,&apos;trade_no&apos;:1,&apos;all_price&apos;:1})
```

#### 只显示想要的字段且总价格大于等于 90 的数据

```
db.order.aggreate([
	{&#36;project:{&apos;order_id&apos;:1,&apos;trade_no&apos;:1,&apos;all_price&apos;:1}},
	{&#36;match:{"all_price":{&#36;gte:90}}}
])
```

#### 以 order_id 分组并且算出组内 num 的和

```
db.order_item.aggregate([
	{
		&#36;group:{_id:"&#36;order_id",total:{&#36;sum:"&#36;num"}}
	}
])
```

#### 对 all_price 进行降序排序

```
db.order_item.aggregate([
	{
		&#36;sort:{"all_price":-1}
	}
])
```

#### 跳过 1 条查询

```
db.order.aggregate([
	{
		&#36;skip:1
	}
])
```

#### 表与表之间的关联查询

```
db.order.aggregate([
	{
		&#36;lookup:{
			from:"order_item",
			localField:"order_id",
			foreignField:"order_id",
			as:"items"
		}
	}
])
```

## 导入导出数据库

#### 导出备份数据库

```
mongodump -h IP地址 -d 数据库名称 -o 导出路径
```

参数说明

- -h:mongoDB 所在的服务器地址，例如：127.0.0.1，当然也可以指定端口：127.0.0.1:27017
- -d:需要备份的数据库实例，例如：test
- -o:备份数据库存放的位置

#### 导入恢复数据库

```
mongorestore -h IP地址 -d 数据库名称 导入路径
```

参数说明

- -h:mongoDB 所在的服务器地址，例如：127.0.0.1，当然也可以指定端口：127.0.0.1:27017
- -d:需要恢复的数据库实例，例如：test
- --drop:恢复的时候，先删除当前数据，然后恢复备份的数据。就是说，恢复后，备份后添加添加修改的数据都会被删除，慎用！

#### mongodb 数据库有用户名密码认证的参考下面命令

```
mongondump -h localhost:27017 -d test -u test -p testpwd -o D:\dump


mongorestore -h localhost:27017 -d test -c order --dir d:\dump\test\test.bson -u test -p testpwd
```
