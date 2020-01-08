import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

	friendId = '';
	itemRef: AngularFireObject<any>;
	user = [];
	connected = false;
	friendList = [];
	list = [];
	listSize = 0;
	i = 0;

  constructor(public navCtrl: NavController, public afDB: AngularFireDatabase) {
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
			 this.list.push({friends: action.payload.exportVal().friends});
			 // this.listSize = action.payload.exportVal().friends.length;
			 this.connected = true;
			 this.itemRef = this.afDB.object('Users/' + action.key);
			}
		 });
	 });
	}

	addFriend() {
 	 if (this.connected == true && this.user != [] && this.friendId != "") {
		 for (this.i = 0; this.list[0][this.i]; this.i++)
		 	this.friendList.push(this.list[0][this.i]);
			this.friendList.push(this.friendId);
		 	this.itemRef.update({  friends: this.friendList });
			this.friendId = "";
 		 }
  	}

}
