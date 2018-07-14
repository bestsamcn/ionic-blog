import { Component, ViewEncapsulation } from '@angular/core';
import { NavParams, ModalController } from 'ionic-angular';
import { GlobalService } from '../../../providers/global';
import { ArticleService } from '../../../providers/article';
import $$ from '../../../utils/index';
import { CommentComponent } from '../../../components/comment/comment';

@Component({
	selector: 'page-article-comment',
	templateUrl: 'comment.html',
	encapsulation:ViewEncapsulation.None
})
export class CommentPage {
    pageIndex=1;
    pageSize=5;
    total=6;
    commentList=[];
    isMore=true;
    article: string;
	constructor(
		public articleService: ArticleService, 
		public globalService: GlobalService, 
		public navParams: NavParams,
        public modalController: ModalController
	){
		let id:string = navParams.get('id');
		this.article = id;
	}
	
	//获取评论列表
	getList(isRefresh){
        if(!this.isMore && !isRefresh) return;
        if(isRefresh) this.pageIndex = 1;
        var obj = {
            pageIndex:this.pageIndex,
            pageSize:this.pageSize,
            id:this.article
        }
        return new Promise(async resolve=>{
            let res: any = await this.articleService.getCommentList(obj);
            this.total = res.total;
            isRefresh ? (this.commentList = res.data) : (this.commentList = this.commentList.concat(res.data));
            if(this.pageIndex * this.pageSize >= res.total){
                this.isMore = false;
                return resolve();
            }
            this.pageIndex++;
            this.isMore = true;
            return resolve();
        });
        
    }
	
	//过滤html
    filterHtml(str){
        return str.replace(/<(?!img)[^>]*>/,"");
    }

    
    //回复事件
    replyClick(item:any){
        let modal = this.modalController.create(CommentComponent, { reply: item, article:this.article, onReplySuccess:this.onReplySuccess.bind(this)});
        modal.present();
    }

    //回复成功后新增数据
    onReplySuccess(item){
        this.commentList.unshift(item);
    }
	
	//点赞
    async setCommentLike(isLike, item){
        if(!!$$.getCookie(item._id+'__setLikeComment__')){
            return this.globalService.setToast('你已投票，明天再来吧');
        };
        var obj = {
            id:item._id,
            isLike:isLike
        }
        this.articleService.setCommentLike(obj);
        !isLike && (item.likeNum --);
        !!isLike && (item.likeNum ++);
        $$.setCookie(item._id+'__setLikeComment__', true, 1);
    }

    //刷新
    async onRefreshCall(evt){
        await this.getList(true);
        evt.complete();
    }
    
    //加载
    async onLoadMoreCall(evt){
        await this.getList(false);
        evt.complete();
    }
    
	ionViewDidLoad() {
		this.getList(true);
	}

}