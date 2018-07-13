import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Searchbar } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
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
		public globalService: GlobalService, 
		public keybord:Keyboard
	){}

	//跳转结果页
	goResultPage(keyword){
		if(!keyword) return this.globalService.setToast('请输入关键字');
	  	this.searchService.getArticleList({isRefresh:true, keyword});
	  	this.keybord.close();
	  	this.navCtrl.push(SearchResultPage);
	  	
	}
}
