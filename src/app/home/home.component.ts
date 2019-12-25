import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  genArr=[{name:"Fiction",img:"assets/Fiction.svg"},
  {name:"Philosophy",img:"assets/Philosophy.svg"},
  {name:"Drama",img:"assets/Drama.svg"},
  {name:"History",img:"assets/History.svg"},
  {name:"Humour",img:"assets/Humour.svg"},
  {name:"Adventure",img:"assets/Adventure.svg"},
  {name:"Politics",img:"assets/Politics.svg"}]

  constructor(private service:AppService,private router:Router) { }

  ngOnInit() {
  }

  gotoGenre(genre){
    this.service.setgenre(genre);
    this.router.navigate(['genre'])
  }

}
