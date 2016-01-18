import {bootstrap} from 'angular2/platform/browser';
import {Component} from 'angular2/core';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app',
  template: `
    <h1>Angular 2 Starter App</h1>
    <h3>This is working if you see a list of names below</h3>
    <div *ngFor="#person of people | async">{{person.name.first}} {{person.name.last}}</div>
  `
})
export class App{
  people;
  constructor(public http:Http){
    this.people = http
      .get('http://localhost:3000/people')
      .map(res => res.json())
  }
}

bootstrap(App, [HTTP_PROVIDERS]);
