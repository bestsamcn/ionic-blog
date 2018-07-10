import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SearchService } from '../../providers/search';


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

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad SearchPage');
  	}

}
