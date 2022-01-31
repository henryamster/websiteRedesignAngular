import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap, delay } from 'rxjs/operators';
import { InquiryService } from 'src/app/api/inquiry.service';
import { ContactModel, ContactType, IContactModel, IPostContactModel, PostContactModel } from 'src/app/models/contact';

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
  personDetailsGroup: FormGroup;
  contactDetailsGroup: FormGroup;
  messageDetailsGroup: FormGroup;

  submittedValues: IPostContactModel;

  submitted = false;


  contactTypes = [
    { val: ContactType.PERSONAL, text: ContactType.PERSONAL },
    { val: ContactType.BUSINESS, text: ContactType.BUSINESS },
    { val: ContactType.REQUEST_FOR_USE, text: ContactType.REQUEST_FOR_USE },
    { val: ContactType.SERVICE, text: ContactType.SERVICE },
    { val: ContactType.BILLING, text: ContactType.BILLING },
    { val: ContactType.TESTIMONIAL, text: ContactType.TESTIMONIAL}
  ];

  ngOnInit(): void {
    this.createForms();
  }
  /**
   * * If the form is invalid, mark all fields as touched and return.
   * * If the form is valid, submit the form and return the response.
   * @returns A promise that is resolved after the form submission is complete.
   */
  public submit(){
    if (
      !this.personDetailsGroup.valid ||
      !this.contactDetailsGroup.valid ||
      !this.messageDetailsGroup.valid
    )
    {
      this.personDetailsGroup.markAllAsTouched();
      this.contactDetailsGroup.markAllAsTouched();
      this.messageDetailsGroup.markAllAsTouched();
      return;
    }

    this.attemptFormSubmission().pipe(
      tap(
      response => {
        if (!!response.success){
        this.submitted = true;
        }
      }),
      delay(1600),
      tap(_ => this.router.navigateByUrl('blog')
      )
    ).subscribe();

  }

  private attemptFormSubmission() {
    return this.inquiry.submitContact(
      new PostContactModel(
        this.personDetailsGroup.get('name').value,
        this.personDetailsGroup.get('email').value,
        this.contactDetailsGroup.get('contactType').value,
        this.contactDetailsGroup.get('followUp').value,
        this.messageDetailsGroup.get('message').value,
        this.personDetailsGroup.get('phone').value

      )
    );
  }

/**
 * Clear the form.
 */
  public clear(){
    this.resetFormGroups();
  }


/**
 * Reset the form groups.
 */
  private resetFormGroups() {
    this.personDetailsGroup.reset();
    this.contactDetailsGroup.reset();
    this.messageDetailsGroup.reset();
  }

  private createForms() {
    this.personDetailsGroup = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['']
    }
    );

    this.contactDetailsGroup = this.fb.group({
      contactType: ['', [Validators.required]],
      followUp: [false]
    });

    this.messageDetailsGroup = this.fb.group({
      message: ['', [Validators.minLength(25)]]
    });
  }
}
