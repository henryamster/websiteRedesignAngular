import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { InquiryService } from 'src/app/api/inquiry.service';
import { IContactModel } from 'src/app/models/contact';

@Component({
  selector: 'app-inquiry-item',
  templateUrl: './inquiry-item.component.html',
  styleUrls: ['./inquiry-item.component.scss']
})
export class InquiryItemComponent implements OnInit {

  constructor(private inquiryService: InquiryService,
    private sanitizer: DomSanitizer) { }
  @Input('inquiry') inquiry:IContactModel;
  @Output('deleteEvent') deleteEvent: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  ngOnInit(): void {

  }
 /**
  * *Dismiss an inquiry by its id.*
  * @param {string} id - string - The id of the inquiry to dismiss.
  */
  dismissInquiry(id:string){
    this.dismiss(id);
  }
  /**
   * `dismiss(id:string){`
   *
   * This function is used to dismiss an inquiry. It takes in an inquiry id and sends it to the inquiry
   * service.
   * @param {string} id - string - The id of the inquiry to dismiss.
   */
  private dismiss(id:string){
    this.inquiryService.dismissInquiry(id).subscribe(_=>this.deleteEvent.emit(true))
  }

 /**
  * `public postBody(){
  *     return this.sanitizer.bypassSecurityTrustHtml(this.inquiry.message);
  *   }`
  *
  * The above function is used to sanitize the HTML that is used in the post body.
  * @returns The HTML of the message.
  */
  public postBody(){
    return this.sanitizer.bypassSecurityTrustHtml(this.inquiry.message);
  }
}
