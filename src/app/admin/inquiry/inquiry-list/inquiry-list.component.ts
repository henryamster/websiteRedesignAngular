import { Component, OnInit } from '@angular/core';
import { InquiryService } from 'src/app/api/inquiry.service';
import { IContactModel } from 'src/app/models/contact';

@Component({
  selector: 'app-inquiry-list',
  templateUrl: './inquiry-list.component.html',
  styleUrls: ['./inquiry-list.component.scss']
})
export class InquiryListComponent implements OnInit {

  constructor(private inquiryService:InquiryService) { }
  inquiries: IContactModel[];
  loading: boolean=true;
  ngOnInit(): void {
    this.grabInquiries();
  }
  private grabInquiries() {
    this.inquiryService.grabInquiries()
      .subscribe(inquiries =>
        {this["inquiries"] = inquiries
      console.log(inquiries)
      })
      .add(_ => this["loading"] = false);
  }

  deleteEvent(reload:boolean=true){
    if (reload) this.grabInquiries();
  }

}
