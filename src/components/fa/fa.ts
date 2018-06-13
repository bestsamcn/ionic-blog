import { Component, Input } from '@angular/core';

//font-awesome
@Component({
  	selector: 'fa',
  	templateUrl: 'fa.html'
})
export class FaComponent {
	@Input() name:string;
	@Input() size:number;
	@Input() color:string;
	constructor() {
		console.log('Hello FaComponent Component');
	}

}