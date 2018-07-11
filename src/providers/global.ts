import { Injectable } from '@angular/core';
import $$ from '../utils';

@Injectable()
export class GlobalService {
    private toastTimer: any = null;
    public isMobile: boolean = false;
    public token: string = '';
    public userInfo: any = {};
    public isLoading: boolean = false;
    public toastMessage: string = '';
    public hotWordList: Array<any> = [];
    public categoryList = [];
    public isMenuVisible = false
    constructor() {
        this.getLocalToken();
        this.getDeviceType();
    }

    //查看设备类型
    getDeviceType() {
        this.isMobile = $$.isMobile();
    }

    //设置loading
    setLoadingState(bool: boolean) {
        this.isLoading = bool;
    }

    //设置token
    setToken(token: string) {
        this.token = token;
    }

    //获取本地缓存token
    getLocalToken(): void {
        let token: string = localStorage.__bestToken__ || '';
        this.token = token;
    }

    //设置气泡提示
    setToast(msg: string) {
        this.toastTimer && clearTimeout(this.toastTimer);
        this.toastMessage = msg;
        this.toastTimer = setTimeout(() => {
            this.toastMessage = ''
        }, 2000);
    }



    //获取分类
   setCategoryList(categoryList: Array<any>){
        this.categoryList = categoryList;
    }

    //状态修改
    setState(obj:any){
        Object.keys(obj).map(key=>{
            this[key]=obj[key];
        });
    }
}