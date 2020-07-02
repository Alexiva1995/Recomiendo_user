import { Component } from '@angular/core';
import { NgForm, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';
import { AuthService } from '../../providers/auth/auth.service';
import { UtilitiesService } from '../../providers/utilities/utilities.service';
import { NavController, AlertController } from '@ionic/angular';
import { CONSTANTES } from '../../providers/constantes';



@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  styleUrls: ['./signup.scss'],
})
export class SignupPage {

  public formGroup: FormGroup;
  submitted: boolean;
  constructor(
    private fb: FormBuilder,
    private utilities: UtilitiesService,
    private navCtrl: NavController,
    public auth: AuthService,
    private alertController: AlertController,
    private service: AuthService
  ) {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirm_password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  async onSignup(form: NgForm) {
    console.log(this.formGroup);  
    await this.utilities.displayLoading();
    let data = this.formGroup.value;
    try {
      // Iniciamos la consulta
      this.service.signUp(data).then((res: any) => {
        this.utilities.dismissLoading();
        this.utilities.displayToastButtonTime('Inscription réussie');
        this.navCtrl.navigateForward('/login')
      }, e => {
        //En caso de error
        console.log(e);
        
        this.utilities.dismissLoading();
        this.utilities.displayToastButtonTime(e.error.message ? e.error.message : CONSTANTES.MESSAGES.error);
      })

    }
    catch (e) {
      this.utilities.dismissLoading();
      this.utilities.displayToastButtonTime(e.error.message ? e.error.message : CONSTANTES.MESSAGES.error);
      console.error(e);
    }

  }

  goTo(url) {
    this.navCtrl.navigateForward(url)
  }

  get errorControl() {
    //getting para recibir la informacion del formulario
    return this.formGroup.controls;
  }
}
