import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { POSTER_URL } from '../../config';

@Component({
  selector: 'article',
  templateUrl: 'article.html'
})
export class ArticleComponent implements OnInit {
	@Input() articleList:Array<Object>;
	@Input() isMore?:boolean = false;
	@Input() isShowMore?:boolean = true;
	@Output() onMoreClick = new EventEmitter();
	POSTER_URL = POSTER_URL;
	constructor() {
		
	}
	
	//路由跳转
	navigate(id){
		this.router.navigate([`/article/detail/${id}`])
	}
	ngOnInit() {
	}

}
