import { Controller, Get, Route } from "tsoa";

import { Person } from "../../Interface/IPerson";


//#region not unit-tested
@Route("persons")
export class PersonController extends Controller {

	public constructor() {
		super();
	}


	@Get()
	public getPersonsSync(): Array<Person> {
		const personA: Person = {
			id: "1", 
			prename: "John", 
			surname: "Doe"
		};
		const personB: Person = {
			avatarUrlStr: "https://taeglichneu.files.wordpress.com/2011/01/mustermann.jpg", 
			id: "2", 
			prename: "Erika", 
			surname: "Mustermann"
		}
		const persons = [ personA, personB ];
		return persons;
	}

}
//#endregion
