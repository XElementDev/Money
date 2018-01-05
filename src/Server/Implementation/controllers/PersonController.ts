import { Controller, Get, Route } from "tsoa";

import { Person } from "../../Interface/IPerson";


//#region not unit-tested
@Route("persons")
export class PersonController extends Controller {

	public constructor() {
		super();
		return;
	}


	@Get("{id}")
	public getPersonSync(id: string): Person {
		const matchingPersons = this.persons.filter(person => person.id === id);
		return matchingPersons[0];
	}


	@Get()
	public getPersonsSync(): Array<Person> {
		return this.persons;
	}


	public static initializeSync(): void {
		PersonController.initializeDummyValuesSync();
		return;
	}


	private static initializeDummyValuesSync(): void {
		const personA: Person = {
			id: "1", 
			prename: "Max", 
			surname: "Mustermann"
		};
		const personB: Person = {
			avatarUrlStr: "https://taeglichneu.files.wordpress.com/2011/01/mustermann.jpg", 
			id: "2", 
			prename: "Erika", 
			surname: "Mustermann"
		};
		const dummyPersons = [ personA, personB ];
		PersonController._persons = dummyPersons;
		return;
	}


	private get persons(): Array<Person> { return PersonController._persons; }


	private static _persons: Array<Person>;

}


PersonController.initializeSync();
//#endregion
