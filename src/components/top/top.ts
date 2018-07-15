import { Component, Input, ElementRef, ViewChild, OnInit, OnChanges } from '@angular/core';
import { Content } from 'ionic-angular';
import { BACK_TOP_THRESHOLD } from '../../config/index';

@Component({
  selector: 'top',
  templateUrl: 'top.html'
})
export class TopComponent implements OnInit, OnChanges{
	@ViewChild('top') top:ElementRef;
	BACK_TOP_THRESHOLD=BACK_TOP_THRESHOLD;
  @Input() content:Content;

  //content引用永远相等，需要引入用基本类型的id做判断
	@Input() id:string;
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


    //id改变后重置
    ngOnChanges(){
      this.content.scrollToTop(0);
      this.top.nativeElement.className = 'go-top-btn';
    }

  	//返回顶部
  	scrollToTop(){
  		this.content.scrollToTop(300);
  	}

  	ngOnInit(){
  		this.scroll();
  	}
}
