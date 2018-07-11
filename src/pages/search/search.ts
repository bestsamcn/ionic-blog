import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Searchbar } from 'ionic-angular';

import { SearchService } from '../../providers/search';
import { GlobalService } from '../../providers/global';
import { SearchResultPage } from './result/result'; 


@IonicPage()
@Component({
  	selector: 'page-search',
  	templateUrl: 'search.html',
})
export class SearchPage {
	@ViewChild('searchbar') searchbar:Searchbar;
	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public searchService: SearchService,
		public globalService: GlobalService
	){
	}

	//跳转结果页
	async goResultPage(keyword){
	  	await this.searchService.getArticleList({isRefresh:true, keyword});
	  	this.navCtrl.push(SearchResultPage);
	}
}
