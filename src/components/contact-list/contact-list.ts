import {Component,Input,Output,EventEmitter} from 'angular2/core';
import {ContactService} from './../../services/contact.service';

@Component({
	selector:'contact-list',
	template:`
	<div *ngIf="contactService.directory" *ngFor="#group of directory">
		<div *ngIf="validateLetter(group)">
			<h4 class="small">{{group.letter}}</h4>
			<div class="list-group">
				<button type="button" (click)="selectContact(contact)" class="list-group-item" [ngClass]="{'active':isContactSelected(contact), '':!isContactSelected(contact)}" *ngFor="#contact of group.contacts">{{contact.name.last + ', ' + contact.name.first}}</button>
			</div>
		</div>
	</div>
	`
})

export class ContactList{
	directory;
	@Output() contactSelection = new EventEmitter();
	@Input() selected;
	constructor(public contactService: ContactService) {
		console.log(this.contactService);
		this.contactService.directoryObservable.subscribe((directoryList) => { 
			this.directory = directoryList;
			if(this.directory.length > 0 && this.directory[0] !== void(0) && this.directory[0].contacts.length > 0){
				this.selected = this.directory[0].contacts[0];
				this.contactSelection.emit(this.selected);
			}
		});
	}

	selectContact(contact){
		if (this.selected !== void (0) && this.selected.id === contact.id) {
			this.selected = void (0);
			this.contactSelection.emit(this.selected);
		} else {
			this.contactSelection.emit(contact);
		}
	}

	isContactSelected(contact){
		return (this.selected !== void(0) && this.selected.id === contact.id) ? true : false;
	}

	validateLetter(group){
		return (group !== void (0) && group !== null && 'letter' in group) ? true : false;
	}
}