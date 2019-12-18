import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	 name = '';
	 email = '';
	 age = '';
	 password = '';

  constructor(public navCtrl: NavController, public afDB: AngularFireDatabase) {
  }

	// async LoginAlert() {
	//  const alert = await this.alertController.create({
	// 	 header: 'Alert',
	// 	 subHeader: 'Subtitle',
	// 	 message: 'Alert',
	// 	 buttons: ['OK']
	//  });
 //
	//  await alert.present();
 // }

 resetForm() {
	 this.name = '';
	 this.email = '';
	 this.age = '';
	 this.password = '';
 }

 addUserToFirebase() {
	 if (this.name != "" && this.email != "" && this.age != "" && this.password != '') {
		 this.afDB.list('Users/').push({
			 name: this.name,
			 email: this.email,
			 age: this.age,
			 password: this.password,
			 date: new Date().toISOString()
		 });
		 this.resetForm();
 	}
 }

}
