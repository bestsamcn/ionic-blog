import { Injectable } from '@angular/core';
import { RequestService } from './request';
import { GlobalService } from './global';



@Injectable()
export class ArticleService {
    constructor(
        public requestService: RequestService,
        public globalService: GlobalService
    ) {}

    //获取文章详情
    getArticleDetail(id: string) {
        return new Promise(async (resolve, reject) => {
            try {
                let res: any = await this.requestService.get({url: '/article/getDetail', params: {id, type:1}});
                return resolve(res.data);
            } catch (e) {
                console.log('ArticleService getArticleDetail error')
                return reject();
            }
        });
    }
}