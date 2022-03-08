import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthHelper } from '../_helpers/auth-helper';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  mensagem_erro: string = '';
  exibirPagina: boolean = false;
 
  constructor(
    private httpClient: HttpClient,
    private authHelper: AuthHelper
  ) { }
 
  //montando a estrutura do formulário
  formLogin = new FormGroup({
    login: new FormControl('', [Validators.required]),
    senha: new FormControl('', [Validators.required])
  });
 
  //acessando o formulário/campos na página HTML
  get form(): any {
    return this.formLogin.controls;
  }
 
  ngOnInit(): void {
    if(this.authHelper.isAuthenticated()){
      //redirecionamento..
      window.location.href = "/consultar-produtos";
    }
    else{
      this.exibirPagina = true;
    }
  }
 
  onSubmit(): void {
 
    this.mensagem_erro = '';
 
    this.httpClient.post(environment.apiUrl + "/login", this.formLogin.value,
      { responseType: 'text' })
      .subscribe(
        data => {
          //salvar o TOKEN na LOCAL STORAGE
          localStorage.setItem('access_token', data);
          //salvar o login do usuário na LOCAL STORAGE
          localStorage.setItem('login_usuario', this.formLogin.value.login);
 
          //limpar o formulário
          this.formLogin.reset();
          //redirecionamento
          window.location.href = "/consultar-produtos";
        },
        e => {
          this.mensagem_erro = e.error;
          console.log(e.error);
        }
      );
 
  }
 
}
 


