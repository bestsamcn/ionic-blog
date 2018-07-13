import { Component } from '@angular/core';
import { NavParams, ViewController  } from 'ionic-angular';
import { ArticleService } from '../../providers/article';
import { GlobalService } from '../../providers/global';
import { FACE_URL } from '../../config/index';


@Component({
  	selector: 'comment',
  	templateUrl: 'comment.html'
})
export class CommentComponent {
	name='';
    email='';
    content='';
    parentComment='';
    isSaveInfo=true;
    shouldShowFace=false;
    textFocusStart=0;
    textFocusEnd=0;
    preText='';
    nexText='';
    isPressingCtrl=false;
    reply=null;
    article='';
    onReplySuccess=null;
	constructor(
		public articleService: ArticleService, 
		public globalService: GlobalService, 
		public navParams: NavParams,
		public viewController: ViewController
	) {
		this.reply = navParams.get('reply');
		this.article = navParams.get('article');
		this.onReplySuccess = navParams.get('onReplySuccess');
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

    //添加评论
    async addComment($event?){
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
        res.data.content =res.data.content.replace('/$gt/g','>').replace(/$lt/g,'<');

        //新增成功
        this.onReplySuccess(res.data);
        this.viewController.dismiss();
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

    //关闭弹窗
    closeModal(){
    	this.viewController.dismiss();
    }
	

	//关闭表情
    onFaceClose(){
		this.shouldShowFace = false;
    }

    ionViewDidLoad(){
    	this.name = window.localStorage['__postName__'] || '';
        this.email = window.localStorage['__email__'] || '';
        this.isSaveInfo = window.localStorage['__isSaveInfo__'] || false;
    }

}
