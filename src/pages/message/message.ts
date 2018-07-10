import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { MessageService } from '../../providers/message';


@Component({
	selector: 'page-message',
	templateUrl: 'message.html',
	providers:[MessageService]
})
export class MessagePage {
	public form:object = {name:'', email:'', content:''};
	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public messageService:MessageService
	){}

	//提交
	async postMessage(){
		let res = /^\s+|\s+$/gi
		for(let key in this.form){
			this.form[key] = this.form[key].replace(res, '');
			if(!this.form[key]) return false;
		}
		await this.messageService.postMessage(this.form);
		this.form = {name:'', email:'', content:''};
	}

}