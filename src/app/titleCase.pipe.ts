import { Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: 'TitleCasePipe' })
export class TitleCasePipe implements PipeTransform {
	transform (value:string):any {
		if (!value) return null;

		let words = value.split(' '),
		    length = words.length;

		for (let i=0;i<length;i++) {
			words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1); 
		}

		return words.join(' ')
	}
}