import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentServiceService {

  constructor(private httpService: HttpClient) { }

  private readonly BASE_URL = environment.url;

  public getAllData(): Observable<any> {
    return this.httpService.get(`${this.BASE_URL}/dapp`)
      .pipe(
        map(res => res),
        catchError(err => of(null))
      );
}
  public getDataByDate(date): Observable<any> {
    return this.httpService.get(`${this.BASE_URL}/dapp/${date}`)
      .pipe(
        map(res => res),
        catchError(err => of(null))
      );
}

  public addSlot(body): Observable<any> {
    return this.httpService.post(`${this.BASE_URL}/dapp/appointment/`, body)
    .pipe(
      map(res => res),
      catchError(err => of(null))
    );
}
}
