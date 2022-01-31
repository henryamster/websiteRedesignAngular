import {v4 as uuidv4} from 'uuid';
import { User } from '@firebase/auth-types';



export interface ILogItem {
  timestamp?: Date;
  userAgent?: Navigator['userAgent'];
  geoLocation?: any; // GeolocationPosition | GeolocationPositionError;
  vendor?: Navigator['vendor'];
  location?: Window['location'];
  error?: Error;
  id?: string;
  eventType?: EEventType;
  user?: User;
  serverMessage?: string;
}
export class LogItem implements ILogItem{
  geoLocation: GeolocationPosition;
  timestamp: Date;
  userAgent: string;
  vendor: string;
  location: Location;
  id: any;
  user: User;
  constructor(user: User= null){
    // window.navigator.geolocation.getCurrentPosition(
    //     (loc) => this.geoLocation = loc
    //   );
    this.timestamp = new Date();
    this.userAgent = window.navigator.userAgent;
    this.vendor = window.navigator.vendor;
    this.location = window.location;
    this.id = uuidv4();
    this.user = user;
  }
}

export class LogErrorItem extends LogItem {
  error: Error;
  eventType: EEventType;
  constructor(error: Error, user: User= null) {
    super(user);
    this.error = error;
    this.eventType = EEventType.Error;
  }
}

export class LogLandingItem extends LogItem {
    eventType: EEventType;
    constructor(user: User= null){
    super(user);
    this.eventType = EEventType.Landing;
  }

}
export class LogAuthItem extends LogItem {
  error: Error;
  eventType: EEventType;
  constructor(error: Error, user: User= null){
    super(user);
    this.error = error;
    this.eventType = EEventType.Auth;
  }
}

export class LogServerItem extends LogItem {
  error: Error;
  serverMessage: string;
  eventType: EEventType;
  constructor(error?: Error, user: User= null, serverMessage?: string){
  super(user);
  this.error = error;
  this.serverMessage = serverMessage;
  this.eventType = EEventType.Server;
  }
}

export enum EEventType{
  Error= 'ERROR',
  Landing = 'LANDING',
  Auth = 'AUTH',
  Other = 'OTHER',
  Server = 'SERVER'
}

export interface IBugReport{
    id?: string;
    logItem?: ILogItem;
    bugReportText?: string;
}

export interface IPostBugReport{
  logItem: ILogItem;
  bugReportText?: string;
}

export class BugReport implements IBugReport{
  constructor(logItem: ILogItem, bugReportText: string, id?: string){
    [this.bugReportText, this.logItem, this.id] = [bugReportText, logItem, id];

  }
  id?: string;
  logItem: ILogItem;
  bugReportText: string;
}
export class PostBugReport implements IPostBugReport {
  constructor(logItem: ILogItem, bugReportText: string){
    [this.bugReportText, this.logItem] = [bugReportText, logItem];

  }
  logItem: ILogItem;
  bugReportText: string;
}

