import { Component, ViewChild, OnInit } from '@angular/core';
import { Slides } from 'ionic-angular';
import { GlobalService } from '../../providers/global';
import IScroll from '../../assets/libs/iscroll';

@Component({
  	selector: 'tabs',
  	templateUrl: 'tabs.html'
})
export class TabsComponent implements OnInit{
	@ViewChild('slidesContent') slidesContent:Slides;
	@ViewChild('toolbar') toolbar:IScroll;
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
    ionViewDidLoad(){
    }
    ngOnInit(){
    }
}
