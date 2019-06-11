import { Component } from '@angular/core';
import { NavController, ModalController} from '@ionic/angular';
import {ModalPage} from '../Employee/modal/modal.page';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor( private modalController: ModalController) { }
  // constructor( ) { }

 
  async openModal()
  {
    const modal = await this.modalController.create({
      component: ModalPage

    });

    await modal.present();
  }

}
