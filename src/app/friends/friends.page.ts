import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';

@Component({
	selector: 'app-friends',
	templateUrl: './friends.page.html',
	styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit {

	friendId = '';
	itemRef: AngularFireObject<any>;
	user = [];
	connected = false;
	friendList = [];
	listSize = 0;
	i = 0;
	key = "";

	constructor(public afDB: AngularFireDatabase) {
	}

	ngOnInit() {
		this.afDB.list('Users/').snapshotChanges().subscribe(actions => {
			this.user = [];
			actions.forEach(action => {
				if (action.payload.exportVal().email == "augustin.leconte@epitech.eu") {
					this.key = action.key;
					this.user.push({
						key: action.key,
						email: action.payload.exportVal().email,
						age: action.payload.exportVal().age,
						name: action.payload.exportVal().name,
						password: action.payload.exportVal().password
					});
					this.getFriends();
					this.connected = true;
					console.log(this.friendList);
				}
			});
		});
	}

	addFriend() {
		if (this.connected == true && this.user != [] && this.friendId != "") {
			this.afDB.list('Users/' + this.key + '/friends/').push({
				id: this.friendId
			});
		}
	}

	getFriends() {
		console.log(this.key);
		this.afDB.list('Users/' + this.key + '/friends/').snapshotChanges(['child_added', 'child_removed']).subscribe(actions => {
			this.friendList = [];
			actions.forEach(action => {
				this.friendList.push({
					id: action.id
				});
			});
		});
	}

}
