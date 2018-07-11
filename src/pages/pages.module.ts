import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { AboutPage } from './about/about';
import { MessagePage } from './message/message';
import { TabsPage } from './tabs/tabs';

import { HomeModule } from './home/home.module';
import { ArticlePageModule } from './article/article.module';
import { SearchPageModule } from './search/search.module';
import { ComponentsModule } from '../components/components.module';

import { StatusBar } from '@ionic-native/status-bar';


//布局模块
@NgModule({
	declarations: [
		AboutPage,
		MessagePage,
		TabsPage
    ],
	imports: [
		IonicModule,
		HomeModule,
		ComponentsModule, 
		SearchPageModule,
		ArticlePageModule
	],
	entryComponents:[
		TabsPage,
		AboutPage,
		MessagePage
	],
	exports: [
		AboutPage,
		MessagePage,
		TabsPage
    ],
    providers:[
		StatusBar
    ]
})
export class PagesModule {}