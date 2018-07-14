import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule,  } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { PagesModule } from '../pages/pages.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';

//interceptor
import { AjaxInterceptor } from '../interceptor';
//services
import { GlobalService } from '../providers/global';
import { HomeService } from '../providers/home';
import { RequestService } from '../providers/request';
import { InitialService } from '../providers/initial';

@NgModule({
    declarations: [
        MyApp
    ],
    imports: [
        BrowserModule,
        PagesModule,
        HttpClientModule,
        BrowserAnimationsModule,
        IonicModule.forRoot(MyApp, {
            tabsHideOnSubPages: 'true',
            iconMode:'ios',
            mode:'ios',
            backButtonText:''
        })
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp
    ],
    providers: [
        StatusBar,
        Keyboard,
        SplashScreen, 
        {
            provide: ErrorHandler,
            useClass: IonicErrorHandler
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AjaxInterceptor,
            multi: true
        },
        GlobalService,
        HomeService,
        RequestService,
        InitialService
        
    ]
})
export class AppModule {}