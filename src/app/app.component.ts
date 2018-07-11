import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InitialService } from '../providers/initial';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage:any = TabsPage;

    constructor(
    	platform: Platform, 
    	statusBar: StatusBar, 
    	splashScreen: SplashScreen, 
    	initialService: InitialService
    ){
        platform.ready().then(() => {
        	initialService.getHotWordList();
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
}
