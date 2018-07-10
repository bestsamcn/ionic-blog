import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { SearchPage } from '../../pages/search/search'

@Component({
	selector: 'header',
	templateUrl: 'header.html',
	providers:[StatusBar]
})
export class HeaderComponent {
	text: string;
	@Input() title:string;
	constructor(public navController:NavController) {
		this.text = 'Hello World';
	}

	goPage(){
		this.navController.push(SearchPage)
	}



}