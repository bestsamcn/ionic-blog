import { Component, Input, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Content } from 'ionic-angular';
import { BACK_TOP_THRESHOLD } from '../../config/index';

@Component({
  selector: 'top',
  templateUrl: 'top.html'
})
export class TopComponent implements OnInit{
	@ViewChild('top') top:ElementRef;
	BACK_TOP_THRESHOLD=BACK_TOP_THRESHOLD;
	@Input() content:Content;
  	constructor(){}

  	//页面滚动
  	scroll(){
  		this.content.ionScroll.subscribe(e=>{
  			if(e.scrollTop >= this.BACK_TOP_THRESHOLD){
  				this.top.nativeElement.className = 'go-top-btn show';
  			}else{
  				this.top.nativeElement.className = 'go-top-btn';
  			}
  		})
  	}

  	//返回顶部
  	scrollToTop(){
  		this.content.scrollToTop(300);
  	}

  	ngOnInit(){
  		this.scroll();
  	}
}
