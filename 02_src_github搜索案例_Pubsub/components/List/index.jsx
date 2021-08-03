import React, { Component } from 'react'
import Pubsub from 'pubsub-js'
import './index.css'

export default class index extends Component {

  // 初始化状态
  state = {
    users: [],
    isFirst: true,   //是否为第一次打开页面
    isLoading: false,    //是否在加载
    err: '',      //存储请求相关错误信息
  }

  componentDidMount() {
    this.token = Pubsub.subscribe('updateListState', (_, data) => {
      this.setState(data)
    })
  }
  
  componentWillUnmount(){
    Pubsub.unsubscribe(this.token)
  }
  render() {
    const { users, isFirst, isLoading, err } = this.state

    return (
      < div className="row" >
        {
          isFirst ? <h2>欢迎使用,请输入用户名进行搜索~</h2> :
            isLoading ? <h2>Loading...</h2> :
              err ? <h2 style={{ color: 'red' }}>{err}</h2> :
                users.map((userObj) => {
                  return (
                    <div className="card" key={userObj.id}>
                      <a href={userObj.html_url} target="_blank" rel="noreferrer">
                        <img alt="hand_portrait" src={userObj.avatar_url} style={{ width: '100px' }} />
                      </a>
                      <p className="card-text">{userObj.login}</p>
                    </div>
                  )
                })
        }
      </div >
    )
  }
}
