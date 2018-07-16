import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { SearchService } from '../../../providers/search';


@Component({
    selector: 'page-search-result',
    templateUrl: 'result.html'
})
export class SearchResultPage {
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public searchService: SearchService,
        public keybord:Keyboard
    ){}

    //获取结果
    async getAritlceList(evt: any, isRefresh: boolean) {
        try {
            await this.searchService.getArticleList({isRefresh});
            evt.complete();
        } catch (e) {
            evt.complete();
        }
    }
    

    //搜索
    async onSearch(){
        this.keybord.close();
        await this.searchService.getArticleList({isRefresh:true});
    }

    //输入
    onKeywordChange(evt: any) {
        this.searchService.keyword = evt.value;
        this.searchService.setKeyword(evt.value);
    }

    ionViewDidEnter(){
        localStorage.isFromResultPage = true;
    }
}
