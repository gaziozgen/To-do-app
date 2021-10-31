import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(
    private location: Location,
    private db: AngularFireDatabase
  ) { }

  newTitle;
  newText;
  id;
  checked = false;

  add(){
    firebase.database().ref('/tasks').push({
      text : this.newText,
      title : this.newTitle,
      checked : this.checked
    }).then((snap) => {
      firebase.database().ref('/tasks').child(snap.key).update({
        key : snap.key
      })
    })
    this.location.back();
  }

  ngOnInit() {
  }

  goBack(): void {
    this.location.back();
  }

}
