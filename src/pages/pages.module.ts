import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { AboutPage } from './about/about';
import { HomePage } from './home/home';
import { MessagePage } from './message/message';
import { TabsPage } from './tabs/tabs';

import { ComponentsModule } from '../components/components.module';


import { StatusBar } from '@ionic-native/status-bar';


//布局模块
@NgModule({
	declarations: [
		HomePage,
		AboutPage,
		MessagePage,
		TabsPage
    ],
	imports: [
		IonicModule,
		ComponentsModule
	],
	entryComponents:[
		TabsPage,
		HomePage,
		AboutPage,
		MessagePage
	],
	exports: [
		HomePage,
		AboutPage,
		MessagePage,
		TabsPage
    ],
    providers:[
		StatusBar
    ]
})
export class PagesModule {}