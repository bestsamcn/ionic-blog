import { Injectable } from '@angular/core';
import { RequestService } from './request';

@Injectable()
export class SearchService {
	public hotWordList = [];
    constructor(public requestService: RequestService) {
    }


    //留言提交
    async getHotWordList(){
    	try{
    		let res:any = this.requestService.post({url:'/hotword/getList', params:{}});
    		this.hotWordList = res.data;
    	}catch(e){
    		console.log('SearchService getHotWordList error')
    	}
    }
    
}