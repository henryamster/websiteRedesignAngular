import {v4 as uuidv4} from 'uuid';
import { User } from '@firebase/auth-types';

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
  user?: User;
  serverMessage?: string;
}
export class LogItem implements ILogItem{
  constructor(user:User=null){
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
    this["user"] = user;
  }
}

export class LogErrorItem extends LogItem {
  constructor(error: Error, user:User=null) {
    super(user)
    this["error"] = error
    this["eventType"] = EEventType.Error
  }
}

  export class LogLandingItem extends LogItem {
    constructor(user:User=null){
    super(user)
    this["eventType"] = EEventType.Landing
  }

}
export class LogAuthItem extends LogItem {
  constructor(error: Error, user:User=null){
    super(user)
    this["error"] = error
    this["eventType"] = EEventType.Auth
  }
}

export class LogServerItem extends LogItem {
  constructor(error?: Error, user:User=null, serverMessage?: string){
  super(user)
  this["error"]=error
  this["serverMessage"]=serverMessage
  this["eventType"] = EEventType.Server
  }
}

export enum EEventType{
  Error= "ERROR",
  Landing = "LANDING",
  Auth = "AUTH",
  Other = "OTHER",
  Server = "SERVER"
}
