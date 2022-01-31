import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShortService } from 'src/app/api/short.service';
import { ShortLink } from 'src/app/generics/short-link';


@Component({
  selector: 'app-short-form',
  templateUrl: './short-form.component.html',
  styleUrls: ['./short-form.component.scss']
})
export class ShortFormComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private short: ShortService) { }
  shortLinkForm: FormGroup;
  showForm = false;
  @Output() newShortLink: EventEmitter<boolean> = new EventEmitter();

  ngOnInit(): void {
    this.shortLinkForm = this.fb.group({
      id: ['', Validators.required],
      url: ['', Validators.required]
    });
  }


/**
 * * Add a new short link to the database.
 */
  async add(){
    await this.addNewShortLink();
    this.resetForm();
    this.emitNewShortLink();
  }


  /**
   * Emit a new short link.
   */
  private emitNewShortLink() {
    this.newShortLink.emit(true);
  }

 /**
  * Reset the form.
  */
  private resetForm() {
    this.shortLinkForm.reset();
  }

  private async addNewShortLink() {
    await this.short.addShortLink(new ShortLink(
      this.shortLinkForm.controls.id.value,
      this.shortLinkForm.controls.url.value
    ));
  }
}
