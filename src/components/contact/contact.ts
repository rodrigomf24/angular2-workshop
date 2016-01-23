import {Component, Input} from 'angular2/core';

@Component({
    selector:'contact',
    template:`
        <div class="contact-title-holder">
            <div class="media">
                <div class="media-left">
                    <img [src]="selected.avatar" class="avatar" />
                </div>
                <div class="media-body media-middle">
                    <h2 class="title">{{selected.name.last + ', ' + selected.name.first}}</h2>
                    <h5 class="subtitle">{{selected.company}}</h5>
                </div>
            </div>
        </div>

        <dl class="dl-horizontal">
            <dt>home:</dt>
            <dd>{{selected.phone}}</dd>
            <dt>address:</dt>
            <dd>{{selected.address.streetAddress}}</dd>
            <dd>{{selected.address.city}}, {{selected.address.state + ' ' + selected.address.zipCode}}</dd>
            <dt>email:</dt>
            <dd>{{selected.email}}</dd>
        </dl>
    `
})

export class Contact{
    @Input() view;
    @Input() selected;
}