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
                let res: any = await this.requestService.get({url: '/article/getDetail', params: {id, type:1}, isLoading:true});
                return resolve(res.data);
            } catch (e) {
                console.log('ArticleService getArticleDetail error')
                return reject();
            }
        });
    }

    //点赞文章
    setArticleLike(id: string){
        return this.requestService.post({url:'/article/like', params:{id}});
    }

    //获取文章评论列表
    getCommentList(params: {id: string, pageIndex: number, pageSize: number}){
        return this.requestService.get({url:'/comment/getList', params:params});
    }

    //添加文章评论
    addComment(params: {article: string, name: string, email: string, content: string, parentComment: string}){
        return this.requestService.post({url:'/comment/add', params:params, isLoading:true});
    }

    //点赞评论
    setCommentLike(params: {id: string, isLike: boolean}){
        return this.requestService.post({url:'/comment/like', params:params});
    }
}