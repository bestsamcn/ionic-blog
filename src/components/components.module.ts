import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { HeaderComponent } from './header/header';
import { FaComponent } from './fa/fa';


//布局模块
@NgModule({
	declarations: [
		HeaderComponent,
		FaComponent
    ],
	imports: [
		IonicModule.forRoot(HeaderComponent)
	],
	exports: [
		HeaderComponent,
		FaComponent
    ]
})
export class ComponentsModule {}
