import { Component, OnInit, ElementRef } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { ContactForm } from '../models/models';
import { ApiService } from '../services/api.service';
declare var google;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  formData: ContactForm = new ContactForm();

  constructor(
    private sharedService: SharedService,
    private elementRef: ElementRef,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.sharedService.setCurrentPage(this.sharedService.getNavItemByRoute('/contact'));
    this.sharedService.setCurrentBreadcrumbs([
      this.sharedService.getNavItemByRoute('/'),
      this.sharedService.getNavItemByRoute('/contact')
    ]);
    this.setupMap();
  }

  setupMap() {
    const myLatlng = new google.maps.LatLng(40.766573, -73.990485);

    const mapOptions = {
        zoom: 13,
        scrollwheel: false,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true
    };

    const map = new google.maps.Map(this.elementRef.nativeElement.querySelector('#mapBox'), mapOptions);

    const marker = new google.maps.Marker({
        position: myLatlng,
        map,
        animation: google.maps.Animation.DROP,
    });
  }

  sendContact(): void {
    const emailTest = prompt('Please confirm your email address');

    if (emailTest.toLowerCase() !== this.formData.email.toLowerCase()) {
      alert('Emails do not match. Please try again.');
      return;
    }

    this.apiService.postData('/assets/api/contact.php', this.formData).subscribe(response => {
      alert('Message sent. Thank you!');
      this.formData = new ContactForm();
    }, error => {
      alert('Message could not be sent. Please try again.');
      this.sharedService.handleError('Unable to submit contact form', error);
    });
  }

  formDisabled(): boolean {
    if (
      this.formData.name &&
      this.formData.email &&
      this.formData.message &&
      this.formData.subject &&
      this.sharedService.isValidEmail(this.formData.email)
    ) {
      return false;
    }
    return true;
  }

}
