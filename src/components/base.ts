import { Component } from '@angular/core';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

@Component({
  selector: 'base',
  template: '',
})
export class Base{
    constructor(public nativePageTransitions: NativePageTransitions){
    }
	ionViewWillEnter(){
        let options: NativeTransitionOptions = {
            direction: 'left',
            duration: 500,
            slowdownfactor: 3,
            slidePixels: 20,
            iosdelay: 100,
            androiddelay: 150,
            fixedPixelsTop: 0,
            fixedPixelsBottom: 0
       };
       !!this.nativePageTransitions && !!this.nativePageTransitions.slide && this.nativePageTransitions.slide(options)
       .then(e=>console.log(e))
       .catch(e=>console.log(e));
    }
}
