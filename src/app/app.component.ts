import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'igniteSol';
  allBooks: any[] = [];
  genreBooks: any[] = [];
  genre: any;
  nextUrl: string = "http://skunkworks.ignitesol.com:8000/books/";

  constructor(private service: AppService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    // this.getBooksList();

    this.service.getgenre().subscribe(res => {
      let genres = res;
      this.genre = genres.name;
      this.filtergenre();
    })

    this.service.getCount().subscribe(res => {
      if (res == 1) {
        this.nextUrl = "http://skunkworks.ignitesol.com:8000/books/";
        this.allBooks = [];
        this.getBooksList();
        this.filtergenre('yes');
      }

      else {
        this.getBooksList();
        this.filtergenre();
      }
    })

    this.service.gettext().subscribe(res => {
      if (res && res != "") {
        this.filtertText(res);
      }
    })

  }

  getBooksList() {
    this.spinner.show();
    this.service.getAllBooks(this.nextUrl).subscribe(res => {
      this.spinner.hide();
      let genres = res
      this.nextUrl = genres.next;
      genres.results.forEach(ele => {
        this.allBooks.push(ele);
      })
      console.log(this.allBooks);

    }, err => {
      console.log(err);
    })
  }

  filtergenre(clear = 'no') {
    if (this.genre) {
      if (clear == 'yes') {
        this.genreBooks = [];
      }
      this.allBooks.forEach(ele => {
        let done = false;

        ele.bookshelves.forEach(ele1 => {
          if (ele1.toLowerCase().includes(this.genre.toLowerCase())) {
            if (done == false) {
              this.genreBooks.push(ele);
              done = true;
            }

          }
        })

        if (done == false) {
          ele.subjects.forEach(ele2 => {
            if (ele2.toLowerCase().includes(this.genre.toLowerCase())) {
              if (done == false) {
                this.genreBooks.push(ele);
                done = true;
              }
            }
          })
        }

      })

      this.service.setGenBooks(this.genreBooks);
    }
  }

  filtertText(text) {
    let hasnum = this.hasNumbers(text)
    let hasLang = this.haslang(text);
    let hastext = this.hastext(text);

    var done = false;
    this.allBooks = [];
    if (hasnum) {
      let numstr = text.split(' ').join(',').split(',').join(',');

      this.spinner.show();
      this.service.filterId(numstr).subscribe(res => {
        this.spinner.hide();
        let genres = res
        this.nextUrl = genres.next;
        genres.results.forEach(ele => {
          this.allBooks.push(ele);
        })
        done = true;
        this.filtergenre('yes');
      })
    }

    if (hasLang.length > 0) {
      let langStr = hasLang.join(",");
      this.spinner.show();
      this.service.filterLang(langStr).subscribe(res => {
        this.spinner.hide();
        let genres = res;
        this.nextUrl = genres.next;
        genres.results.forEach(ele => {
          if (this.allBooks.includes(ele)) { } else {
            this.allBooks.push(ele);
          }
        })
        done = true;
        this.filtergenre('yes');
      })
    }

    if (hastext != null) {
      this.spinner.show();
      this.service.filterText(hastext).subscribe(res => {
        this.spinner.hide();
        let genres = res;
        this.nextUrl = genres.next;
        genres.results.forEach(ele => {
          if (this.allBooks.includes(ele)) { } else {
            this.allBooks.push(ele);
          }
        })
        done = true;
        this.filtergenre('yes');
      })
    }

    if (done == false) {
      let str1 = text.split(' ').join('%20');
      this.spinner.show();
      this.service.filterSearch(str1).subscribe(res => {
        this.spinner.hide();
        console.log(res);

        let genres = res;
        this.nextUrl = genres.next;
        genres.results.forEach(ele => {
          if (this.allBooks.includes(ele)) { } else {
            this.allBooks.push(ele);
          }
        })
        this.filtergenre('yes');
      })

      this.spinner.show();
      this.service.filterTopic(str1).subscribe(res => {
        this.spinner.hide();
        let genres = res;
        this.nextUrl = genres.next;
        genres.results.forEach(ele => {
          if (this.allBooks.includes(ele)) { } else {
            this.allBooks.push(ele);
          }
        })
        this.filtergenre('yes');
      })
    }


  }

  hasNumbers(t) {
    var regex = /\d/g;
    return regex.test(t);
  }

  haslang(t) {
    let langArr = ['en', 'fr', 'fi'];
    let foundArr = []
    langArr.forEach(ele => {
      if (t.toLowerCase().includes(ele)) {
        foundArr.push(ele);
      }
    })
    return foundArr;
  }

  hastext(t) {
    let textArr = ['text', 'html'];
    let foundArr = [];
    textArr.forEach(ele => {
      if (t.toLowerCase().includes(ele)) {
        foundArr.push(ele)
      }
    })
    if (foundArr.length > 0) {
      return foundArr.join("%20");
    } else {
      return null;
    }

  }

}
