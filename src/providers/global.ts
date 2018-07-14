import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from 'ionic-angular';
import $$ from '../utils';

@Injectable()
export class GlobalService {
    public isMobile: boolean = false;
    public token: string = '';
    public userInfo: any = {};
    public isLoading: boolean = false;
    public loading: any;
    public toastMessage: string = '';
    public hotWordList: Array<any> = [];
    public categoryList = [];
    public isMenuVisible = false
    constructor(public toastController:ToastController, public loadingController: LoadingController) {
        this.getLocalToken();
        this.getDeviceType();
        this.loading = loadingController.create({dismissOnPageChange:true});
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

    //设置loading
    setLoading(bool:boolean){
        !this.loading && (this.loading = this.loadingController.create({dismissOnPageChange:false}));
        if(!!bool){
            this.isLoading = true;

            this.loading.present();
            return false;
        } 
        this.isLoading = false;
        this.loading.dismiss();
        this.loading = null;
    }

    //获取本地缓存token
    getLocalToken(): void {
        let token: string = localStorage.__bestToken__ || '';
        this.token = token;
    }

    //设置气泡提示
    setToast(msg: string) {
        this.toastMessage = msg;
        this.toastController.create({
            message: this.toastMessage,
            duration: 2000,
            position: 'middle'
        }).present();
    }

    //获取分类
   setCategoryList(categoryList: Array<any>){
        this.categoryList = categoryList;
    }

    //状态修改
    setState(obj:any){
        Object.keys(obj).map((key:any)=>{
            this[key]=obj[key];
        });
    }
}