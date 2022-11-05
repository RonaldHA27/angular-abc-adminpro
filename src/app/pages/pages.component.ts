import { Component, OnInit } from '@angular/core';

declare function customInitFunction();

import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: []
})
export class PagesComponent implements OnInit {

  

  constructor( private settingService: SettingsService,
                private sidebarService: SidebarService) { }

  ngOnInit(): void {
    customInitFunction();
    this.sidebarService.cargarMenu();

    console.log()
  }

  
}
