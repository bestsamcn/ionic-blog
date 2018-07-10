import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { HomePage } from './home';

import { ComponentsModule } from '../../components/components.module';

import { StatusBar } from '@ionic-native/status-bar';


//布局模块
@NgModule({
	declarations: [
		HomePage
    ],
	imports: [
		IonicModule,
		ComponentsModule,
	],
	entryComponents:[
		HomePage
	],
	exports: [
		HomePage
    ],
    providers:[
		StatusBar
    ]
})
export class HomeModule {}