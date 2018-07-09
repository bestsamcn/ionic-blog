import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

@Component({
	selector: 'header',
	templateUrl: 'header.html',
	providers:[StatusBar]
})
export class HeaderComponent {
	text: string;
	@Input() title:string;
	constructor(public NavController:NavController) {
		this.text = 'Hello World';
	}

}