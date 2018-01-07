import { Identifiable } from "./IIdentifiable";
import { Person } from "./IPerson";

export interface IdentifiablePerson extends Identifiable, Person {
}
