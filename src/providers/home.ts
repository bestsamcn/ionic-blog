import { Injectable } from '@angular/core';
import { RequestService } from './request';
import { PAGE_SIZE } from '../config/index';
import { GlobalService } from './global';
import { category } from '../config/data';

interface Params{
	pageIndex:number,
	pageSize?:number, 
	category?:string
}

@Injectable()
export class HomeService {
	private pageSize:number = PAGE_SIZE;
	//公用的文章列表，防止重复请求
	public categoryArticleList:Array<any> = [];
    constructor(public request: RequestService, public globalService: GlobalService) {
		this.getHotWordList();
		this.getCategoryList();
    }
	
	//公共文章列表
    setArticleList(list: any){
		// this.articleList = this.articleList.concat(list);
    }

    //获取文章列表
    getArticleList(params: Params){
    	params.pageSize = this.pageSize;
		return this.request.get({url:'/article/getList', params});
    }

    //获取分类列表
	async getCategoryList(){
		// let res:any = await this.request.get({url:'/category/getList', params:{}});
		console.log(category);
		let categoryList:Array<any> = category.data;
		categoryList.unshift({name:'全部', _id:1, value:'all'})
		categoryList.map(item=>{
			let _item:any = {};
			//后台返回的分类都是有name的，否则就是自定义的分类了
			!item.name ? (_item.category = '全部') : (_item.category = item.name);
			_item.name = item.name;
			_item.pageIndex = 1;
			_item.total = PAGE_SIZE+1;
			_item.isRefreshing = true;
			_item.isMoring = false;
			_item.articleList = []
			this.categoryArticleList.push(_item)
		});
		let res:any = await this.getArticleList({pageIndex:1});
		this.categoryArticleList[0].articleList = res.data;
		this.globalService.setCategoryList(categoryList);
	}

	//获取标签列表
	getTagList(){
		return this.request.get({url:'/tag/getList', params:{}});
	}

	//获取最热文章列表
	getHotList(){
		return this.request.get({url:'/article/getList', params:{type:1, pageIndex:1, pageSize:4}});
	}

	//获取评论里列表
	getLatestComent(){
		return this.request.get({url:'/comment/getList', params:{pageIndex:1, pageSize:4}});
	}

	//获取阅读量倒序文章列表
	getReadNumAritlce(){
		return this.request.get({url:'/article/getList', params:{type:2, pageIndex:1, pageSize:4}});
	}

	//获取编辑时间倒序文章列表
	getLatestAritlce(){
		return this.request.get({url:'/article/getList', params:{type:3, pageIndex:1, pageSize:4}});
	}

	//获取热词列表
	getHotWordList(){
		this.request.get({url:'/hot/getList', params:{type:2, pageIndex:1, pageSize:4}}).then((res: any)=>{
			this.globalService.setHotWordList(res.data);
		});
	}
}
