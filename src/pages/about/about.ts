import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MessagePage } from '../message/message';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
	page1 = MessagePage;
	page2 = MessagePage;
	page3 = MessagePage;
  constructor(public navCtrl: NavController) {

  }

}
