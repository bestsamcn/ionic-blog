import { Injectable } from '@angular/core';
import { RequestService } from './request';
import { GlobalService } from './global';


@Injectable()
export class InitialService {
  	constructor(
  		public requestService: RequestService, 
  		public globalService: GlobalService
  	){}

  	//获取热词
    async getHotWordList(){
    	try{
    		let res:any = await this.requestService.get({url:'/hot/getList', params:{}});
    		this.globalService.setState({hotWordList:res.data});
    	}catch(e){
    		console.log('InitialService getHotWordList error')
    	}
    }
}
