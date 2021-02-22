import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {StudentService} from "../../services/student.service";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  username;
  id;
  name;
  class;
  teacher;
  teacherId;

  constructor(private route:ActivatedRoute, private studentService:StudentService) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((value) => {
        this.username = value.get('userName');

    })
    this.studentService.getStudentDetails(this.username).subscribe((resp)=>{
      this.id=resp.data.id
      this.name=resp.data.name
      this.class=resp.data.className
      this.teacher=resp.data.teacher
      this.teacherId=resp.data.teacherId

      this.studentService.getAllAssingments(this.teacherId).subscribe((resp)=>{
        console.log(resp.data)
      })
    })
  }

}
