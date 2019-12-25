import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private genre:BehaviorSubject<any> =new BehaviorSubject<any>({});
  private genBooks:BehaviorSubject<any[]>=new BehaviorSubject<any[]>([]);
  private count:BehaviorSubject<any>=new BehaviorSubject<any>(1);
  private searchText:BehaviorSubject<any>=new BehaviorSubject<any>("");
 
  filterIdUrl:string="http://skunkworks.ignitesol.com:8000/books?id="
  filterLangUrl:string="http://skunkworks.ignitesol.com:8000/books?languages="
  filterTextUrl:string="http://skunkworks.ignitesol.com:8000/books?mime_type="
  filterTopicUrl:string="http://skunkworks.ignitesol.com:8000/books?topic="
  filterSearchUrl:string="http://skunkworks.ignitesol.com:8000/books?search="

  constructor(private http:HttpClient) { }

  setgenre(gen){
    this.genre.next(gen);
  }

  getgenre(){
    return this.genre;
  }

  setGenBooks(genBooks){
    this.genBooks.next(genBooks);
  }

  getGenBooks(){
    return this.genBooks;
  }

  getAllBooks(bookUrl):Observable<any>{
   
    return <Observable<any>> this.http.get(bookUrl);
  }

  filterId(idstring):Observable<any>{    
    console.log(this.filterIdUrl+idstring);
    return <Observable<any>> this.http.get(this.filterIdUrl+idstring);
  }

  filterLang(langstring):Observable<any>{
    console.log(this.filterLangUrl+langstring);
    return <Observable<any>> this.http.get(this.filterLangUrl+langstring);
  }

  filterText(text):Observable<any>{
    console.log(this.filterTextUrl+text);
    return <Observable<any>> this.http.get(this.filterTextUrl+text);
  }

  filterTopic(text):Observable<any>{
    console.log(this.filterTopicUrl+text);
    return <Observable<any>> this.http.get(this.filterTopicUrl+text);
  }

  filterSearch(text):Observable<any>{
    console.log(this.filterSearchUrl+text)
    return <Observable<any>> this.http.get(this.filterSearchUrl+text);
  }

  setCount(count){
    this.count.next(count);
  };

  getCount(){
    return this.count;
  }

  settext(text){
    this.searchText.next(text);
  }

  gettext(){
    return this.searchText;
  }
}
