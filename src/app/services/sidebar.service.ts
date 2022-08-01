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
    },

    {
      titulo: 'Mantenimientos',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        {titulo: 'Usuarios', url :'usuarios'},
        {titulo: 'Hospitales', url :'hospitales'},
        {titulo: 'Médicos', url:'medicos'},
        
      ]
    }

  ]

  constructor() { }
}
