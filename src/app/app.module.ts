import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { PagesModule } from '../pages/pages.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeStorage } from '@ionic-native/native-storage';

//interceptor
import { AjaxInterceptor } from '../interceptor';
//services
import { GlobalService } from '../providers/global';
import { HomeService } from '../providers/home';
import { RequestService } from '../providers/request';


@NgModule({
    declarations: [
        MyApp
    ],
    imports: [
        BrowserModule,
        PagesModule,
        HttpClientModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp
    ],
    providers: [
        StatusBar,
        NativeStorage,
        SplashScreen, {
            provide: ErrorHandler,
            useClass: IonicErrorHandler
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AjaxInterceptor,
            multi: true,
        },
        GlobalService,
        HomeService,
        RequestService
        
    ]
})
export class AppModule {}