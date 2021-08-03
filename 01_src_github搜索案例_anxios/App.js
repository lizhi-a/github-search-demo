import React, { Component } from 'react'
import Search from './components/Search'
import List from './components/List'

export default class App extends Component {
  // 初始化状态
  state = {
    users: [],
    isFirst: true,   //是否为第一次打开页面
    isLoading: false,    //是否在加载
    err: '',      //存储请求相关错误信息
  }

  // 更新App状态
  updateAppState = (stateObj) => {
    this.setState(stateObj)
  }

  render() {
    return (
      <div className="container">
        <Search updateAppState={this.updateAppState} saveUsers={this.saveUsers} />
        <List {...this.state}  />
      </div>
    )
  }
}
