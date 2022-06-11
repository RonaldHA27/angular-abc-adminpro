import { Component, OnInit } from '@angular/core';

declare function customSidebar();

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    customSidebar();
  }

}
