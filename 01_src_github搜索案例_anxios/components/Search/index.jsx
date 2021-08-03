import React, { Component } from 'react'
import axios from 'axios'

export default class index extends Component {

  search = () => {
    // 获取用户输入数据,连续解构赋值+重命名
    const { keywordElement: { value: keyword } } = this

    // 发送请求前，通知APP更新状态
    this.props.updateAppState({ isFirst: false, isLoading: true })

    // 发送请求
    axios.get(`/api1/search/users?q=${keyword}`).then(
      reponse => {
        console.log('reponse.data.items', reponse.data.items)
        // 请求成功后通知 App 更新状态
        this.props.updateAppState({ isLoading: false, users: reponse.data.items })
      },
      error => {
        // 请求失败通知 App 更新状态
        this.props.updateAppState({ isLoading: false, err: '请求出错:' + error.message })
      }
    )
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
