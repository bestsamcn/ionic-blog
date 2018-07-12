import { Component, ViewEncapsulation } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { GlobalService } from '../../../providers/global';
import { ArticleService } from '../../../providers/article';
import { FACE_URL } from '../../../config/index';
import $$ from '../../../utils/index';

@Component({
	selector: 'page-article-comment',
	templateUrl: 'comment.html',
	encapsulation:ViewEncapsulation.None
})
export class CommentPage {
    
	name='';
    email='';
    content='';
    parentComment='';
    isSaveInfo=false;
    pageIndex=1;
    pageSize=5;
    total=6;
    commentList=[];
    reply=null;
    isMore=true;
    replyOffsetWidth=0;
    backSpaceTimes=0;
    shouldShowFace=false;
    textFocusStart=0;
    textFocusEnd=0;
    preText='';
    nexText='';
    isPressingCtrl=false;
    article: string;
	constructor(
		public articleService: ArticleService, 
		public globalService: GlobalService, 
		public navParams: NavParams
	){
		let id:string = navParams.get('id');
		this.article = id;
	}
	
	//获取评论列表
	getList(isRefresh){
        if(!this.isMore && !isRefresh) return;
        if(isRefresh) this.pageIndex = 1;
        var obj = {
            pageIndex:this.pageIndex,
            pageSize:this.pageSize,
            id:this.article
        }
        return new Promise(async resolve=>{
            let res: any = await this.articleService.getCommentList(obj);
            this.total = res.total;
            isRefresh ? (this.commentList = res.data) : (this.commentList = this.commentList.concat(res.data));
            if(this.pageIndex * this.pageSize >= res.total){
                this.isMore = false;
                return;
            }
            this.pageIndex++;
            this.isMore = true;
            return resolve();
        });
        
    }
	
	//过滤html
    filterHtml(str){
        return str.replace(/<(?!img)[^>]*>/,"");
    }

    //添加评论
    async addComment($event?){
        if($event.keyCode !== 13) return;
    	if(!this.name){
            this.globalService.setToast('请先填写用户名');
            return;
        }
        if(!this.email){
            this.globalService.setToast('请先填写邮箱');
            return;
        }
        if(!this.content.replace(/^\s+|\s+$/,'')){
            this.globalService.setToast('填写内容');
            this.content = '';
            return;
        }
        let reg: any = /(<|\$lt)fa(>|\$gt)([\d]*)(\1\/fa\2)/gi;
        let __content: string = this.content.replace(reg, function($1, $2, $3, $4){ return $1 = '<img src="'+FACE_URL+'/'+$4+'.png">' })
        let obj = {
            article:this.article,
            name:this.name,
            email:this.email,
            content:__content,
            parentComment:this.parentComment
        }
        if(!!this.reply){
            obj.parentComment = this.reply._id;
        }
        let res: any = await this.articleService.addComment(obj);
        this.isSaveInfo && this.saveInfo(this);
        this.content = '';
        this.parentComment = '';
        this.reply = null;
        // res.data.content =res.data.content.replace('/$gt/g','>').replace(/$lt/g,'<');
        this.commentList.unshift(res.data);
        this.replyOffsetWidth = 0;
    }
	
	//保存信息
	saveInfo(_this){
        if(!_this.name){
            _this.articleService.setToast('请先填写用户名');
            return;
        }
        if(!_this.email){
            _this.articleService.setToast('请先填写邮箱');
            return;
        }
        window.localStorage['__postName__'] = _this.name;
        window.localStorage['__email__'] = _this.email;
        window.localStorage['__isSaveInfo__'] = true;
        _this.isSaveInfo = true;
    }

    //回复事件
    replyClick(item){
        // this.content = '@'+item.createLog.createName+': ';
        this.reply = item;
        setTimeout(()=>{
            let replyName: any = document.getElementById('reply-name');
            let messageContent: any = document.getElementById('message-content');
            this.replyOffsetWidth = replyName.offsetWidth-10;
            messageContent && messageContent.blur();
            messageContent && messageContent.focus();
        });
    }
	
	//点赞
    async setCommentLike(isLike, item){
        if(!!$$.getCookie(item._id+'__setLikeComment__')){
            return this.globalService.setToast('你已投票，明天再来吧');
        };
        var obj = {
            id:item._id,
            isLike:isLike
        }
        this.articleService.setCommentLike(obj);
        !isLike && (item.likeNum --);
        !!isLike && (item.likeNum ++);
        $$.setCookie(item._id+'__setLikeComment__', true, 1);
    }

	//回车事件大于等于3次就删除回复对象
    backSpace($event){
        if($event.keyCode !== 8) return;
        if(this.content.replace(/^\s+|\s+$/,'').length == 0){
            this.backSpaceTimes++;
        }else{
            this.backSpaceTimes = 0;
        }
        if(this.backSpaceTimes >=3){
            this.reply = null;
            this.backSpaceTimes = 0;
            this.replyOffsetWidth = 0;
        }
    }

	//文本定位方便插入表情
    getTextFocus(e){
        let el: any = e.target;
        this.textFocusStart = el.selectionStart;
        this.textFocusEnd = el.selectionEnd;
        this.preText = this.content.substring(0, this.textFocusStart);
        this.nexText = this.content.substring(this.textFocusEnd);
    }

	//弹性显示表情盒子
    showFace(){
        this.shouldShowFace = !this.shouldShowFace;
    }

	//点击添加表情
    onFaceClick(item){
        let faceText: string = `<fa>${item}</fa>`;
        this.content = this.preText+faceText+this.nexText;
        this.preText = this.preText+faceText;
        if(this.isPressingCtrl) return;
        this.shouldShowFace = false;
    }

    handleCtrl(flag){
        //vue2 keyup.ctrl没有触发，蛋疼多选表情砍了吧。
        this.isPressingCtrl = flag;
    }

    //刷新
    async onRefreshCall(evt){
        await this.getList(true);
        evt.complete();
    }
    
    //加载
    async onLoadMoreCall(evt){
        await this.getList(false);
        evt.complete();
    }
    
	ionViewDidLoad() {
		this.name = window.localStorage['__postName__'] || '';
        this.email = window.localStorage['__email__'] || '';
        this.isSaveInfo = window.localStorage['__isSaveInfo__'] || false;
		this.getList(true);
	}

}