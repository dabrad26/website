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
  sendEmailConfirm = false;
  disableForm = false;

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
    const myLatlng = new google.maps.LatLng(40.771058, -73.991161);

    const mapStyles = [
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [
          {visibility: 'off'}
        ]
      }
    ];

    const mapOptions = {
      zoom: 13,
      scrollwheel: false,
      center: myLatlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
      styles: mapStyles
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

    const data = {
      from: this.formData.name,
      email: this.formData.email,
      _subject: `[David Website]: ${this.formData.subject}`,
      message: this.formData.message,
      sent: new Date().toISOString(),
    };
    this.disableForm = true;
    this.apiService.post('https://mailthis.to/emaildavid', data, {responseType: 'text'}).subscribe(response => {
      alert('To confirm you are not a robot.  Please do the following captcha and then click "Go Back" to return.');
      this.formData = new ContactForm();
      this.disableForm = false;
      window.location.href = 'https://mailthis.to/confirm';
    }, error => {
      alert('Message could not be sent. Please try again.');
      this.sharedService.handleError('Unable to submit contact form', error);
      this.disableForm = false;
    });
  }

  formDisabled(): boolean {
    if (
      this.formData.name &&
      this.formData.email &&
      this.formData.message &&
      this.formData.subject &&
      this.sharedService.isValidEmail(this.formData.email) &&
      !this.disableForm
    ) {
      return false;
    }
    return true;
  }

}
