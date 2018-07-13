import { trigger, style, animate, transition, keyframes  } from '@angular/animations';


//关键帧，有序动画，group为同步动画
export const flyInOut = trigger('flyInOut', [
	//:enter
    transition('void => *', [
      	animate(400, keyframes([
	      	//偏移量不能相同，否则无法持续进行动画
	        style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
	        style({opacity: 1, transform: 'translateX(30px)',  offset: 0.5}),
	        style({opacity: 1, transform: 'translateX(-30px)',  offset: 0.8}),
	        style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
	    ]))
    ]),
    //:leave
    transition('* => void', [
      	animate(400, keyframes([
        	style({opacity: 1, transform: 'translateX(0)',     offset: 0}),//0s
        	style({opacity: 1, transform: 'translateX(-30px)', offset: 0.7}),//0-0.7*400
      	  	style({opacity: 0, transform: 'translateX(100%)',  offset: 1.0})//0.7*400-1.0*400
      	]))
	])
])


//滑动
export const slideInOut = trigger('slideInOut', [
	//:enter
    transition(':enter', [
        style({opacity: 0, transform: 'translateX(-100%)'}), animate(300)
    ]),
    //:leave
    transition(':leave', [
       animate(300, style({opacity: 0, transform: 'translateX(-100%)'}))
    ])
])