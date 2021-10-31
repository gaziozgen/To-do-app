import { Component, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import * as firebase from 'firebase/app';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  title;
  text;
  id;

  constructor(  private location: Location, private route: ActivatedRoute ) {
    this.route.params.subscribe(params => {
        this.id = params['id'];  
      });
  }

  ngOnInit() {
    this.detail()
  }

  detail() {
    firebase.database().ref('/tasks').child(this.id).once('value', snapshot => {
      this.title = snapshot.child("title").val();
      this.text = snapshot.child("text").val();
    });
   }

  goBack(): void {
    this.location.back();
  }
}
