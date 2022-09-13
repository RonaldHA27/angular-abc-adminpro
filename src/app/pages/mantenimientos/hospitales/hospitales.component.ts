import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';


import { Hospital } from 'src/app/models/hospital.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { delay, Subscription } from 'rxjs';




@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospital: Hospital[]= [];
  public cargando:boolean= true;
  public hospitalTemp: Hospital[] = [];

  private imgSubs!:Subscription;

  public desde:number =0;
  public totalHospital:number=0;

  constructor( private busquedasService:BusquedasService,
                private hospitalService: HospitalService,
                private modalImagenService: ModalImagenService ) { }
  
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {

    this.cargarHospital();

    this.imgSubs =this.imgSubs= this.modalImagenService.nuevaImagen
        .pipe(delay(100))
        .subscribe(img=>this.cargarHospital());

  }

  cambiarPagina( valor:number){
    this.desde += valor;

    if(this.desde < 0){
      this.desde = 0;
    } else if(this.desde > this.totalHospital){
      this.desde -= valor;
    }
    
    this.cargarHospital();
  }

  buscar(termino:string){
    
    
    if(termino.length===0){
      return this.cargarHospital();
      
      
    }

    this.busquedasService.buscar('hospitales', termino)
        .subscribe((resultados:any) =>{
          this.hospital= resultados;
        });

    
  }

  cargarHospital(){

    this.cargando=true;

    this.hospitalService.cargarHospitales()
        .subscribe( hospital =>{
          this.cargando=false;
          this.hospital=hospital
          this.hospitalTemp=hospital
        })

  }

  guardarCambios(hospital:Hospital){

    this.hospitalService.actualizarHospitales( hospital._id, hospital.nombre).
        subscribe(resp=>{
          Swal.fire('Actualizado',hospital.nombre, 'success');
        })
       
  }

  eliminarHospital(hospital:Hospital){

    this.hospitalService.borrarHospitales( hospital._id).
        subscribe(resp=>{  
          this.cargarHospital();
          Swal.fire('Eliminado',hospital.nombre, 'success');
        })  
  }

  async abrirSweetAlert(){
    const { value='' }= await Swal.fire({
      title:'Crear Hospital',
      text:'ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del Hospital ',
      showCancelButton:true,
    })
    
    if(value.trim().length>0){
      this.hospitalService.crearHospitales(value)
          .subscribe((resp:any)=>{
            this.hospital.push(resp.hospital)
          })
    }
  }

  abrirModal(hospital:Hospital){
    this.modalImagenService.abrirModal('hospitales',hospital._id, hospital.img);
  }

}
