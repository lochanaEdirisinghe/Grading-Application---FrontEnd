import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResponseDto} from "../dto/response-dto";


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  url = "http://localhost:8080/api/v1/students/"
  url2 = "http://localhost:8080/api/v1/assignments/"

  getStudentDetails(username):Observable<ResponseDto>{
    return this.http.get<ResponseDto>(this.url +username)
  }

  getAllAssingments(teacherId): Observable<ResponseDto>{
    return this.http.get<ResponseDto>(this.url2 + teacherId)
  }

  getAsmntQuestions(asmntId): Observable<ResponseDto>{
    return this.http.get<ResponseDto>(this.url2+ "questions/"+ asmntId)
  }

  getStudentMarks(asmntId, qNo, id) : Observable<ResponseDto>{
    return this.http.get<ResponseDto>(this.url+ id+"/"+asmntId+"/"+qNo)
  }

  getOverallGrades(asmntId) : Observable<ResponseDto>{
    return this.http.get<ResponseDto>(this.url2+"grades/"+asmntId)
  }
}
