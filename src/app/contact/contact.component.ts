import { Component, OnInit, ElementRef } from '@angular/core';
import { SharedServices } from '../services/shared.services';
declare var google;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(
    private sharedServices: SharedServices,
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
    this.sharedServices.setCurrentPage(this.sharedServices.getNavItemByRoute('/contact'));
    this.sharedServices.setCurrentBreadcrumbs([
      this.sharedServices.getNavItemByRoute('/'),
      this.sharedServices.getNavItemByRoute('/contact')
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

}
