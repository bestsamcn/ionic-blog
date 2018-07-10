/**
 * 工具库
 */

let Tool: any = {};

Tool.isMobile = function() {
        var b = false;
        var sUserAgent = navigator.userAgent.toLowerCase();
        var bIsIpad = String(sUserAgent.match(/ipad/i)) == "ipad";
        var bIsIphoneOs = String(sUserAgent.match(/iphone os/i)) == "iphone os";
        var bIsMidp = String(sUserAgent.match(/midp/i))  == "midp";
        var bIsUc7 = String(sUserAgent.match(/rv:1.2.3.4/i)) == "rv:1.2.3.4";
        var bIsUc = String(sUserAgent.match(/ucweb/i)) == "ucweb";
        var bIsAndroid = String(sUserAgent.match(/android/i)) == "android";
        var bIsCE = String(sUserAgent.match(/windows ce/i)) == "windows ce";
        var bIsWM = String(sUserAgent.match(/windows mobile/i)) == "windows mobile";
        if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
            b = true;
        }
        return b;
    }
    /**
     * 设置cookie
     * @param {string} k 键名
     * @param {string} v 值
     * @param {number} d 天数
     */
Tool.setCookie = function(k, v, d) {
    var expire:string = '';
    if (d) {
        var date:any = new Date();
        date.setTime(date.getTime() + d * 24 * 60 * 60 * 1000);
        expire = ';expires=' + date.toUTCString();
    }
    document.cookie = k + '=' + v + expire;
}

Tool.delay = (t:any)=>new Promise(resolve=>setTimeout(resolve, t));

/**
 * 获取cookie
 * @param {string} k 键名
 * @return {v} 键值
 */
Tool.getCookie = function(k) {
    //一旦检测到分号，即停止
    var arr:any = document.cookie.match(new RegExp(k + '=([^;]*)'));
    return arr ? arr[1] : '';
}

/**
 * 清除cookie
 * @param {string} k 键名
 */
Tool.clearCookie = function(k) {
    Tool.setCookie(k, '', -1);
}
/**
 * 获取css样式值
 * @param  {dom} element
 * @param  {string} attr    属性名
 * @return {string}
 */
Tool.getStyle = function(element: any, attr: string) {
    return window.getComputedStyle(element, null)[attr];
}

/**
 * 运动函数
 * @param  {dom}   obj
 * @param  {obj}   json 运动参数
 * @param  {function} fn   回调
 */
let timer: any;
Tool.moveStart = function(obj: any, json: object, fn: any): void {
    let that = Tool;
    clearInterval(timer);
    timer = setInterval(function() {
        var bStop:boolean = true;
        var icur:number= 0;
        icur = parseInt(that.getStyle(obj, 'top'));
        var iSpeed:number = (json['top'] - icur) / 8;
        // alert('iSpeed'+iSpeed)
        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
        if (icur != json['top']) {
            bStop = false;
        }
        obj.style['top'] = icur + iSpeed + 'px';
        if (bStop) {
            clearInterval(timer);
            fn && fn();
        }
    }, 30);
}


/**
*@function toScrollHeight 跳到指定滚动条高度
*@param iTarget {number} 指定滚动条高度 例如:300
*@param obj {object} 触发该方法的对象
*@example toScrollHeight(300,document.getElementId('obj'))
*/
Tool.toScrollHeight = function(iTarget,obj){
    var iTimer:any = null;
    var b:number = 0;
    //不能放在scroll时间里，否则无滚动，不能点击
    if(obj !== 'undefined'){
        obj.addEventListener('click',function(){
            clearInterval(iTimer);
            runFn(iTarget);
        });
    }
    window.addEventListener('scroll',function(){
        if (b != 1) {
            clearInterval(iTimer);
        }
        b = 2;
    });
    function runFn(iTarget: number, iCur?: number) {
        clearInterval(iTimer);
        var iSpeed:number = 0,iCur:number = 0;
        iTimer = setInterval(function() {
            iCur = document.documentElement.scrollTop || document.body.scrollTop;
            //一直没想到会是这步的原因,由于放向的不同,取值会不同,ceil是为了向下滚动,为正数,floor是为了向上滚动,为负数
            iSpeed = iSpeed > 0 ?  Math.ceil((iTarget - iCur) / 7) : Math.floor((iTarget -iCur)/7);
            if (iCur != iTarget) {
                document.documentElement.scrollTop = document.body.scrollTop = iCur + iSpeed;
            } else {
                clearInterval(iTimer);
            }
            b = 1;
        }, 30);
    }
}

export default Tool;
