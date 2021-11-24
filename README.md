# Redis Tutorial

Redis is an open-source in-memory data structure store which can be used as database, cache and message broker. Redis is a NO SQL database with key-value pair (simplest data model).

## Redis datatype

- Strings
- Lists
- Sets
- Sorted Sets
- Hashes
- Bitmaps
- Hyperlogs
- Geospatial Indexes

## Advantages of Redis

- very flexible
- no schemas and column names
- very fast
- rich datatype support
- caching and disk persistence

## Installation

### Windows

1. Go to [Microsoft archive](https://github.com/microsoftarchive/redis/releases)
2. Download `Redis-x64-3.0.504.msi`
3. Install and check add path for environment variable (enable use redis command at any directory).
4. Start using Redis

If you install with `Redis-x64-3.0.504.zip`, you need to extract the file and add the path for environment variable by yourself. Also, You can open redis server and redis cli directly in the folder.

- Open `redis-server.exe` to start Redis server (port 6379 as default).
- Open `redis-cli.exe` to interact with Redis as a client.

## Redis Basic Command

After installation, open redis-server and redis-cli to start working with redis.

- `ping` - check connection
- `quit` - exit redis-cli
- `SET` or `set` - create key-value pair data
- `GET` or `get` - get value from key (only use for string data type)
- `DEL` or `del` - delete key value
- `EXISTS` or `exists` - check whether the value is existed in the key or not
- `(integer 1)` - return true
- `(integer 0)` - return false
- `(nil)` - return null
- `keys *` - show all keys
- `flushall` - delete all key-value pairs

```
PS C:\Users\first> redis-cli

127.0.0.1:6379> ping
PONG

127.0.0.1:6379> set name carlos
OK

127.0.0.1:6379> get name
"carlos"

127.0.0.1:6379> set age 21
OK

127.0.0.1:6379> get age
"21"

127.0.0.1:6379> SET email carlos@example.com
OK

127.0.0.1:6379> GET email
"carlos@example.com"

127.0.0.1:6379> DEL age
(integer) 1

127.0.0.1:6379> get age
(nil)

127.0.0.1:6379> quit

PS C:\Users\first>

PS C:\Users\first> redis-cli

127.0.0.1:6379> get name
"carlos"

127.0.0.1:6379> exists name
(integer) 1

127.0.0.1:6379> exists age
(integer) 0

127.0.0.1:6379> keys *
1) "name"
2) "email"

127.0.0.1:6379> flushall
OK

127.0.0.1:6379> keys *
(empty list or set)

127.0.0.1:6379>
```

## Set Time To Live (TTL)

Set live time of key-value pair with `expire <key> <second>`

```
127.0.0.1:6379> set name carlos
OK

127.0.0.1:6379> get name
"carlos"

127.0.0.1:6379> ttl name
(integer) -1

127.0.0.1:6379> expire name 6
(integer) 1

127.0.0.1:6379> ttl name
(integer) 4

127.0.0.1:6379> ttl name
(integer) 2

127.0.0.1:6379> ttl name
(integer) 1

127.0.0.1:6379> ttl name
(integer) -2

127.0.0.1:6379> get name
(nil)
```

### shorthand

```
setex name 6 carlos
```

## List

- `lpush <list> <data>`- push data into a list
- `lpop <list>`- pop the first data from a list
- `rpop <list>`- pop the last data from a list
- `lrange <list> <start_index> <end_index>`- pop data out of a list
-

```
127.0.0.1:6379> lpush foods tom-yum
(integer) 1

127.0.0.1:6379> lpush foods salad
(integer) 2

127.0.0.1:6379> lpush foods som-tum
(integer) 3

127.0.0.1:6379> get foods
(error) WRONGTYPE Operation against a key holding the wrong kind of value

127.0.0.1:6379> lrange foods 0 -1
1) "som-tum"
2) "salad"
3) "tom-yum"

127.0.0.1:6379> lpop foods
"som-tum"

127.0.0.1:6379> lrange foods 0 -1
1) "salad"
2) "tom-yum"

127.0.0.1:6379> rpop foods
"tom-yum"

127.0.0.1:6379> lrange foods 0 -1
1) "salad"

```

## Set

Store unique data, no duplicate data

- `sadd` - add a value in a set
- `srem` - remove a value in a set
- `smembers` - show all values in a set
-

```
127.0.0.1:6379> sadd countries Thailand
(integer) 1

127.0.0.1:6379> sadd countries Japan
(integer) 1

127.0.0.1:6379> smembers countries
1) "Thailand"
2) "Japan"

127.0.0.1:6379> srem countries Thailand
(integer) 1

127.0.0.1:6379> smembers countries
1) "Japan"

```

## Hash

Key-value pair data type

- `hset <hash> <key> <value>` - create key-value pair in a hash
- `hget <hash> <key>` - get value from key
- `hgetall <hash>` - get all key-value pair in a hash
- `hdel <hash> <key>` - delete key-value pair
- `hexists <hash> <key>` - check whether key-value is existed or not

```
127.0.0.1:6379> hset animals name dog
(integer) 1
127.0.0.1:6379> hget animals name
"dog"
127.0.0.1:6379> hgetall animals
1) "name"
2) "dog"
127.0.0.1:6379> hdel animals name
(integer) 1
127.0.0.1:6379> hget animals name
(nil)
127.0.0.1:6379> hexists animals name
(integer) 0
```
