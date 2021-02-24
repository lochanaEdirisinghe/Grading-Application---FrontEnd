import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {ResponseDto} from "../dto/response-dto";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient) { }

  url = "http://localhost:8080/api/v1/teachers/"
  url2 = "http://localhost:8080/api/v1/assingments/"

  getTeacherDetails(username):Observable<ResponseDto>{
    return this.http.get<ResponseDto>(this.url +username)
  }

  getAllAssignment(id):Observable<ResponseDto>{
    return this.http.get<ResponseDto>(this.url2+id)
  }

  getAsmntQuestions(asmntId): Observable<ResponseDto>{
    return this.http.get<ResponseDto>(this.url2+ "questions/"+ asmntId)
  }

  getQuestionStatics(asmntId, qNo): Observable<ResponseDto>{
    return this.http.get<ResponseDto>(this.url+ asmntId+"/"+qNo)
  }

  getOverallGrades(asmntId) : Observable<ResponseDto>{
    return this.http.get<ResponseDto>(this.url+"grades/"+asmntId)
  }
}
