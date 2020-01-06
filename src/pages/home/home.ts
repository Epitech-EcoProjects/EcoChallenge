import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// import { Storage } from '@ionic/storage';

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
	 user = [];
	 connected = false;
	 login = true;

  constructor(public navCtrl: NavController, public afDB: AngularFireDatabase/*, private storage: Storage*/) {
  }

 resetForm() {
	 this.name = '';
	 this.email = '';
	 this.age = '';
	 this.password = '';
 }

 ngOnInit() {
	 this.afDB.list('Users/').snapshotChanges().subscribe(actions => {
		 this.user = [];
		 actions.forEach(action => {
			 if (action.payload.exportVal().email == "augustin.leconte@epitech.eu") {
			 this.user.push({
				 key: action.key,
				 email: action.payload.exportVal().email,
				 age: action.payload.exportVal().age,
				 name: action.payload.exportVal().name,
				 password: action.payload.exportVal().password
			 });
			 this.connected = true;
			 // console.log(this.user);
			 // break;
		 	}
		 });
	 });
 }

	logOut() {
		this.connected = false;
		this.user = [];
	}

 addUserToFirebase() {
	 if (this.name != "" && this.email != "" && this.age != "" && this.password != '') {
			this.afDB.list('Users/').push({
			 name: this.name,
			 email: this.email,
			 age: this.age,
			 password: this.password,
			 signInDate: new Date().toISOString()
		 });
		 this.user.push({
			 name: this.name,
			 email: this.email,
			 age: this.age,
			 password: this.password,
			 signInDate: new Date().toISOString()
		 });
		 this.connected = true;
		 this.resetForm();
 	}
 }

checkLogin() {
	if (this.email != "" && this.password != '') {
		this.afDB.list('Users/').snapshotChanges().subscribe(actions => {
			this.user = [];
			actions.forEach(action => {
				if (action.payload.exportVal().email == this.email &&
				action.payload.exportVal().password == this.password) {
				this.user.push({
					key: action.key,
					email: action.payload.exportVal().email,
					age: action.payload.exportVal().age,
					name: action.payload.exportVal().name,
					password: action.payload.exportVal().password
				});
				this.connected = true;
				this.resetForm();
			 }
			});
		});
 }
}

 changeFormGoal(value) {
	 this.login = value;
 }

}
