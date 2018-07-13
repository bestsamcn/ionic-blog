import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FACE_URL } from '../../config/index';
import { flyInOut, slideInOut } from '../../utils/animate';

@Component({
	selector: 'comment-emoji',
	templateUrl: './emoji.html',
	animations: [flyInOut, slideInOut]
})
export class EmojiComponent implements OnInit {
	emojiList = [];
	FACE_URL = FACE_URL;
	@Output() onFaceClick = new EventEmitter();
	@Output() onFaceClose = new EventEmitter();
	@Input() shouldShowFace = false;
	constructor() {}

	//初始化
	init() {
		for (var i = 1; i <= 48; i++) {
			this.emojiList.push(i);
		}
	}

	//选择
	selectFace(item: any) {
		this.onFaceClick.emit(item);
	}

	//关闭
	closeFace(){
		this.onFaceClose.emit();
	}
	ngOnInit() {
		this.init();
	}

}