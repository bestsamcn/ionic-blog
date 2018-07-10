import { Injectable } from '@angular/core';
import { RequestService } from './request';

@Injectable()
export class SearchService {
	public hotWordList:Array<object> = [];
    constructor(public requestService: RequestService) {
        this.getHotWordList();
    }


    //留言提交
    async getHotWordList(){
    	try{
    		let res:any = await this.requestService.get({url:'/hot/getList', params:{}});
            console.log(res.data, 'ffffffffffffff')
    		this.hotWordList = res.data;
    	}catch(e){
    		console.log('SearchService getHotWordList error')
    	}
    }
    
}