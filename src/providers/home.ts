import { Injectable } from '@angular/core';
import { RequestService } from './request';
import { PAGE_SIZE } from '../config/index';
import { GlobalService } from './global';
import { category } from '../config/data';
import { NativeStorage } from '@ionic-native/native-storage';
import { Platform } from 'ionic-angular';

interface Params{
	pageIndex?:number,
	currentCategoryIndex:number,
	isRefreshing?:boolean,
	pageSize?:number, 
	category?:string
}

@Injectable()
export class HomeService {
	private pageSize:number = PAGE_SIZE;

	//公用的文章列表，防止重复请求
	public categoryArticleList:Array<any> = [];
    constructor(
    	public request: RequestService, 
    	public globalService: GlobalService,
    	public nativeStorage: NativeStorage,
    	public platform:Platform
    ){
		this.getCategoryList();
		localStorage.categoryArticleList && (this.categoryArticleList =  JSON.parse(localStorage.categoryArticleList));
    }
	
    //获取文章列表
    getArticleList(params: Params){
    	return new Promise(async (resolve, reject)=>{
    		if(!this.categoryArticleList.length) return;
	    	let { currentCategoryIndex, isRefreshing } = params;

	    	//请求中返回
	    	if(this.categoryArticleList[currentCategoryIndex].isRefreshing || this.categoryArticleList[currentCategoryIndex].isMoring) return;
	    	this.categoryArticleList[currentCategoryIndex].isRefreshing = isRefreshing;
	    	this.categoryArticleList[currentCategoryIndex].isMoring = !isRefreshing;

	    	//缓存当前页码
	    	let _pageIndex:number = this.categoryArticleList[currentCategoryIndex].pageIndex;
	    	if(isRefreshing) this.categoryArticleList[currentCategoryIndex].pageIndex = 1;
	    	if(!isRefreshing) params.pageIndex = this.categoryArticleList[currentCategoryIndex].pageIndex + 1;
	    	let category = this.categoryArticleList[currentCategoryIndex].name;
	    	params = {...params, category, pageSize:this.pageSize};
	    	try{

	    		let res:any = await this.request.get({url:'/article/getList', params});
				this.categoryArticleList[currentCategoryIndex].isRefreshing = false;
				this.categoryArticleList[currentCategoryIndex].isMoring = false;
				this.categoryArticleList[currentCategoryIndex].total = res.total;

				//isMore
				if(params.pageIndex* this.pageSize >= res.total){
					this.categoryArticleList[currentCategoryIndex].isMore = false;
				}else{
					this.categoryArticleList[currentCategoryIndex].isMore = true;
				}


				if(!!isRefreshing){
					console.log('refresh')
					this.categoryArticleList[currentCategoryIndex].articleList = res.data;
					localStorage.categoryArticleList = JSON.stringify(this.categoryArticleList);
				}
				if(!isRefreshing){
					console.log('loadMore')
					this.categoryArticleList[currentCategoryIndex].articleList = this.categoryArticleList[currentCategoryIndex].articleList.concat(res.data);
					this.categoryArticleList[currentCategoryIndex].pageIndex = params.pageIndex;
				}
				
				// if(this.platform.is('cordova')) await this.nativeStorage.setItem('categoryArticleList', this.categoryArticleList);
				return resolve();
	    	}catch(e){

	    		console.log(e, 'HomeService getArticleList error');

	    		this.categoryArticleList[currentCategoryIndex].isRefreshing = false;
				this.categoryArticleList[currentCategoryIndex].isMoring = false;
				this.categoryArticleList[currentCategoryIndex].pageIndex = _pageIndex;
				// localStorage.categoryArticleList = JSON.stringify(this.categoryArticleList);
				// if(this.platform.is('cordova')) await this.nativeStorage.setItem('categoryArticleList', this.categoryArticleList);
	    		return reject();
	    	}
    	});
    }

    //获取分类列表
	async getCategoryList(){
		// let res:any = await this.request.get({url:'/category/getList', params:{}});
		let categoryList:Array<any> = category.data;
		categoryList.unshift({name:'', category:'全部'})
		categoryList.map(item=>{
			let _item:any = {};
			//后台返回的分类都是有name的，否则就是自定义的分类了
			!item.name ? (_item.category = '全部') : (_item.category = item.name);
			_item.name = item.name;
			_item.pageIndex = 1;
			_item.total = PAGE_SIZE+1;
			_item.isRefreshing = false;
			_item.isMoring = false;
			_item.isMore = true;
			_item.articleList = [];
			this.categoryArticleList.push(_item);
		});

		this.getArticleList({isRefreshing:true, currentCategoryIndex:0});
		this.globalService.setCategoryList(categoryList);
	}
}
