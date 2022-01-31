import { Component, OnInit } from '@angular/core';
import { InquiryService } from 'src/app/api/inquiry.service';
import { IContactModel } from 'src/app/models/contact';

@Component({
  selector: 'app-inquiry-list',
  templateUrl: './inquiry-list.component.html',
  styleUrls: ['./inquiry-list.component.scss']
})
export class InquiryListComponent implements OnInit {

  constructor(private inquiryService: InquiryService) { }
  inquiries: IContactModel[];
  loading = true;
  ngOnInit(): void {
    this.grabInquiries();
  }

  private grabInquiries() :void{
    this.inquiryService.grabInquiries()
      .subscribe(inquiries =>
        {this.inquiries = inquiries;
      })
      .add(_ => this.loading = false);
  }

  /**
   * Delete an event from the database.
   * @param {boolean} [reload=true] - boolean = true
   */
  deleteEvent(reload: boolean= true) : void{
    if (reload) { this.grabInquiries(); }
  }

}
