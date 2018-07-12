import { Directive, ElementRef, OnChanges, OnDestroy, OnInit } from '@angular/core';

declare var IScroll:any;
declare var Clock:any;

/**
 * sidebarScroll 侧边栏滚动指令
 */
@Directive({ selector: '[clocky]' })
export class Clocky implements OnChanges, OnDestroy, OnInit{
    constructor(public el: ElementRef){
        console.log(el)
    }
    ngOnChanges(){
        setTimeout(()=>{
            Clock.init(this.el.nativeElement);
        },500)
    }
    ngOnDestroy(){
       clearInterval(Clock._timer)
    }
    ngOnInit(){
        Clock.init(this.el.nativeElement);
    }
    
}

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
export class Scroll implements OnChanges, OnDestroy, OnInit{
    constructor(public el: ElementRef){
        
    	this.scroll(el.nativeElement);
    }
    ngOnChanges(){
    	this.scroll(this.el.nativeElement);
    }
    ngOnDestroy(){
		window.removeEventListener('scroll', this.scroll.bind(this, this.el.nativeElement));
		document.removeEventListener('resize', this.scroll.bind(this, this.el.nativeElement));
    }
    ngOnInit(){
        console.log(document.getElementById('scroll'))
    }
    ionViewDidLoad(){
        console.log(document.getElementById('scroll'))
    }
    scroll(el:any){
        
		new IScroll(el, { scrollX: true, scrollY: false, mouseWheel: true });
        
    }
}

    
