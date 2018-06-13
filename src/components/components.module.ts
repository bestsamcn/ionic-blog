import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { HeaderComponent } from './header/header';
import { FaComponent } from './fa/fa';
import { ArticleComponent } from './article/article';
import { PipesModule } from '../pipes/pipes.module';


//布局模块
@NgModule({
	declarations: [
		HeaderComponent,
		FaComponent,
    	ArticleComponent
    ],
	imports: [
		IonicModule.forRoot(HeaderComponent),
		PipesModule
	],
	exports: [
		HeaderComponent,
		FaComponent,
    	ArticleComponent
    ]
})
export class ComponentsModule {}
