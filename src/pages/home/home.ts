import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
  }

	async LoginAlert() {
	 const alert = await this.alertController.create({
		 header: 'Alert',
		 subHeader: 'Subtitle',
		 message: 'Alert',
		 buttons: ['OK']
	 });

	 await alert.present();
 }

}
