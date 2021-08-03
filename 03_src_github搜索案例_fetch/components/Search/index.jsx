import React, { Component } from 'react'
import Pubsub from 'pubsub-js'
// import axios from 'axios'

export default class index extends Component {

  search = async () => {
    // 获取用户输入数据,连续解构赋值+重命名
    const { keywordElement: { value: keyword } } = this

    // 发送请求前，通知List更新状态
    Pubsub.publish('updateListState', { isFirst: false, isLoading: true })

    // #region 发送请求--axios
    // axios.get(`/api1/search/users2?q=${keyword}`).then(
    //   reponse => {
    //     console.log('reponse.data.items', reponse.data.items)
    //     // 请求成功后通知 List 更新状态
    //     Pubsub.publish('updateListState', { isLoading: false, users: reponse.data.items })
    //   },
    //   error => {
    //     // 请求失败通知 List 更新状态
    //     Pubsub.publish('updateListState', { isLoading: false, err: '请求出错:' + error.message })
    //   }
    // )
    //#endregion

    //#region 发送请求--fetch (未优化)
    // fetch(`/api1/search/users2?q=${keyword}`).then(
    //   response => {
    //     console.log('联系服务器成功了', response)
    //     return response.json()
    //   },
    //   error => {
    //     console.log('联系服务器失败了', error)
    //     return new Promise(() => { })
    //   }
    // ).then(
    // response => {
    //   console.log('获取数据成功了', response)
    // },
    //   error => {
    //     console.log('获取数据失败了', error)
    //   }
    // )
    //#endregion

    // 发送请求--fetch (优化)
    try {
      const reponse = await fetch(`/api1/search/users?q=${keyword}`)
      const data = await reponse.json()
      Pubsub.publish('updateListState', { isLoading: false, users: data.items })
    } catch (error) {
      console.log('请求出错', error)
      Pubsub.publish('updateListState', { isLoading: false, err: '请求出错:' + error.message })
    }
  }

  render() {
    return (
      <section className="jumbotron">
        <h3 className="jumbotron-heading">搜索github用户 </h3>
        <div>
          <input ref={c => this.keywordElement = c} type="text" placeholder="输入你要搜索的名字" />&nbsp;
          <button onClick={this.search}>搜索</button>
        </div>
      </section>

    )
  }
}
