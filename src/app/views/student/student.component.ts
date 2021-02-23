import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {StudentService} from "../../services/student.service";
import {AssingmentDto} from "../../dto/assingment-dto";
import {QuestionDto} from "../../dto/question-dto";

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
  assingments: AssingmentDto[] = []
  questions: QuestionDto[] = []
  assignmentState=true
  questionState=false
  asmntId;

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
        this.assingments=resp.data
      })
    })
  }

  viewQuestions(asmntId){
    this.assignmentState=false;
    this.questionState=true
    this.asmntId=asmntId;
    this.studentService.getAsmntQuestions(asmntId).subscribe((resp)=>{
      for (let i = 0; i< resp.data.length; i++){
        this.questions.push(new QuestionDto(asmntId, resp.data[i].questionPK.qno, resp.data[i].question, resp.data[i].answer))
      }
    })
  }

  AssingmentList(){
    this.questions = [];
    this.assignmentState=true;
    this.questionState=false

  }

  reviewQuestion(asmntId){

  };

}
