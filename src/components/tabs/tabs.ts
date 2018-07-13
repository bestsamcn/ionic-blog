import { Component, ViewChild, AfterViewInit, DoCheck } from '@angular/core';
import { Slides } from 'ionic-angular';
import { GlobalService } from '../../providers/global';
import { HomeService } from '../../providers/home';

declare let IScroll: any;

let clientWidth: number = document.documentElement.clientWidth;
@Component({
    selector: 'tabs',
    templateUrl: 'tabs.html'
})
export class TabsComponent implements AfterViewInit, DoCheck {
    iscroll: any;
    categoryLength: any;
    maxIndex: any;
    maxLeft: any;
    canPullDown: boolean = true;
    @ViewChild('slidesContent') slidesContent: Slides;
    public slideIndex: number;
    constructor(public globalService: GlobalService, public homeService: HomeService) {
        console.log(homeService, 'ffffffffffff')
    }

    //滑动完毕
    onSlideChanged(e) {
        let disX: number = 720 - (Math.abs(this.iscroll.x) + clientWidth);

        let index: number = this.slidesContent.getActiveIndex();
        if (index > this.globalService.categoryList.length - 1) {
            index = this.globalService.categoryList.length - 1
        }
        if (index < 0) index = 0;
        this.slideIndex = index;

        if(!this.homeService.categoryArticleList[index].articleList.length){
           this.homeService.getArticleList({isRefreshing:true, currentCategoryIndex:this.slideIndex});
        }

        if (index == 0) return;

        //首次溢出
        if (disX < 80 && !this.maxIndex) {
            this.maxIndex = index - 1;
            this.maxLeft = -this.maxIndex * 80 + 80 - disX;
            this.iscroll.scrollTo(this.maxLeft, 0, 300);
            return;
        }

        if (!!this.maxIndex && this.maxIndex <= index) {
            this.iscroll.scrollTo(this.maxLeft, 0, 300);
            return;
        }

        this.iscroll.scrollTo(-index * 80 + 80, 0, 300)
    }

    //页签点击
    onTabClick(index) {
        this.slidesContent.slideTo(index, 0);
    }

    //更新
    ngDoCheck() {
        if (this.globalService.categoryList.length != this.categoryLength) {
            this.categoryLength = this.globalService.categoryList.length;
            this.iscroll = new IScroll('#scroll', {
                scrollX: true,
                scrollY: false
            });
        }
    }

    //获取数据
    async getAritlceList(evt:any, isRefreshing:boolean, currentCategoryIndex:number){
        try{
            await this.homeService.getArticleList({isRefreshing, currentCategoryIndex});
            evt.complete();
        }catch(err){
            console.log(err, 'getAritlceList error')
            evt.complete();
        }
    }
    

    //将要滑动
    onSlideDrag(){
        this.canPullDown = false;
    }

    //初始化
    ngAfterViewInit() {

        this.iscroll = new IScroll('#scroll', {
            scrollX: true,
            scrollY: false
        });
        document.addEventListener('touchmove', function(e) {
            e.preventDefault();
        }, false);
        setTimeout(()=>{
            this.slidesContent._wrapper.addEventListener('touchend', e=>{
                this.canPullDown = true;
            });
        }, 500)
       
    }
}