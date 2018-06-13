import { Directive} from '@angular/core';


@Directive({
	selector: '[fa]'
})
export class Fa {
	constructor() {
		console.log('Hello Directive Directive');
	}

}