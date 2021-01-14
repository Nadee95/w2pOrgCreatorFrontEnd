import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  arr: any=[];
  constructor() { 
    this.arr =["a","b","c","d","e","f","g","h","i"];
  }

  ngOnInit(): void {
  }

}
