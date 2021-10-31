import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  tasks;
  constructor(private db: AngularFireDatabase) { }

  ngOnInit() {
    this.tasks = this.db.list('tasks').valueChanges();
  }

  remove(key) {
    firebase.database().ref('/tasks').child(key).remove();
  }

  checked(key) {
    firebase.database().ref('/tasks').child(key).update({
      checked : true
    });
  }

  unchecked(key) {
    firebase.database().ref('/tasks').child(key).update({
    checked : false
  });
  }
}
