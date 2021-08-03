import React, { Component } from 'react'
import './index.css'

export default class index extends Component {
  render() {
    const { users, isFirst, isLoading, err } = this.props

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
