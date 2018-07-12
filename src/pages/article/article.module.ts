import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArticlePage } from './article';
import { CommentPage } from './comment/comment';
import { ArticleService } from '../../providers/article';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
	declarations: [
		ArticlePage,
		CommentPage,
	],
	imports: [
		IonicPageModule.forChild(ArticlePage),
		ComponentsModule,
		PipesModule
	],
	entryComponents:[
		ArticlePage,
		CommentPage
	],
	providers:[
		ArticleService
	]
})
export class ArticlePageModule {}
