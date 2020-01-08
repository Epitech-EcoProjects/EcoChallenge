import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';

@Component({
	selector: 'page-about',
	templateUrl: 'about.html'
})
export class AboutPage {
	currentDate: string;
	myTask = '';
	addTask: boolean;
	tasks = [];
	myTasks = [];
	key = '';
	xp = '';
	connected = false;
	itemRef: AngularFireObject<any>;

	constructor(public navCtrl: NavController, public afDB: AngularFireDatabase) {
		const date = new Date();
		const options = { weekday: 'long', month: 'long', day: 'numeric' };
		this.currentDate = date.toLocaleDateString('fr-FR', options);
		this.getTasks();
	}

	ngOnInit() {
		this.afDB.list('Users/').snapshotChanges().subscribe(actions => {
			this.user = [];
			actions.forEach(action => {
				if (action.payload.exportVal().email == "augustin.leconte@epitech.eu") {
					this.key = action.key;
					this.xp = action.payload.exportVal().xp;
					this.connected = true;
					this.getMyTasks();
				}
			});
		});
	}

	addTaskToUser(ev: any) {
		if (this.connected == true && this.key != '') {
			this.afDB.list('Users/' + this.key + '/tasks/').push({
				text: ev.text,
				date: new Date().toISOString(),
				checked: false,
				done: false,
				xp: 10,
				validate: false
			});
		}
	}

	showForm() {
		this.addTask = !this.addTask;
		this.myTask = '';
	}

	addTaskToFirebase() {
		this.afDB.list('Tasks/').push({
			text: this.myTask,
			date: new Date().toISOString(),
			checked: false,
			done: false,
			xp: 10,
			validate: false
		});
		this.showForm();
	}

	getMyTasks() {
		this.afDB.list('Users/' + this.key + '/tasks/').snapshotChanges(['child_added', 'child_removed']).subscribe(actions => {
			this.myTasks = [];
			actions.forEach(action => {
				this.myTasks.push({
					key: action.key,
					text: action.payload.exportVal().text,
					// hour: action.payload.exportVal().date.substring(11, 16),
					checked: action.payload.exportVal().checked,
					validate: action.payload.exportVal().validate,
					done: action.payload.exportVal().done,
					xp: action.payload.exportVal().xp
				});
			});
		});
	}

	getTasks() {
		this.afDB.list('Tasks/').snapshotChanges(['child_added', 'child_removed']).subscribe(actions => {
			this.tasks = [];
			actions.forEach(action => {
				this.tasks.push({
					key: action.key,
					text: action.payload.exportVal().text,
					// hour: action.payload.exportVal().date.substring(11, 16),
					checked: action.payload.exportVal().checked,
					validate: action.payload.exportVal().validate,
					done: action.payload.exportVal().done,
					xp: action.payload.exportVal().xp
				});
			});
		});
	}

	changeTaskCheckState(ev: any) {
		this.afDB.object('Tasks/' + ev.key + '/checked/').set(ev.checked);
	}

	deleteGlobalTask(task: any) {
		this.afDB.list('Tasks/').remove(task.key);
	}

	changeCheckState(ev: any) {
		this.afDB.object('Users/' + this.key + '/tasks/' + ev.key + '/checked/').set(true);
		this.afDB.object('Users/' + this.key+ '/xp').set(this.xp + ev.xp);
		this.afDB.list('Users/' + this.key + '/tasks/').remove(ev.key);
	}

	deleteTask(task: any) {
		this.afDB.list('Users/' + this.key + '/tasks/').remove(task.key);
	}
}
