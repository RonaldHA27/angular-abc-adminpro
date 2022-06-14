import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    this.getUsuarios( ).then( usuarios => {
      console.log(usuarios);
    })

    // const promesa = new Promise( ( resolve, reject )=>{

    //   if(false){
    //     resolve("Hola mundo");
    //   }else{
    //     reject("algo salio mal");
    //   }

      

    // });

    // promesa.then( ( mensaje)=>{
    //   console.log(mensaje);
    // })
    // .catch (error => console.log("Error es mi promesa " , error));

    // console.log("Fin de Init "); 

  }

  getUsuarios(){

    return new Promise ( resolve => {

      fetch('https://reqres.in/api/users')
      .then( resp => resp.json())
      .then( body => resolve( body.data));

    });

    

  }

}
