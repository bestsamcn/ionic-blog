import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { HeaderComponent } from './header/header';
import { FaComponent } from './fa/fa';
import { ArticleComponent } from './article/article';
import { PipesModule } from '../pipes/pipes.module';
import { TabsComponent } from './tabs/tabs';

import { Scroll } from '../directives/directive';

//布局模块
@NgModule({
	declarations: [
		HeaderComponent,
		FaComponent,
    	ArticleComponent,
	    TabsComponent,
	    Scroll
    ],
	imports: [
		IonicModule.forRoot(HeaderComponent),
		PipesModule
	],
	exports: [
		HeaderComponent,
		FaComponent,
    	ArticleComponent,
    	TabsComponent
    ]
})
export class ComponentsModule {}
