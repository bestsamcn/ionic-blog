import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module';
import { SearchPage } from './search';
import { SearchService } from '../../providers/search'

@NgModule({
	declarations: [
		SearchPage,
	],
	imports: [
		IonicPageModule.forChild(SearchPage),
		ComponentsModule
	],
	entryComponents:[
		SearchPage
	],
	exports:[
		SearchPage
	],
	providers:[
		SearchService
	]
})
export class SearchPageModule {}