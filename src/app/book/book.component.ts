import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  books: any;
  constructor(private http: HttpClient, private router: Router) { }
  
  logout() {
    localStorage.removeItem('jwtToken');
    this.router.navigate(['login']);
  }
  ngOnInit() {
    console.log("localStorage.getItem('jwtToken')",localStorage.getItem('jwtToken'));
    
    if(!localStorage.getItem('jwtToken'))
    {
      this.router.navigate(['login']);
    }
    
    
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
    this.http.get('/api/book', httpOptions).subscribe(data => {
      console.log('data',data);
      this.books = data;
      console.log(this.books);
    }, err => {
      console.log('err',err);
      if(err.status === 401) {
        this.router.navigate(['login']);
      }
    });
  }

}
