import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { POSTER_URL, FACE_URL } from '../../config/index';
import { ArticleService } from '../../providers/article';
import $$ from '../../utils/index';
import { CommentPage } from './comment/comment';

interface Article{
	_id: string,
	title: string,
	previewText: string,
	tag: object,
	category: object,
	content: string,
	lastEditTime: number,
	poster: string,
	__v: number,
	pinYin: any,
	private: number,
	likeNum: number,
	commentNum: number,
	readNum: number,
	createTime: number
}

@IonicPage()
@Component({
	selector: 'page-article',
	templateUrl: 'article.html',
})
export class ArticlePage{
	@ViewChild('xcontent') xcontent:Content;
	@ViewChild('xothers') xothers:ElementRef;
	public POSTER_URL:string = POSTER_URL;
	public FACE_URL:string = FACE_URL;
	public article:Article;
	public prevID:string;
	public nextID:string;
	public isLiked:boolean;
	constructor(
		public navController: NavController,
		public navParams: NavParams,
		public articleService: ArticleService
	) {
		let id:string = navParams.get('id');
		this.getArticleDetail(id);
	}


	//获取文章详情
	async getArticleDetail(id:string){
		let res:any = await this.articleService.getArticleDetail(id);
		this.article = res.curr;
		!!$$.getCookie(res.curr._id) && (this.isLiked = true) || (this.isLiked = false);
		this.prevID = !!res.prev && res.prev._id || '';
		this.nextID = !!res.next && res.next._id || '';
	}

	//点赞
	async likeClick(){
		let id:string = !!this.article && this.article._id || '';
		if(!id || !!$$.getCookie(id)) return false;
		try{
			await this.articleService.setArticleLike(id);
			$$.setCookie(id)
			this.article.likeNum = this.article.likeNum + 1;
			this.isLiked = true;
		}catch(e){
			console.log(e, 'ArticlePage likeClick error');
		}
	}
	
	//评论跳转
	goCommentPage(){
		this.navController.push(CommentPage, {id: this.article._id});
	}
	
	//滚动结束
    onEnd(){
    	let oFooter:{nativeElement:{className:string}} = this.xothers;
    	oFooter.nativeElement.className = 'others';
    }

    //滚动开始
    onStart(){
    	let oFooter:{nativeElement:{className:string}} = this.xothers;
    	oFooter.nativeElement.className = 'others active';
    }
}