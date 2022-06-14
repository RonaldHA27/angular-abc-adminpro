import { Component, OnInit } from '@angular/core';

declare function customInitFunction();

import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: []
})
export class PagesComponent implements OnInit {

  

  constructor( private settingService: SettingsService) { }

  ngOnInit(): void {
    customInitFunction();
  }

  
}
