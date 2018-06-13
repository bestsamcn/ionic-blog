import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { HeaderComponent } from './header/header';


//布局模块
@NgModule({
	declarations: [
		HeaderComponent
    ],
	imports: [
		IonicModule.forRoot(HeaderComponent)
	],
	exports: [
		HeaderComponent
    ]
})
export class ComponentsModule {}
