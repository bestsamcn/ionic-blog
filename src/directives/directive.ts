import { Directive, ElementRef, OnChanges, OnDestroy } from '@angular/core';

declare var IScroll:any;

@Directive({
	selector: '[fa]'
})
export class Fa {
	constructor() {
		console.log('Hello Directive Directive');
	}

}



/**
 * sidebarScroll 侧边栏滚动指令
 */
@Directive({ selector: '[scroll]' })
export class Scroll implements OnChanges, OnDestroy{
    constructor(public el: ElementRef){
    	this.scroll(el.nativeElement);
    }
    ngOnChanges(){
    	this.scroll(this.el.nativeElement);
    }
    ngOnDestroy(){
		// window.removeEventListener('scroll', this.scroll);
		// document.removeEventListener('resize', this.scroll);
    }
    scroll(){
		new IScroll('#scroll', { scrollX: true, scrollY: false, mouseWheel: true })
    }
}
