import './css/login.css'
import dva from 'dva';
import * as React from "react";
import App from "./app";
import {reducer as formReducer} from 'redux-form'
import LoginModel from "./model";

// 创建应用
const app = dva({
    extraReducers: {
        form: formReducer,
    },
});
// 注册视图

app.router(() => <App/>);

app.model(require('./model').default);

// 启动应用
app.start('#root');
