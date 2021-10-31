import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import * as firebase from 'firebase/app';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id;
  text;
  title;

  constructor(  private location: Location, private route: ActivatedRoute ) {
    this.route.params.subscribe(params => {
        this.id = params['id'];  
      });
  }

  ngOnInit() {
    firebase.database().ref('/tasks').child(this.id).once('value', snapshot => {
      this.title = snapshot.child("title").val();
      this.text = snapshot.child("text").val();
    });
  }

  update() {
    firebase.database().ref('/tasks').child(this.id).update({
      title: this.title,
      text: this.text
    });
    this.location.back();
  }

  goBack(): void {
    this.location.back();
  }

}
