import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { POSTER_URL } from '../../config/index';
import { GlobalService } from '../../providers/global';
import { ArticlePage } from '../../pages/article/article';

@Component({
  selector: 'article',
  templateUrl: 'article.html'
})
export class ArticleComponent{
	_articleList:Array<object> = [];
	_isMore:boolean = true;
	_canPullDown:boolean = true;

	@Input() 
	get articleList():Array<object>{
		return this._articleList;
	}
	set articleList(value:Array<object>){
		this._articleList = value;
	}

	@Input()
	get isMore():boolean{
		return this._isMore;
	}
	set isMore(value:boolean){
		this._isMore = value;
	}

	@Input() 
	get canPullDown():boolean{
		return this._canPullDown;
	}
	set canPullDown(value:boolean){
		this._canPullDown = value;
	}

	@Input() index:number = 0;
	@Input() slideIndex:number = 0;e;
	@Input() isShowMore?:boolean = true;
	@Output() onLoadMore?:any = new EventEmitter();
	@Output() onRefresh?:any = new EventEmitter();
	POSTER_URL = POSTER_URL;
	constructor(
		public globalService: GlobalService,
		public navController: NavController,
		public navParams: NavParams,
		private nativePageTransitions: NativePageTransitions
	){
		
	}

	//下拉刷新
	onRefreshCall($event){
		!!this.onRefresh && this.onRefresh.emit($event);
	}

	//上拉加载
	onLoadMoreCall($event){
		!!this.onLoadMore && this.onLoadMore.emit($event);
	}
	
	//路由跳转
	goArticlePage(id:string){
		// let options: NativeTransitionOptions = {
		//     direction: 'left',
		//     duration: 500,
		//     slowdownfactor: 3,
		//     slidePixels: 20,
		//     iosdelay: 100,
		//     androiddelay: 150,
		//     fixedPixelsTop: 0,
		//     fixedPixelsBottom: 0
	 //   };
	 //   this.nativePageTransitions.slide(options)
	 //   .then(e=>console.log(e))
	 //   .catch(e=>console.log(e));
		this.navController.push(ArticlePage, {id:id});
	}
}
