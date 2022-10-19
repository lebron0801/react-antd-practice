import React from 'react';
import io from 'socket.io-client';

class UserManage extends React.Component {
  componentDidMount() {
    const socket = io('http://localhost:7001', {
      query: {
        room: 'demo',
        userId: `client_123`
      },
      reconnectionAttempts: 5,
      transports: ['websocket']
    });

    socket.on('connect', () => {
      const id = socket.id;

      console.log('通道编号', id);

      // 监听自身 id 以实现 p2p 通讯
      socket.on(id, (msg: any) => {
        console.log('接受消息', msg);
      });

      // 接收在线用户信息
      socket.on('online', (msg: any) => {
        console.log('在线用户信息', msg);
      });

      // 反馈信息
      socket.on('res', (msg: any) => {
        console.log('反馈信息', msg);
      });

      // 系统事件
      socket.on('disconnect', (msg: any) => {
        console.log('失去连接消息', msg);
      });

      // 系统事件
      socket.on('disconnecting', () => {
        console.log('断开中...');
      });

      // 系统事件
      socket.on('error', () => {
        console.log('链接错误');
      });

      window.socket = socket;
    });
  }

  render() {
    return (
      <div className="user-manage-wrapper">
        <span>用户管理</span>
      </div>
    );
  }
}

export default UserManage;
