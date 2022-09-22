export interface Account {
  name: string;
}

export interface Actor {
  account: Account;
  objectType: string;
}

export interface Display {
  "en-US": string;
}

export interface Verb {
  id: string;
  display: Display;
}

export interface Extensions {
  "http://h5p.org/x-api/h5p-local-content-id": string;
}

export interface Name {
  "en-US": string;
}

export interface Definition {
  extensions: Extensions;
  name: Name;
}

export interface Object {
  id: string;
  objectType: string;
  definition: Definition;
}

export interface Category {
  id: string;
  objectType: string;
}

export interface ContextActivities {
  category: Category[];
}

export interface Context {
  contextActivities: ContextActivities;
}

export interface Statement {
  actor: Actor;
  verb: Verb;
  object: Object;
  context: Context;
}

export interface XAPIROOT {
  statement: Statement;
}
