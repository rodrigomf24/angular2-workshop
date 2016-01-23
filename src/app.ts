import {bootstrap} from 'angular2/platform/browser';
import {Component} from 'angular2/core';

import {Contact} from './components/contact/contact';
import {ContactButtons} from './components/contact-buttons/contact-buttons';
import {NewContact} from './components/new-contact/new-contact';
import {ContactList} from './components/contact-list/contact-list';

import {Contact as contactModel} from './models/Contact';
import {Address as addressModel} from './models/Address';
import {Name as nameModel} from './models/Name';

import {ContactService} from './services/contact.service';
import {HTTP_PROVIDERS} from 'angular2/http';


@Component({
    selector:'app',
    directives: [Contact, ContactButtons, NewContact, ContactList],
    // providers:[ContactService],
    template:`
    <section class="contact-list-container">
	    <h3>Contacts</h3>

	    <contact-list (contactSelection)="onContactSelection($event)" [selected]="selectedContact" class="contact-list"></contact-list>

	</section>

	<section class="contact-details-container">
		<div *ngIf="view===''" class="contact-details">No contact selected</div>
	    <contact *ngIf="view === 'view'" [view]="view" [selected]="selectedContact" class="contact-details"></contact>
	    <new-contact *ngIf="['create', 'edit'].indexOf(view)!==-1" [selected]="selectedContact" [view]="view" class="contact-details-new"></new-contact>

	    <contact-buttons (contactAction)="onContactAction($event)" (viewChange)="onViewChange($event)" [selected]="selectedContact" [view]="view" class="contact-edit"></contact-buttons>

	</section>
    `
})
class App{
	view;
	selectedContact;
	constructor(public contactService: ContactService) {
		this.view = '';
		this.selectedContact = void (0);
	}

	onViewChange(event){
		this.view = event.view;
		if(this.view === 'create'){
			let address = new addressModel('', '', '', '');
			let name = new nameModel('', '');
			this.selectedContact = new contactModel(address, '', '', '', '', '', name, '', '');
		}
	}

	onContactSelection(event){
		console.log(event);
		this.selectedContact = event;
		this.view = (this.selectedContact !== void (0)) ? 'view' : '';
	}

	onContactAction(event){
		console.log(event);
		if(event.action === 'save'){
			this.contactService.save(this.selectedContact);
			this.clearFields();
		} else {
			this.contactService.update(this.selectedContact);
			this.clearFields();
		}
	}

	clearFields(){
		this.view = '';
		this.selectedContact = void (0);
	}
}


bootstrap(App, [HTTP_PROVIDERS, ContactService])