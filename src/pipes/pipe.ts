import { Pipe, PipeTransform } from '@angular/core';


/**
 * dateFormat 时间格式化
 * @date {Number} 时间戳 
 * @format {String} 时间戳 
 * @return {String} 格式化的时间 
 */
@Pipe({
	name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
	transform(date: any, format: string): string {
		if (!arguments[0]) {
            return '暂无'
        }
        date = new Date(date);
        var map = {
            "M": date.getMonth() + 1, //月份
            "d": date.getDate(), //日
            "h": date.getHours(), //小时
            "m": date.getMinutes(), //分
            "s": date.getSeconds(), //秒
            "q": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        format = format.replace(/([yMdhmsqS])+/g, function(all, t) {
            var v = map[t];
            if (v !== undefined) {
                if (all.length > 1) {
                    v = '0' + v;
                    v = v.substr(v.length - 2);
                }
                return v;
            } else if (t === 'y') {
                return (date.getFullYear() + '').substr(4 - all.length);
            }
            return all;
        });
        return format;
	}
}


/**
 * dateDesc 时间倒读
 * @param  {number} oldDate 时间戳
 * @return {string} 倒读
 */
@Pipe({
	name: 'dateDesc'
})
export class DateDescPipe implements PipeTransform {
	transform(oldDate: number) {
		let now: number=new Date().getTime();
        let past: number=  !isNaN(oldDate) ? oldDate : new Date(oldDate).getTime();
        let diffValue= now - past;
        let res: number | string;
        let s: number = 1000;
        let m: number = 1000 * 60;
        let h: number= m * 60;
        let d: number= h * 24;
        // let hm= d * 15;
        let mm: number= d * 30;
        let y: number= mm * 12;
        let _y: number= diffValue/y;
        let _mm: number=diffValue/mm;
        let _w: number=diffValue/(7*d);
        let _d: number=diffValue/d;
        let _h: number=diffValue/h;
        let _m: number=diffValue/m;
        let _s: number= diffValue/s;
        if(_y>=1) {res = Math.floor(_y)+'年前';}
        else if(_mm>=1) {res = Math.floor(_mm) + '个月前';}
        else if(_w>=1) {res = Math.floor(_w) + '周前';}
        else if(_d>=1) {res = Math.floor(_d) +'天前';}
        else if(_h>=1) {res = Math.floor(_h) +'小时前';}
        else if(_m>=1) {res = Math.floor(_m) +'分钟前';}
        else if(_s>=1) {res = Math.floor(_s) +'秒前';}
        res = '刚刚';
        return res;
	}
}

/**
 * textEllipsis 字符串缩略
 * @str { string } 需要缩略的字符串
 * @len { number } 限定的字数
 * @isPoint { boolean } 只显示指定字数，isPoint为真时，剩余以。。。代替,否则直接截取。
 * @return { string } 返回字符串 
 */
@Pipe({
	name: 'textEllipsis'
})
export class TextEllipsisPipe implements PipeTransform {
	transform(str: string, len: number, isPoint: boolean): string {
		isPoint = isPoint || false;
        if(!str) return;
        if(str.length <= len) return str;
        return (isPoint ? str.substring(0, len)+'...' : str.substring(0, len));
	}
}

/**
 * transNum
 * @num { number } 需要转化的数字
 * @return {number|string} 返回 
 */
@Pipe({
	name: 'transNum'
})
export class TransNumPipe implements PipeTransform {
	transform(num:number){
		if(!num) return 0;
        if (num >= 10000) {
            return Math.round(num / 10000 * 100) / 100 +' W';
        } else if(num>= 1000) {
            return Math.round(num / 1000 * 100) / 100 +' K';
        }
        return num;
	}
}