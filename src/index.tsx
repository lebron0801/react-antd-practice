import './public-path';
import React from 'react';
import ReactDOM from 'react-dom';
import '@/imports';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from '@/store';
import initializer from '@/config/initializer';

function render(props: any = {}) {
  const { container } = props;

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    container ? container.querySelector('#root') : document.querySelector('#root'),
    () => initializer()
  );
}

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log('应用开始启动');
}

export async function mount(props: any) {
  console.log('%cees-page应用挂载后的参数信息', 'color: red;font-weight: bold;', props);
  render(props);
}

export async function unmount(props: any) {
  const { container } = props;
  ReactDOM.unmountComponentAtNode(container ? container.querySelector('#root') : document.querySelector('#root'));
}

reportWebVitals();
