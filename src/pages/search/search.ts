import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SearchService } from '../../providers/search';
import { SearchResultPage } from './result/result'; 


@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  	constructor(
  		public navCtrl: NavController, 
  		public navParams: NavParams,
  		public searchService: SearchService
  	) {
  		console.log(this.searchService, 'ddddddddddd')
  	}

    //跳转结果页
    goResultPage(keyword){
      console.log(keyword, 'dddddddd')
      this.searchService.getArticleList({isRefresh:true, keyword});
      this.navCtrl.push(SearchResultPage);
    }

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad SearchPage');
  	}

}
