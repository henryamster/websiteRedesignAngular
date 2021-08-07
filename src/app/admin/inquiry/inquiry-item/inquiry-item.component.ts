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
  dismissInquiry(id:string){
    console.log(`dismissing inquiry with id ${id}`);
    this.dismiss(id);
  }
  private dismiss(id:string){
    this.inquiryService.dismissInquiry(id).subscribe(_=>this.deleteEvent.emit(true))
  }

  public postBody(){
    return this.sanitizer.bypassSecurityTrustHtml(this.inquiry.message);
  }
}
