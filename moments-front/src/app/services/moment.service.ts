import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Moment } from '../interfaces/Moment';
import { environment } from 'src/environments/environment';
import { Response } from '../interfaces/Response';

@Injectable({
  providedIn: 'root',
})
export class MomentService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}api/moments`;

  constructor(private httpClient: HttpClient) {}

  getMoments(): Observable<Response<Moment[]>> {
    return this.httpClient.get<Response<Moment[]>>(this.apiUrl).pipe(first());
  }

  getMoment(id: number): Observable<Response<Moment>> {
    return this.httpClient.get<Response<Moment>>(`${this.apiUrl}/${id}`);
  }

  createMoment(formData: FormData): Observable<FormData> {
    return this.httpClient.post<FormData>(this.apiUrl, formData).pipe(first());
  }

  removeMoment(id: number) {
    return this.httpClient.delete(`${this.apiUrl}/${id}`).pipe(first());
  }

  updateMoment(id: number, formData: FormData): Observable<FormData> {
    return this.httpClient
      .put<FormData>(`${this.apiUrl}/${id}`, formData)
      .pipe(first());
  }
}
