import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { PagesModule } from '../pages/pages.module';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


//services
import { GlobalService } from '../providers/global';
import { RequestService } from '../providers/request';


@NgModule({
    declarations: [
        MyApp
    ],
    imports: [
        BrowserModule,
        PagesModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp
    ],
    providers: [
        StatusBar,
        SplashScreen, {
            provide: ErrorHandler,
            useClass: IonicErrorHandler
        },
        GlobalService,
        RequestService
    ]
})
export class AppModule {}