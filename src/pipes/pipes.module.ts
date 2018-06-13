import { NgModule } from '@angular/core';
import { DateFormatPipe, DateDescPipe, TransNumPipe, TextEllipsisPipe } from './pipe/pipe';

//管道
@NgModule({
	declarations: [
		DateFormatPipe, 
		DateDescPipe, 
		TransNumPipe, 
		TextEllipsisPipe
	],
	imports: [],
	exports: [
		DateFormatPipe, 
		DateDescPipe, 
		TransNumPipe, 
		TextEllipsisPipe
	]
})
export class PipesModule {}
