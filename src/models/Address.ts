export class Address{
	public city: string;
	public state: string;
	public streetAddress: string;
	public zipCode: string;

	constructor(city: string, state: string, streetAddress: string, zipCode: string){
		this.city = city;
		this.state = state;
		this.streetAddress = streetAddress;
		this.zipCode = zipCode;
	}
}