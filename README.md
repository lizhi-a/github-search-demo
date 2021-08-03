# 运行方法
1.  在终端打开server文件夹，执行`node .\server.js`

2.  文件内含有三个src文件夹,三个文件夹使用的方法有所不同，要运行对应文件夹下的代码，将该文件夹命名为src。随后在终端打开 'github搜索' 文件夹，执行`npm start`
# 案例涉及知识点
## ES6知识点：解构赋值+重命名
```javascript
let obj ={a,{b:2}}
const {a} = obj					// 传统解构赋值
const {a:{b}} = obj				// 连续解构赋值
const {a：{b:value}} = obj		// 连续解构赋值+重命名
```
## 消息订阅与发布机制
1.	先订阅，再发布
2.	适用于任何组件内的通信
3.	在 componentWillUnmount() 中取消订阅
```javascript
// 订阅
this.token = Pubsub.subscribe('updateListState', (_, data) => {
      this.setState(data)
    })
// 更新信息
 Pubsub.publish('updateListState', { isLoading: false, users: data.items })
 // 取消订阅
 Pubsub.unsubscribe(this.token)
```
## fetch发送请求(关注分离设计思想)
==要考虑请求失败怎么办==
```javascript
try {
      const reponse = await fetch(`/api1/search/users2?q=${keyword}`)
      const data = await reponse.json()
      Pubsub.publish('updateListState', { isLoading: false, users: data.items })
    } catch (error) {
      console.log('请求出错', error)
      Pubsub.publish('updateListState', { isLoading: false, err: '请求出错:' + error.message })
    }
```
