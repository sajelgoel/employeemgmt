import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseURL = "https://jsonplaceholder.typicode.com/users";

@Injectable({
  providedIn: 'root'
})
export class EmployeeDetailsService {

  constructor(private httpClient: HttpClient) { }

  getEmployees(): Observable<any> {
    return this.httpClient.get(baseURL);
  }

  createEmployee(data): Observable<any> {
    return this.httpClient.post(baseURL, data);
  }

  deleteEmployee(id): Observable<any> {
    return this.httpClient.delete(`${baseURL}/${id}`);
  }


}
