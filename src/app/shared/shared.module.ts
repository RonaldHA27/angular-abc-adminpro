import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';



@NgModule({
  declarations: [
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
  ],
  exports:[
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
