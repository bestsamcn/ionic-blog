import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';


@Component({
	selector: 'page-message',
	templateUrl: 'message.html',
})
export class MessagePage {

	constructor(public navCtrl: NavController, public navParams: NavParams) {}

	ionViewDidLoad() {
		console.log('ionViewDidLoad MessagePage');
	}

}