import { Component, ViewChild, OnInit, DoCheck } from '@angular/core';
import { Slides } from 'ionic-angular';
import { GlobalService } from '../../providers/global';

declare let IScroll:any;

let clientWidth:number = document.documentElement.clientWidth;
@Component({
  	selector: 'tabs',
  	templateUrl: 'tabs.html'
})
export class TabsComponent implements OnInit, DoCheck{
  iscroll:any;
  categoryLength:any;
	@ViewChild('slidesContent') slidesContent:Slides;
	public slideIndex:number;
	constructor(public globalService: GlobalService) {
  	console.log(globalService);
	}
	onSlideDrag(e){
	}
	onSlideChanged(e){
		let index:number = this.slidesContent.getActiveIndex();
    if(index > this.globalService.categoryList.length-1){
      index = this.globalService.categoryList.length-1
    }
    if(index < 0) index = 0;
    this.slideIndex = index;
    if(index == 0) return;
    let dis:any = clientWidth -(-index*80+80+this.globalService.categoryList.length*80);
    console.log(-index*80+80+this.globalService.categoryList.length*80, clientWidth, dis)
    if(-index*80+80+this.globalService.categoryList.length*80<clientWidth) return;

    this.iscroll.scrollTo(-index*80+80, 0, 300)
		
	}

  //页签点击
  onTabClick(index){
    this.slidesContent.slideTo(index, 300);
  }

  //更新
  ngDoCheck(){
    if(this.globalService.categoryList.length != this.categoryLength){
      this.categoryLength =this.globalService.categoryList.length;
      this.iscroll = new IScroll('#scroll', { scrollX: true, scrollY: false});
    }
  }

  //初始化
  ngOnInit(){
    this.iscroll = new IScroll('#scroll', { scrollX: true, scrollY: false });
    this.iscroll.onScrollEnd = console.log(this, 'end');
    document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
  }
}
