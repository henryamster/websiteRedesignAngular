

export interface IContactModel{
  name?:string;
  email?: string;
  contactType?: ContactType;
  followUp?:boolean;
  message?: string;
  phone?:string;
  }

  export class ContactModel implements IContactModel{
    constructor(
      name:string,
      email: string,
      contactType: ContactType,
      followUp:boolean,
      message: string,
      phone:string=""
    ){
      [this["name"],
      this["email"],
      this["contactType"],
      this["followUp"],
      this["message"],
      this["phone"]
    ]=
    [
      name,
      email,
      contactType,
      followUp,
      message,
      phone
    ]

  }
  }

 export enum ContactType{
    PERSONAL= "Personal",
    BUSINESS= "On behalf of a business",
    REQUEST_FOR_USE= "Request to use artwork, music, or other materials",
    SERVICE= "Specific work inquiry",
    BILLING= "Billing, Financial information",
    TESTIMONIAL= "Submit a testimonial"
}
