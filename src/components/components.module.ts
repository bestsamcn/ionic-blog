import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { HeaderComponent } from './header/header';
import { FaComponent } from './fa/fa';
import { ArticleComponent } from './article/article';
import { PipesModule } from '../pipes/pipes.module';
import { Clocky } from '../directives/index';
import { TabsComponent } from './tabs/tabs';

import { ClockComponent } from './clock/clock';
import { CommentComponent } from './comment/comment';
import { EmojiComponent } from './emoji/emoji';

//布局模块
@NgModule({
	declarations: [
		Clocky,
		HeaderComponent,
		FaComponent,
    	ArticleComponent,
	    TabsComponent,
    	ClockComponent,
    	CommentComponent,
    	EmojiComponent
    ],
    entryComponents:[
		CommentComponent
    ],
	imports: [
		IonicModule.forRoot(HeaderComponent),
		PipesModule
	],
	exports: [
		HeaderComponent,
		FaComponent,
    	ArticleComponent,
    	TabsComponent,
    	ClockComponent,
    	CommentComponent,
    	EmojiComponent
    ]
})
export class ComponentsModule {}
