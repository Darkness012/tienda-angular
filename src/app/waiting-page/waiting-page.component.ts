import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'waiting-page',
  templateUrl: './waiting-page.component.html',
  styleUrls: ['./waiting-page.component.scss']
})
export class WaitingPageComponent implements OnInit {

  @Input() message: string = '';

  constructor() {
   }

  ngOnInit(): void {
  }

}
