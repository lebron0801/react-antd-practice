import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '@/store/reducers';
import rootSaga from './sagas';
import thunk from 'redux-thunk';
import loggerMiddleware from './middlewares/loggers';

// 创建saga中间件
const sagaMiddleware = createSagaMiddleware();
// 创建管理器
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware, thunk, loggerMiddleware)));
// 启动sage
sagaMiddleware.run(rootSaga);

export default store;
