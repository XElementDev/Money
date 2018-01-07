import { Controller, Get, Route } from "tsoa";

import { IdentifiablePerson } from "../../Interface/IIdentifiablePerson";


//#region not unit-tested
@Route("persons")
export class PersonController extends Controller {

	public constructor() {
		super();
		return;
	}


	@Get("{id}")
	public getPersonSync(id: string): IdentifiablePerson {
		const matchingPersons = this.persons.filter(person => person.id === id);
		return matchingPersons[0];
	}


	@Get()
	public getPersonsSync(): Array<IdentifiablePerson> {
		return this.persons;
	}


	public static initializeSync(): void {
		PersonController.initializeDummyValuesSync();
		return;
	}


	private static initializeDummyValuesSync(): void {
		const personA: IdentifiablePerson = {
			id: "1", 
			prename: "Max", 
			surname: "Mustermann"
		};
		const personB: IdentifiablePerson = {
			avatarUrlStr: "https://taeglichneu.files.wordpress.com/2011/01/mustermann.jpg", 
			id: "2", 
			prename: "Erika", 
			surname: "Mustermann"
		};
		const dummyPersons = [ personA, personB ];
		PersonController._persons = dummyPersons;
		return;
	}


	private get persons(): Array<IdentifiablePerson> { return PersonController._persons; }


	private static _persons: Array<IdentifiablePerson>;

}


PersonController.initializeSync();
//#endregion
