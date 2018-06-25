import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomeService } from '../../providers/home';
import { ArticleComponent } from '../../components/article/article';

@Component({
  	selector: 'page-home',
  	templateUrl: 'home.html',
  	providers:[HomeService]
})
export class HomePage {
	public articleComponent:any = ArticleComponent;
	constructor(public navCtrl: NavController, public homeService: HomeService) {
			
	}
}
