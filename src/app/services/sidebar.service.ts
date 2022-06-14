import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[]= [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        {titulo: 'Main', url :'./'},
        {titulo: 'Gráfica', url :'./grafica1'},
        {titulo: 'rxjs', url : './rxjs'},
        {titulo: 'progressBar', url :'./progress'},
        {titulo: 'promesas', url : './promesas'},
      ]
    }
  ]

  constructor() { }
}
