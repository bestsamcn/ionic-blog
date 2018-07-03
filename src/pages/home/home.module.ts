import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { HomePage } from './home';

import { ComponentsModule } from '../../components/components.module';
import { SuperTabsModule, SuperTabsController } from 'ionic2-super-tabs';

import { StatusBar } from '@ionic-native/status-bar';


//布局模块
@NgModule({
	declarations: [
		HomePage
    ],
	imports: [
		IonicModule,
		ComponentsModule, 
		SuperTabsModule
	],
	entryComponents:[
		HomePage
	],
	exports: [
		HomePage
    ],
    providers:[
		StatusBar,
		SuperTabsController
    ]
})
export class HomeModule {}