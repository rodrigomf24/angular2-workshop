import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';

type Person = {
	name:{
		last:string
	}
}


type Group = {
	letter:string,
	contacts:Person[]
}

@Injectable()
export class ContactService{
	directory;
	directoryObservable;
	directoryObjserver:any;
	contactHeaders;
	constructor(public http:Http){
		this.directoryObservable = new Observable(observer => this.directoryObjserver = observer).share();
		this.getDirectory();
		this.contactHeaders = new Headers();
		this.contactHeaders.append('Content-Type', 'application/json');
	}

	getDirectory(){
		this.http.get('http://localhost:3000/people')
			.map((res)=> res.json())
			.subscribe((result:Person[]) => this.setDirectory(result));
	}

	setDirectory(contacts) {
		console.log(contacts);
		this.directory = contacts.reduce((accumulator: Group[], currentVal: any) => {
			const letter = currentVal.name.last.substr(0, 1);
			const i = accumulator.findIndex((elm: any) => elm.letter === letter);

			if (i > -1) accumulator[i].contacts.push(currentVal);
			else accumulator.push({ letter, contacts: [currentVal] });

			return accumulator;
		}, [])
			.sort(function(a, b){
				if (a.letter > b.letter) return 1;
				if (a.letter < b.letter) return -1;
				return 0;
			});
		this.directoryObjserver.next(this.directory);
	}

	save(contact) {
		this.http.post('http://localhost:3000/people', JSON.stringify(contact), {
				headers: this.contactHeaders
			})
			.map((res)=> res.json())
			.subscribe((response) => {
				console.log(response);
				this.getDirectory()
			});
	}

	update(contact) {
		this.http.put('http://localhost:3000/people/' + contact.id, JSON.stringify(contact), {
			headers: this.contactHeaders
		})
			.map((res) => res.json())
			.subscribe((response) => {
				console.log(response);
				this.getDirectory()
			});
	}
}