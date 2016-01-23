import {Component, Input, Output, EventEmitter} from 'angular2/core';

@Component({
    selector:'contact-buttons',
    template:`
    <button class="btn" [disabled]="disableNewButton()" (click)="toggleViewMode('create')" [ngClass]="actionClass('create')" type="button">
    	{{getButtonText('create')}}
    </button>
    <button class="btn btn-primary" (click)="saveContact()" *ngIf="showSaveButton()" type="button">
        save
    </button>
    <button class="btn" [disabled]="disableEditButton()" (click)="toggleViewMode('edit')" [ngClass]="actionClass('edit')" type="button">
    	{{getButtonText('edit')}}
    </button>
    `
})

export class ContactButtons{
    @Input() view;
    @Input() selected;
    @Output() viewChange = new EventEmitter();
    @Output() contactAction = new EventEmitter();

    toggleViewMode(mode){
        if(mode === 'create' && this.view === mode){
            this.selected = void (0);
        }
		this.view = (mode === this.view) ? (this.selected !== void(0) ? 'view' : '') : mode;
		this.viewChange.emit({ view: this.view });
    }

    actionClass(button) {
		return (button === this.view) ? 'btn-info' : 'btn-default';
    }

    getButtonText(button){
		return (button === this.view) ? 'cancel' : button;
    }

    disableEditButton(){
        return this.selected !== void (0) && this.view !== 'create' ? false : true;
    }

    disableNewButton(){
        return this.view !== 'edit' ? false : true;
    }

    showSaveButton(){
        return this.selected !== void (0) && ['edit', 'create'].indexOf(this.view) !== -1 ? true : false;
    }

    saveContact(){
        this.contactAction.emit({
            action: (this.view === 'create' && !('id' in this.selected)) ? 'save' : 'update'
        });
    }
}