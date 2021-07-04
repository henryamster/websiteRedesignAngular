import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(
    private fb: FormBuilder
  ) { }
  personDetailsGroup: FormGroup
  contactDetailsGroup: FormGroup
  messageDetailsGroup: FormGroup


  ngOnInit(): void {
    this.createForms();
  }
  public submit(){

  }

  public clear(){
    this["resetFormGroups"]();
  }


  contactTypes = [
    { val: "PERSONAL", text: "Personal" },
    { val: "BUSINESS", text: "On behalf of a business" },
    { val: "REQUEST_FOR_USE", text: "Request to use artwork, music, or other materials" },
    { val: "SERVICE", text: "Specific work inquiry" },
    { val: "BILLING", text: "Billing, Financial information" },
    { val: "TESTIMONIAL", text: "Submit a testimonial" }
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
