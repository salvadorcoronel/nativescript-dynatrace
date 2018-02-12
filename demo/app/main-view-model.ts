import { Observable } from 'tns-core-modules/data/observable';
import { Dynatrace } from 'nativescript-dynatrace';

export class HelloWorldModel extends Observable {
  public message: string;
  private dynatrace: Dynatrace;

  constructor() {
    super();

    this.dynatrace = new Dynatrace();
    // this.message = this.dynatrace.message;
  }
}
