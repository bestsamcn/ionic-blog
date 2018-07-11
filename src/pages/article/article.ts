import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { POSTER_URL, FACE_URL } from '../../config/index';
import { ArticleService } from '../../providers/article';

@IonicPage()
@Component({
	selector: 'page-article',
	templateUrl: 'article.html',
})
export class ArticlePage {
	public POSTER_URL:string = POSTER_URL;
	public FACE_URL:string = FACE_URL;
	public article:object;
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
		this.prevID = !!res.prev && res.prev._id || '';
		this.nextID = !!res.next && res.next._id || '';
	}

	//点赞
	likeClick(){

	}

	goBack(){
		this.navController.pop();
	}

	ionViewDidLoad() {

	}

}