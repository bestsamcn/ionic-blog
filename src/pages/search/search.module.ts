import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module';
import { SearchPage } from './search';
import { SearchResultPage } from './result/result';
import { SearchService } from '../../providers/search'

@NgModule({
	declarations: [
		SearchPage,
		SearchResultPage
	],
	imports: [
		IonicPageModule.forChild(SearchPage),
		ComponentsModule,
	],
	entryComponents:[
		SearchPage,
		SearchResultPage
	],
	exports:[
		SearchPage
	],
	providers:[
		SearchService
	]
})
export class SearchPageModule {}