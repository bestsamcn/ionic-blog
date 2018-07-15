import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { GlobalService } from '../providers/global';

@Injectable()
export class AjaxInterceptor implements HttpInterceptor {
	constructor(public globalService: GlobalService){
	}
	intercept(req: HttpRequest < any > , next: HttpHandler): Observable < HttpEvent < any >> {
		const authReq = req.clone({headers: req.headers.set('token', this.globalService.token)});
		return next.handle(authReq)
		.mergeMap((event: HttpEvent<any>)=> { 
			//因为这里的回调表示一旦有数据流经过就会触发，所以就算没有返回也会走到这里，所以这里不能做loading控制
			if(event instanceof HttpResponse &&  (event.status !== 200 && event.status !== 304 || event.body.retCode !== 0)){

				this.globalService.setToast(event.body.msg || '出错了');
                this.globalService.setLoading(false);
				return Observable.create(observer => observer.error(event));
			}
			return Observable.create(observer => observer.next(event));
		})
		.catch((res: HttpResponse<any>) => {
            switch (res.status) {
                case 401:
                    // 权限处理
                    this.globalService.setToast('你无权限');
                    break;
                case 404:
                	this.globalService.setToast('地址不存在');
                    break;
                case 0:
                	this.globalService.setToast('网络异常');
                    break;
            }
            // 以错误的形式结束本次请求
           	// this.globalService.setToast('发生未知错误');
           	this.globalService.setLoading(false);
            return Observable.throw(res);
        })
	}
}