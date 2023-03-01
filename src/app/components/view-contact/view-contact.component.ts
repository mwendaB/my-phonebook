import { IGroup } from './../../models/igroup';
import { IContact } from './../../models/icontact';
import { ContactService } from './../../services/contact.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.scss'],
})
export class ViewContactComponent implements OnInit {
  public contactId: string | null = null;
  public loading: boolean = false;
  public contact: IContact = {} as IContact;
  public errorMessage: string | null = null;
  public group: IGroup = {} as IGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.contactId = params.get('contactId');
    });

    if (this.contactId) {
      this.loading = true;
      this.contactService.getContact(this.contactId).subscribe({
        next: (data) => {
          this.contact = data;
          this.contactService.getGroup(data).subscribe((data) => {
            this.group = data;
          });
          this.loading = false;
        },
        error: (error) => {
          this.errorMessage = error;
          this.loading = false;
        },
      });
    }
  }

  public isNotEmpty() {
    return (
      Object.keys(this.contact).length > 0 && Object.keys(this.group).length > 0
    );
  }
}
