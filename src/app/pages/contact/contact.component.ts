import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap, delay } from 'rxjs/operators';
import { InquiryService } from 'src/app/api/inquiry.service';
import { ContactModel, ContactType, IContactModel } from 'src/app/models/contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private inquiry: InquiryService,
   private router: Router
  ) { }
  personDetailsGroup: FormGroup
  contactDetailsGroup: FormGroup
  messageDetailsGroup: FormGroup

  submittedValues:IContactModel;

  submitted:boolean=false;

  ngOnInit(): void {
    this.createForms();
  }
  public submit(){
    if (
      !this.personDetailsGroup.valid ||
      !this.contactDetailsGroup.valid ||
      !this.messageDetailsGroup.valid
    )
    {
      this["personDetailsGroup"].markAllAsTouched()
      this["contactDetailsGroup"].markAllAsTouched()
      this["messageDetailsGroup"].markAllAsTouched()
      return
    }

    this.attemptFormSubmission()
    ["pipe"](
      tap(
      response => {
        if (!!response["_path"]["segments"]){
        this["submitted"]=true
        }
      }),
      delay(1600),
      tap(_=>this["router"]["navigateByUrl"]('dashboard')
      )
    )["subscribe"]();

  }

  private attemptFormSubmission() {
    return this.inquiry.submitContact(
      new ContactModel(
        this["personDetailsGroup"]["get"]('name')["value"],
        this["personDetailsGroup"]["get"]('email')["value"],
        this["contactDetailsGroup"]["get"]('contactType')["value"],
        this["contactDetailsGroup"]["get"]('followUp')["value"],
        this["messageDetailsGroup"]["get"]('message')["value"]
      )
    );
  }

  public clear(){
    this["resetFormGroups"]();
  }


  contactTypes = [
    { val: ContactType.PERSONAL, text: ContactType.PERSONAL },
    { val: ContactType.BUSINESS, text: ContactType.BUSINESS },
    { val: ContactType.REQUEST_FOR_USE, text: ContactType.REQUEST_FOR_USE },
    { val: ContactType.SERVICE, text: ContactType.SERVICE },
    { val: ContactType.BILLING, text: ContactType.BILLING },
    { val: ContactType.TESTIMONIAL, text: ContactType.TESTIMONIAL}
  ]


  private resetFormGroups() {
    this["personDetailsGroup"]["reset"]();
    this["contactDetailsGroup"]["reset"]();
    this["messageDetailsGroup"]["reset"]();
  }

  private createForms() {
    this["personDetailsGroup"] = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    }
    );

    this["contactDetailsGroup"] = this.fb.group({
      contactType: ['', [Validators.required]],
      followUp: [false]
    });

    this["messageDetailsGroup"] = this.fb.group({
      message: ['', [Validators.minLength(25)]]
    });
  }
}
