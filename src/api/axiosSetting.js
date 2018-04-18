/**
 * Created by wyg on 2017/10/18.
 */

import axios from 'axios';
import qs from 'qs'
import { Loading, Message } from 'element-ui'
import proConfig from '../config';
import sessionStorage from '@/storage/sessionStorage'

let AxiosIns = axios.create({
    baseURL: proConfig.apiUrl,
    timeout: 20000,
    ContentType: 'application/x-www-form-urlencoded',
    // ContentType: 'application/json',
})

let timer = [];
let delay = 300;
class GLoading {
    constructor(ops) {
        this.loadingIns = {
            close() {}
        };
        this.options = Object.assign({
            fullscreen: true,
            text: '加载中'
        }, ops);
    }

    open() {
        this.loadingIns = Loading.service(this.options);
    }

    close() {
        try {
            this.loadingIns.close();
        } catch (e) {
            // //Console.log(e);
        }
    }
}
let load = new GLoading();
AxiosIns.interceptors.request.use(config => {
    config.headers.tokenId = sessionStorage.$getSessionStorageByName('tokenId')
    if (config.showFullLoading !== 'close') {
        timer.push(setTimeout(() => {
            //添加菊花
            load.open();
        }, delay))
    }
    config.data = qs.stringify(config.data);
    return config;
}, function(error) {
    return Promise.reject(error);
});

AxiosIns.interceptors.response.use(response => {
    for (let t of timer) {
        clearTimeout(t);
    }
    //请求结束 清除菊花
    load.close();
    try {
        if (response.data) {
            if (response.data.code !== '0000') {
                Message({
                    message: response.data.msg,
                    type: 'error'
                });
            }
        }
    } catch (error) {
        // console.log(error)
    }
    return response.data;
}, (error) => {
    for (let t of timer) {
        clearTimeout(t);
    }
    //关闭菊花
    load.close();
    Message({
        message: error.message,
        type: 'error'
    });
    // try {
    //   //401跳登录
    //   if (error.response.data.code === '0001') {
    //     setTimeout(() => {
    //       Vue.$router.push({
    //         path: '/login'
    //       })
    //     }, 100)
    //   }
    // } catch (e) {
    //   console.log(e);
    // }
    return Promise.reject(error);
})
export default AxiosIns;