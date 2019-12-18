import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
	currentDate: string;
	myTask = '';
	addTask: boolean;
	// tasks = [];

  constructor(public navCtrl: NavController, public afDB: AngularFireDatabase) {
			const date = new Date();
	   	const options = { weekday: 'long', month: 'long', day: 'numeric' };
	   	this.currentDate = date.toLocaleDateString('fr-FR', options);
			// this.getTasks();
  }

	showForm() {
	  this.addTask = !this.addTask;
	  this.myTask = '';
	}

	addTaskToFirebase() {
	  this.afDB.list('Tasks/').push({
	    text: this.myTask,
	    date: new Date().toISOString(),
	    checked: false
	  });
	  this.showForm();
	}

	// getTasks() {
	//   this.afDB.list('Tasks/').snapshotChanges(['child_added', 'child_removed']).subscribe(actions => {
	//     this.tasks = [];
	//     actions.forEach(action => {
	//       this.tasks.push({
	//         key: action.key,
	//         text: action.payload.exportVal().text,
	//         hour: action.payload.exportVal().date.substring(11, 16),
	//         checked: action.payload.exportVal().checked
	//       });
	//     });
	//   });
	// }
}
