

export interface IPostContactModel{
  name?: string;
  email?: string;
  contactType?: ContactType;
  followUp?: boolean;
  message?: string;
  phone?: string;
  }

export class PostContactModel implements IPostContactModel{
    name: any;
    email: any;
    contactType: any;
    followUp: any;
    message: any;
    phone: any;
    constructor(
      name: string,
      email: string,
      contactType: ContactType,
      followUp: boolean,
      message: string,
      phone: string= ''
    ){
      [this.name,
      this.email,
      this.contactType,
      this.followUp,
      this.message,
      this.phone
    ] =
    [
      name,
      email,
      contactType,
      followUp,
      message,
      phone
    ];

  }
  }

export interface IContactModel extends IPostContactModel{
  id?: string;
  name?: string;
  email?: string;
  contactType?: ContactType;
  followUp?: boolean;
  message?: string;
  phone?: string;
  }

export class ContactModel extends PostContactModel{
    id: string;
    constructor(
      id: string,
      name: string,
      email: string,
      contactType: ContactType,
      followUp: boolean,
      message: string,
      phone: string= ''
    ){
      super(name, email, contactType, followUp, message, phone);
      this.id = id;
  }
  }




export enum ContactType{
    PERSONAL= 'Personal',
    BUSINESS= 'On behalf of a business',
    REQUEST_FOR_USE= 'Request to use artwork, music, or other materials',
    SERVICE= 'Specific work inquiry',
    BILLING= 'Billing, Financial information',
    TESTIMONIAL= 'Submit a testimonial'
}
