import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

@Component({
	selector: 'header',
	templateUrl: 'header.html',
	providers:[StatusBar]
})
export class HeaderComponent {
	text: string;
	constructor(public NavController:NavController) {
		console.log('Hello HeaderComponent Component');
		this.text = 'Hello World';
	}

}