import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { md5 } from './md5';
import { ToastController, LoadingController, PopoverController } from '@ionic/angular';
// import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { CONSTANTES } from '../constantes';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {


  loading: any;
  isLoadingPresent: boolean = false;
  static objectParam: any;

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private popoverCtrl: PopoverController,
    // private nativeStorage: NativeStorage
  ) {
  }

  /**
   * Método para mostrar un mensaje en pantalla
   * @param text Mensaje del Toast
   * @param time Tiempo en Pantalla
   * @param position Posición UtilitiesProvider.POS_TOP - UtilitiesProvider.POS_MIDDLE - UtilitiesProvider.POS_BOTTOM
   */

  async displayToast(text, time?, position?: 'top' | 'middle' | 'bottom') {
    let t = 5000;
    let pos: 'top' | 'middle' | 'bottom' = 'bottom';
    if (time) {
      t = time;
    }
    if (position) {
      pos = position;
    }
    const toast = await this.toastCtrl.create({
      message: text,
      duration: t,
      cssClass: "toastMid",
      position: pos
    });

    toast.present();
  }

  /**
   * Método para mostrar un mensaje en pantalla con botón
   * @param text Mensaje del Toast
   * @param buttonText Texto del botón
   * @param position Posición UtilitiesProvider.POS_TOP - UtilitiesProvider.POS_MIDDLE - UtilitiesProvider.POS_BOTTOM
   */
  async displayToastButton(text, buttonText?: string, position?: 'top' | 'middle' | 'bottom') {
    let btnTxt = 'OK';
    let pos: 'top' | 'middle' | 'bottom' = 'bottom';
    if (buttonText) {
      btnTxt = buttonText;
    }
    if (position) {
      pos = position;
    }
    const toast = await this.toastCtrl.create({
      message: text,
      /* showCloseButton: true, */
     /*  closeButtonText: btnTxt, */
      cssClass: "toastMid",
      position: pos,
    });

    toast.present();
  }


  /**
   * Método para mostrar un mensaje en pantalla con botón y tiempo
   * @param text Mensaje del Toast
   * @param time Tiempo en Pantalla. Default: 5000ms
   * @param buttonText Texto del botón. Default: 'OK'
   * @param position Posición 'top' | 'middle' | 'bottom'. Default: 'bottom'
   */
  async displayToastButtonTime(text: string, time?: number, buttonText?: string, position?: 'top' | 'middle' | 'bottom') {
    let btnTxt = 'OK';
    let pos: 'top' | 'middle' | 'bottom' = 'bottom';
    let t = 5000;
    if (buttonText) {
      btnTxt = buttonText;
    }
    if (position) {
      pos = position;
    }
    if (time) {
      t = time;
    }
    const toast = await this.toastCtrl.create({
      message: text,
      /* showCloseButton: true, */
      duration: t,
     /*  closeButtonText: btnTxt, */
      cssClass: "toastMid",
      position: pos,
    });

    toast.present();
  }

  /**
   *  Método para obtener un codigo random
   * @param size Tamaño en caracteres del código
   */
  getRandomCode(size: number) {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < size; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  /**
   * Método para mostrar un mensaje de error comun.
   */
  showToastCommonError() {
    this.displayToast('Ups... Ha ocurrido un error, por favor conctáctenos', 5000, 'top');
  }

  /**
   * Método par desplegar el modal de carga
   * @param message 'Mensaje a mostrar en el modal de carga'
   * @param duration 'Duración máxima del modal de carga'
   */
  async displayLoading(message?: string, duration?: number) {
    try {
     /*  this.dismissLoading(); */
      this.loading = await this.loadingCtrl.create({
        message: message ? message : 'Chargement des données'
      });
      await this.loading.present();
      this.isLoadingPresent = true;
    } catch (error) {
      console.error(error);
    }

  }

  /**
   * Metodo para ocultar el modal de carga
   */
  async dismissLoading() {
    try {
      await this.loading.dismiss();
      this.isLoadingPresent = false;
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * Metodo para abrir el modal de notificaciones
   

  async showPopUpNotifications() {
    const popover = await this.popoverCtrl.create({
      component: NotificacionesPage,
      cssClass: 'pop-component'
    });
    return await popover.present();
  }*/

  /**
   * Metodo para convertir todos los inicios de palabra de una oracion a mayuscula
   * @param word Oracion
   */
  public static toCapitalString(word: string) {
    if (!word) return word;
    return word.replace(/(^|\s)([a-z])/g, function (m, p1, p2) { return p1 + p2.toUpperCase(); })
  }

  /**
   * Metodo para convertir texto a MD5
   * @param word Texto
   */
  public static stringToMD5(word: string) {
    return md5(word);
  }

  /**
   * Metodo para asignar parametro (Este metodo se utiliza para enviar parametros de una pagina a otra)
   * @param object Parametro
   */
  public static setOjectParam(object: any) {
    this.objectParam = object;
  }

  /**
   * Metodo para obtener parametro (Este metodo se utiliza para recibir parametros de una pagina a otra)
   * @param object Parametro
   */
  public static getOjectParam(): any {
    return this.objectParam;
  }

  /**
   * Metodo para devolver los tipos de usuario
   */
  public static isUserAdmin(): boolean {
    return true;
  }

  /**
   * Método para almacenar en el Native Storage un objeto
   * @param key Clave
   * @param object Objeto
   */
  // storageSetItem(key: string, object: any) {
  //   return this.nativeStorage.setItem(key, object);
  // }

  /**
   * Método para obtener un objeto del Native Storage
   * @param key 
   */
  // storageGetItem(key: string) {
  //   return this.nativeStorage.getItem(key);
  // }

  /**
   * Método para eliminar un objeto del Native Storage
   * @param key 
   */
  // storageRemove(key: string) {
  //   return this.nativeStorage.remove(key);
  // }

  /**
   * Método para obtener todas las keys almacenadas en el Native Storage
   */
  // storageKeys() {
  //   return this.nativeStorage.keys();
  // }

  /**
   * Método para eliminar todas las keys almacenadas en el Native Storage
   */
  // storageClear() {
  //   return this.nativeStorage.clear();

  // }


}

export function getHeaders(type?: 'json' | 'formData') {
  switch (type) {
    case "json":
      return {
        headers: new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          "Authorization": "Bearer " + localStorage.getItem(CONSTANTES.LOCAL_STORAGE.token)
        })
      }
    case "formData":
      return {
        headers: new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          "Authorization": "Bearer " + localStorage.getItem(CONSTANTES.LOCAL_STORAGE.token)
        })

      }
    default:
      return {
        headers: new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          "Authorization": "Bearer " + localStorage.getItem(CONSTANTES.LOCAL_STORAGE.token)
        })
      }
  }
}
export function getHeaderNoAuth(){
  return {
    headers: new HttpHeaders({ 
      'Accept': 'application/json',
      'Content-Type': 'application/json',
     })
  };
}

export function getHeaderAuth(){
  return {
    headers: new HttpHeaders({ 
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem(CONSTANTES.LOCAL_STORAGE.token)
     })
  };
}


