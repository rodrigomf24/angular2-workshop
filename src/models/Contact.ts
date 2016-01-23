import {Address} from './Address';
import {Name} from './Name';

export class Contact {
	public address: Address;
	public avatar: string = "https://s3.amazonaws.com/uifaces/faces/twitter/osmond/128.jpg";
	public bs: string;
	public company: string;
	public email: string;
	public id: number;
	public lorem: string = "Debitis error qui consectetur eaque dicta.↵Adipisci aut magni est totam.↵Molestiae ut repellendus aut.↵Et aspernatur ut enim.";
	public name: Name;
	public phone: string;
	public username: string;
	constructor(address: Address, avatar: string, bs: string, company: string, email: string, lorem: string, name: Name, phone: string, username: string) {
		this.address = address;
		this.avatar = avatar;
		this.bs = bs;
		this.company = company;
		this.email = email;
		this.lorem = lorem;
		this.name = name;
		this.phone = phone;
		this.username = username;
	}
}