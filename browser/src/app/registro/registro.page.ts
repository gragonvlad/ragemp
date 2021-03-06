import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IonInput, LoadingController, ToastController } from '@ionic/angular';
import { RegistroResultado } from '../../interfaces/login.interface';
import { LoginService } from '../services/login.service';
import { RagempService } from '../services/ragemp.service';

declare let mp: any;

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements AfterViewInit {

  @ViewChild('email') campoEmail: IonInput;
  public mostrarFormulario = true;

  public formGroup = new FormGroup({
    nome: new FormControl({
      value: '',
      disabled: true,
    }, {
      validators: [
        Validators.maxLength(40),
        Validators.required,
      ],
    }),
    email: new FormControl('', {
      validators: [
        Validators.maxLength(80),
        Validators.required,
        Validators.email,
      ],
    }),
    celular: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(14),
      ],
    }),
    senha: new FormControl('', {
      validators: [
        Validators.maxLength(40),
        Validators.required,
      ],
    }),
    senhaConfirma: new FormControl('', {
      validators: [
        Validators.maxLength(40),
        Validators.required,
      ],
    }),
  });

  constructor(public toastCtrl: ToastController,
              public loginService: LoginService,
              public loading: LoadingController,
              public ragemp: RagempService) {
    this.ragemp.playerName$.subscribe((playerName) => {
      this.formGroup.controls.nome.patchValue(playerName);
    });

    this.formGroup.controls.nome.patchValue('Mandrakke_Army');
  }

  async ngAfterViewInit() {
    this.campoEmail.setFocus();
  }

  public async registrar() {
    const loading = await this.loading.create();

    try {
      loading.present();

      const resultado: RegistroResultado = await this.loginService.registrar(this.formGroup.value);

      this.mostrarFormulario = false;

      if (resultado.jogador) {
        this.ragemp.jogadorLocal$.next(resultado.jogador);
      }

      const toast = await this.toastCtrl.create({
        message: 'Registrado com sucesso!',
        position: 'top',
        color: 'success',
        duration: 3000,

      });

      loading.dismiss();
      toast.present();

      mp.trigger('DesabilitarCursor');

      setTimeout(() => {
        this.ragemp.closeBrowser();
      }, 3000);
    } catch (err) {
      loading.dismiss();

      const toast = await this.toastCtrl.create({
        message: err.mensagem || 'Um erro ocorreu ao cadastrar',
        position: 'top',
        color: 'danger',
        duration: 3000
      });
      toast.present();
    }
  }

}
