import { Injectable } from '@angular/core';
import { RequestService } from './request';
import $$ from '../utils';

@Injectable()
export class MessageService {
    constructor(public requestService: RequestService) {
    }


    //留言提交
    postMessage(params:any){
    	return this.requestService.post({url:'/message/add', params})	
    }
    
}