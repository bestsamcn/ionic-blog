import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ArticleComponent } from '../../components/article/article';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	public articleComponent:any = ArticleComponent;
	constructor(public navCtrl: NavController) {
			
	}
}
