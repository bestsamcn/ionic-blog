import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../../components/components.module';
import { SearchResultPage } from './result';
import { SearchService } from '../../../providers/search'

@NgModule({
	declarations: [
		SearchResultPage,
	],
	imports: [
		IonicPageModule.forChild(SearchResultPage),
		ComponentsModule
	],
	entryComponents:[
		SearchResultPage
	],
	exports:[
		SearchResultPage
	],
	providers:[
		SearchService
	]
})
export class SearchResultPageModule {}