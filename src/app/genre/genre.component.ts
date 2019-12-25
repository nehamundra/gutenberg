import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {

  genName: string;
  searchText: string;
  genBooks: any[] = [];
  filterIdBooks: any[] = [];
  genreFinalArr: any[] = [];
  count: number = 1;
  constructor(private service: AppService, private router:Router) { }

  ngOnInit() {
    this.service.getgenre().subscribe(res => {
      let genres = res;
      this.genName = genres.name;
    })

    this.service.getGenBooks().subscribe(res => {
      this.genBooks = res;
      this.genreFinalArr = this.genBooks;
    })
  }

  gotohome(){
    this.router.navigateByUrl('home')
    this.count=1;
    this.service.setCount(this.count);
  }

  onScroll() {
    console.log("scrolled!");
    this.count += 1;
    this.service.setCount(this.count);
  }

  openBook(book) {
    let opened = false;
    if (book.formats['text/html; charset=utf-8']) {
      if (book.formats['text/html; charset=utf-8'].includes('.htm')) {
        opened = true;
        window.open(book.formats['text/html; charset=utf-8'], '_blank');
      }
    } if (opened == false) {
      if (book.formats['application/pdf']) {
        if (book.formats['application/pdf'].includes('.pdf')) {
          window.open(book.formats['application/pdf'], '_blank');
        }
      }
    }if (opened == false) {
      if (book.formats['text/plain; charset=utf-8']) {
        if (book.formats['text/plain; charset=utf-8'].includes('.txt')) {
          window.open(book.formats['text/plain; charset=utf-8'], '_blank');
        }
      }
    }

  }

  filter() {

    if (this.searchText) {
      this.service.settext(this.searchText);
    } else {
      this.genreFinalArr = this.genBooks;
    }

  }

  

  loadFinalArr(filterarr) {
    this.genreFinalArr = [];
    filterarr.forEach(ele => {
      let found = false;

      this.genBooks.forEach(ele1 => {
        if (ele1.id == ele.id) {
          found = true;
        }
      })

      if (found) {
        this.genreFinalArr.push(ele);
      }
    })

    console.log(this.genreFinalArr);

  }

}
