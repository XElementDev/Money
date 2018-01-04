import { Controller, Get, Route } from "tsoa";


//#region not unit-tested
@Route("persons")
export class PersonController extends Controller {

	public constructor() {
		super();
	}


	@Get()
	public getPersonsSync(): string[] {
		const persons = [
			"personA", 
			"personB"
		];
		return persons;
	}

}
//#endregion
