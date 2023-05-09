import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, tap, throwError } from "rxjs";
import { IProduct } from "./product";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    url: string = 'api/products/products.json' 

    constructor(private http: HttpClient) {}

    getProducts() : Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.url).pipe(
          tap(data => console.log('All', JSON.stringify(data))),
          catchError(this.handleError)
        );
    }

    private handleError(err: HttpErrorResponse) {
      let errorMessage = '';
      if(err.error instanceof(ErrorEvent)) {
        //A client-side or network error occurred. Handle it accordingly
        errorMessage = `An error occured: ${err.error.message}`;
      } else {
        // The backend returned an unsuccessful response
        // The response body may contain clues as to what went wrong
        errorMessage = `Server returned code: ${err.status}. error message is: ${err.message}`;
      }
      console.log(errorMessage);
      return throwError(() => errorMessage);
    }
}