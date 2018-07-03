import { Component, ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { GlobalService } from '../../providers/global';


@Component({
  	selector: 'tabs',
  	templateUrl: 'tabs.html'
})
export class TabsComponent {
	@ViewChild('slidesContent') slidesContent:Slides;
	@ViewChild('toolbar') toolbar:any;
	public slideIndex:number;
  	constructor(public globalService: GlobalService) {
    	console.log(globalService);
  	}
  	onSlideDrag(e){
  		console.log(this.toolbar.nativeElement)
  	}
  	onSlideChanged(e){
  		console.log(this.slidesContent.getActiveIndex())
  		
  	}
}
