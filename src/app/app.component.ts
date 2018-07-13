import { Component, AfterViewInit } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InitialService } from '../providers/initial';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
    templateUrl: 'app.html'
})
export class MyApp implements AfterViewInit{
    rootPage:any = TabsPage;

    constructor(
    	public platform: Platform, 
    	public statusBar: StatusBar, 
    	public splashScreen: SplashScreen, 
    	public initialService: InitialService
    ){

    }
    ngAfterViewInit(){
        this.platform.ready().then(() => {
            this.initialService.getHotWordList();
            this.statusBar.overlaysWebView(false);
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }
}
