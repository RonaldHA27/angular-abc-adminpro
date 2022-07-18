import { Component, AfterViewInit, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const google:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChild('googleBtn') googleBtn!: ElementRef;

  public formSubmitted = false;
  

  public loginForm = this.fb.group({
    email:[ localStorage.getItem('email')|| '', [Validators.required, Validators.email]],
    password:['',Validators.required],
    remember:[false]
  });

  constructor( private router: Router,
                private fb:FormBuilder,
                private usuarioService:UsuarioService,
                private ngZone:NgZone) {  }
                
  ngOnInit(): void {
                  
  }
  
  
  ngAfterViewInit(): void {
    this.googleInit();  
  }

  googleInit(){
    google.accounts.id.initialize({
      client_id: '535102194101-321clss65hfhdn1m0gjgufdvi3j02jp8.apps.googleusercontent.com',
      callback: (response:any) => this.handleCredentialResponse(response)
    });

    google.accounts.id.renderButton(
      //document.getElementById("buttonDiv"),
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }
           
  handleCredentialResponse(response:any){
    console.log("Encoded JWT ID token: " + response.credential);
    this.usuarioService.loginGoogle(response.credential)
        .subscribe(resp=>{

          this.ngZone.run( ()=>{
            this.router.navigateByUrl('/');
          })

          // this.router.navigateByUrl('/');
        })

  }

  login(){
                  
    this.usuarioService.login(this.loginForm.value)
      .subscribe(resp=>{

        if( this.loginForm.get('remember')?.value ){
          localStorage.setItem('email', this.loginForm.get('email')?.value)
        }else{
          localStorage.removeItem('email');

        }
        //Navegar al Dashboard
        this.router.navigateByUrl('/');
        

      }, (err)=>{
        //Si sucede un error
        Swal.fire('ESTUDIA SONSO', err.error.msg,'error');
        console.log(err);
      })



  }

}
