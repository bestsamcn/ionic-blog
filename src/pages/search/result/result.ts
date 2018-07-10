import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SearchService } from '../../../providers/search';


@IonicPage()
@Component({
  selector: 'page-search-result',
  templateUrl: 'result.html',
})
export class SearchResultPage {
  	constructor(
  		public navCtrl: NavController, 
  		public navParams: NavParams,
  		public searchService: SearchService
  	) {
  		console.log(this.searchService.keyword, 'ddddddddddd')
  	}

    async getAritlceList(evt:any, isRefresh:boolean){
      try{
        await this.searchService.getArticleList({isRefresh});
        evt.complete();
      }catch(e){
        evt.complete();
      }
    }

    //输入
    onKeywordChange(evt:any){
      this.searchService.keyword = evt.data;
    }
  	ionViewDidLoad() {
  	}

}
