import { Injectable } from '@angular/core';
import { RequestService } from './request';
import { PAGE_SIZE } from '../config/index';

interface Params{
    pageIndex?:number,
    isRefresh:boolean,
    pageSize?:number, 
    keyword?:string
}

@Injectable()
export class SearchService {
	public hotWordList:Array<object> = [];
    public keyword:string = '';
    public articleList:Array<object> = [];
    public total:number = PAGE_SIZE+1;
    public pageSize:number = PAGE_SIZE;
    public pageIndex:number = 1;
    public isRefreshing:boolean = true;
    public isMoring:boolean = false;
    public isMore:boolean = true
    constructor(public requestService: RequestService) {
        this.getHotWordList();
    }


    //留言提交
    async getHotWordList(){
    	try{
    		let res:any = await this.requestService.get({url:'/hot/getList', params:{}});
    		this.hotWordList = res.data;
    	}catch(e){
    		console.log('SearchService getHotWordList error')
    	}
    }

    //设置关键字
    setKeyword(keyword:string){
        this.keyword = keyword;
    }

    //获取文章列表
    getArticleList(params: Params){
        let { isRefresh, keyword } = params;
        this.keyword = keyword;
        return new Promise(async (resolve, reject)=>{
            let { pageIndex, pageSize } = this;
            let _pageIndex = pageIndex;
            try{
                
                if(!!isRefresh) pageIndex = 1;
                if(!isRefresh) pageIndex = pageIndex + 1;
                this.isMoring = !isRefresh;
                this.isRefreshing = !!isRefresh;
                let res:any = await this.requestService.get({url:'/article/getList', params:{pageIndex, pageSize, keyword}});
                this.isMoring = false;
                this.isRefreshing = false;


                this.pageIndex = pageIndex;
                this.total = res.total;
                if(pageIndex * pageSize >= res.total){
                    this.isMore = false;
                }else{
                    this.isMore = true;
                }
                if(!!isRefresh) this.articleList = res.data;
                if(!isRefresh) this.articleList = this.articleList.concat(res.data);

                return resolve();
            }catch(e){
                this.pageIndex = _pageIndex;
                this.isMoring = false;
                this.isRefreshing = false;
                return reject();
            }
        });
    }
}