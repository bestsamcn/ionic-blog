import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { MessagePage } from '../message/message';

@Component({
	templateUrl: 'tabs.html'
})
export class TabsPage {

	tab1Root = HomePage;
	tab2Root = AboutPage;
	tab3Root = MessagePage;

	constructor() {

	}
}