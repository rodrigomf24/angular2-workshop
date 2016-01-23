import {Component, Input} from 'angular2/core';

@Component({
    selector:'new-contact',
    template:`
        <div class="contact-title-holder">
            <div class="media">
            <div class="media-left">
                <p>
                <img [src]="selected.avatar" class="avatar-placeholder" />
                </p>
                <button class="btn btn-default btn-file">Select File</button>
            </div>
            <div class="media-body">
                <div class="form-group">
                    <input type="text" class="form-control" [(ngModel)]="selected.name.first" id="first-name" placeholder="First Name">
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" [(ngModel)]="selected.name.last" id="last-name" placeholder="Last Name">
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" [(ngModel)]="selected.company" id="company" placeholder="Company">
                </div>
            </div>
            </div>
        </div>
        <dl class="dl-horizontal">
            <dt>home:</dt>
                <dd>
                    <input type="text" class="form-control" [(ngModel)]="selected.phone" id="phone" placeholder="Home Phone">
                </dd>
            <dt>address:</dt>
                <dd>
                    <div class="form-group">
                        <input type="text" class="form-control" [(ngModel)]="selected.address.streetAddress" id="address1" placeholder="Address Line 1">
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" id="address2" placeholder="Address Line 2">
                    </div>
                </dd>
            <dt>email:</dt>
                <dd>
                    <div class="form-group">
                        <input type="email" [(ngModel)]="selected.email" class="form-control" id="email" placeholder="Email">
                    </div>
                </dd>
        </dl>
    `
})
export class NewContact{
    @Input() view;
    @Input() selected;
}



