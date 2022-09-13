import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators'
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';


import { environment } from 'src/environments/environment';


import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';


import { Usuario } from '../models/usuario.model';
import { CargarUsuario } from '../interfaces/cargar-usuario.interface';


declare const google:any;

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario!: Usuario ;

  constructor(private http:HttpClient,
              private router:Router,
              private ngZone: NgZone) { }

  get token():string{
    return localStorage.getItem('token') || '';
  }
  
  get uid():string{
    return this.usuario.uid || '';
  }
  
  get headers(){
    return {
      headers: {
        'x-token':this.token
      }
    }
  }

  logout(){
    localStorage.removeItem('token');
    
    google.accounts.id.revoke('ronaldhuamanatalaya27@gmail.com',()=>{
      
      this.ngZone.run(()=>{
      this.router.navigateByUrl('/login');
      })

    });
  }

  validarToken():Observable<boolean>{
    

    return this.http.get(`${base_url}/login/renew`,{
      headers:{
        'x-token':this.token
      }
    }).pipe(
      map((resp:any)=>{
        const {email, google,nombre,role,img='',uid }= resp.usuario;
        this.usuario= new Usuario(nombre,email,'',img,google,role,uid);
        localStorage.setItem('token',resp.token);
        return true;
      }),
      map(resp =>true),
      catchError(error=>of(false))
    );
  }

  crearUsuario(formData:RegisterForm){
    
   return this.http.post(`${base_url}/usuarios`, formData)
              .pipe(
                tap( (resp:any)=>{
                  localStorage.setItem('token',resp.token)
                })
              )

  }

  actualizarPerfil(data:{email:string, nombre:string, role:string}){
    
    data={
      ...data,
      role:this.usuario.role
    }

    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, this.headers);

  }

  login(formData: LoginForm){

    return this.http.post(`${base_url}/login`,formData)
                .pipe(
                  tap( (resp:any)=>{
                    localStorage.setItem('token', resp.token)
                  })
                )
  }

  loginGoogle(token:string){
  return this.http.post(`${ base_url }/login/google`,{token})
          .pipe(
            tap((resp:any)=>{
              localStorage.setItem('token', resp.token)
            })
          )
  }

  cargarUsuarios(desde:number = 0){

    
    const url= `${base_url}/usuarios?numero=${desde}`
    return this.http.get<CargarUsuario>(url,this.headers)
            .pipe(
              map(
                resp=>{
                  const usuarios = resp.usuarios.map( 
                    user => new Usuario(user.nombre, user.email,'',user.img,user.google,user.role,user.uid)
                    );
                  
                  return {
                    total:resp.total,
                    usuarios
                  };
                }
              )
            )

  }

  eliminarUsuario(usuario:Usuario){
    
    //  /usuarios/62a95d7c7a748b767151bd07

    const url= `${base_url}/usuarios/${usuario.uid}`;
    return this.http.delete(url,this.headers)

  }

  guardarUsuario(usuario:Usuario){

    return this.http.put(`${base_url}/usuarios/${usuario.uid}`, usuario, this.headers);

  }

}
