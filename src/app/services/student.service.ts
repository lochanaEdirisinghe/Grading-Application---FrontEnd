import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResponseDto} from "../dto/response-dto";


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  url = "http://localhost:8080/api/v1/students"
  url2 = "http://localhost:8080/api/v1/assingments"

  getStudentDetails(username):Observable<ResponseDto>{
    return this.http.get<ResponseDto>(this.url+ "/"+username)
  }

  getAllAssingments(teacherId): Observable<ResponseDto>{
    return this.http.get<ResponseDto>(this.url2+"/"+teacherId)
  }
}