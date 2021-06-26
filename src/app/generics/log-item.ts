import { from, pipe } from 'rxjs';
import {v4 as uuidv4} from 'uuid';

export interface ILogItem {
  timestamp?: Date;
  userAgent?: Navigator["userAgent"];
  geoLocation?: any; //GeolocationPosition | GeolocationPositionError;
  vendor?: Navigator["vendor"];
  appCache?: Window["applicationCache"];
  clientInformation?: Window["clientInformation"];
  history?: Window["history"];
  location?: Window["location"];
  error?: Error;
  id?: number;
  eventType?: EEventType;
}
export class LogErrorItem implements ILogItem {
  constructor(error: Error) {
    window["navigator"]["geolocation"]["getCurrentPosition"](
      (loc) => this["geoLocation"] =loc
    );
    this["timestamp"] = new Date();
    this["userAgent"] = window["navigator"]["userAgent"];
    this["vendor"] = window.navigator["vendor"];
    this["appCache"] = window["applicationCache"];
    this["clientInformation"] = window["clientInformation"];
    this["history"] = window["history"];
    this["location"] = window["location"];
    this["error"] = error;
    this["eventType"] = EEventType.Error;
    this["id"] = uuidv4();
  }
}

  export class LogLandingItem implements ILogItem {
    constructor(){
    window["navigator"]["geolocation"]["getCurrentPosition"](
        (loc) => this["geoLocation"] =loc
      );
    this["timestamp"] = new Date();
    this["userAgent"] = window.navigator["userAgent"];
    this["vendor"] = window.navigator["vendor"];
    this["appCache"] = window["applicationCache"];
    this["clientInformation"] = window["clientInformation"];
    this["history"] = window["history"];
    this["location"] = window["location"];
    this["id"] = uuidv4();
    this["eventType"] = EEventType.Landing;
  }
}

export enum EEventType{
  Error= "ERROR",
  Landing = "LANDING",
  Other = "OTHER"
}
