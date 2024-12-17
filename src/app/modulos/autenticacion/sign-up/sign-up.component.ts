import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/modules/auth.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule ,ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
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

  async signUp(){
    let payload = {
      email: this.formLogin.controls.Correo.value,
      password: this.formLogin.controls.Password.value
    }
    try {
      await this.authService.signUp(payload);
      toast.success('Creado correctamente!');
    } catch (error: any) {
      const errorCode = error.code;
      if(errorCode === 'auth/email-already-in-use') {
        toast.error('El usuario ya existe!')
      } else {
        toast.error('A ocurrido un error!')
      }
    }
    
  }



  async onRegister2(): Promise<void> {
    let payload = {
      email: this.formLogin.controls.Correo.value,
      password: this.formLogin.controls.Password.value
    }
    try {
      await this.authService.register2(payload.email, payload.password);
      toast.success('Creado correctamente!');
    } catch (error) {
      toast.error('A ocurrido un error!')
    }
  }

}
