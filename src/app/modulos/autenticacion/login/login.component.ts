import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/modules/auth.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule ,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  status = false;

  formLogin?: FormGroup | any;

  constructor(private router: Router, private authService: AuthService,private fb: FormBuilder) {
    this.formLogin = this.fb.group({
      Password: new FormControl('',Validators.required),
      Correo: new FormControl('',[Validators.required, Validators.email]),
    });
  }

  isPasswordVisible: boolean = false;  // Estado para saber si la contraseña está visible

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  addToggle() {
    this.status = !this.status;       
  }

  // login() {
  //   this.router.navigate(['page/administrador/dasboardDeEnvio'])
  // }

  async signIn(){
    let payload = {
      email: this.formLogin.controls.Correo.value,
      password: this.formLogin.controls.Password.value
    }
    try {
      await this.authService.signIn(payload);
      toast.success('Logueado correctamente!');
      this.router.navigate(['page/administrador/dasboardDeEnvio']);
    } catch (error: any) {
      const errorCode = error.code;
      if(errorCode === 'auth/email-already-in-use') {
        toast.error('El usuario ya existe!')
      } else {
        toast.error('A ocurrido un error!')
      }
      // 
    }
    
  }





}
