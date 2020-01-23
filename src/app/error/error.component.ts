import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {
  @Input() mainText = 'Unable to load resources';
  @Input() subText = 'The server could be experiencing issues, try refreshing the page or contacting us.';

  constructor() { }

}
