import { Component, ViewChild, AfterViewInit, DoCheck } from '@angular/core';
import { Slides } from 'ionic-angular';
import { GlobalService } from '../../providers/global';
import { HomeService } from '../../providers/home';

declare let IScroll: any;

@Component({
    selector: 'tabs',
    templateUrl: 'tabs.html'
})
export class TabsComponent implements AfterViewInit, DoCheck {
    iscroll: any;
    categoryLength: any;
    maxIndex: any;
    maxLeft: any;
    disX:number;

    canPullDown: boolean = true;
    @ViewChild('slidesContent') slidesContent: Slides;
    public slideIndex: number;
    constructor(public globalService: GlobalService, public homeService: HomeService) {
    }

    //滑动完毕
    onSlideChanged() {
        
        //获取当前索引
        let index: number = this.slidesContent.getActiveIndex();
        
        //如果索引大于分类长度-1
        if (index > this.globalService.categoryList.length - 1) {
            index = this.globalService.categoryList.length - 1
        }

        //如果索引小于0
        if (index < 0) index = 0;

        //实际使用的索引
        this.slideIndex = index;

        //如果当前索引下没有文章数据，则请求
        if(!this.homeService.categoryArticleList[index].articleList.length){
            this.homeService.getArticleList({isRefreshing:true, currentCategoryIndex:this.slideIndex});
        }
        
        //如果当前索引为空，则不滑动
        if (index == 0) return;
        

        let scrollX:number = -index * 80 + 80;
        if(-index * 80 + 80 < this.iscroll.maxScrollX){
            scrollX = this.iscroll.maxScrollX;
        }
        localStorage.scrollX = scrollX;
        this.iscroll.scrollTo(scrollX, 0, 300)
    }

    //页签点击
    onTabClick(index) {
        this.slidesContent.slideTo(index, 0);
    }

    //更新
    ngDoCheck() {
        if ( this.globalService.categoryList.length != this.categoryLength || (!this.iscroll || !this.iscroll.scrollerWidth)) {
            let _scrollerWidth = !!this.iscroll && this.iscroll.scrollerWidth || 0;;
            this.categoryLength = this.globalService.categoryList.length;

            //重置scroll，防止当this.iscroll.scrollerWidt=0的情况下，导致滑动失效的问题
            this.iscroll = new IScroll('#scroll', {
                scrollX: true,
                scrollY: false
            });

            //并滑动回上一次记录的位置
            !_scrollerWidth && this.iscroll.scrollTo(localStorage.scrollX, 0, 300);
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
        this.globalService.setToast('init iscroll')
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