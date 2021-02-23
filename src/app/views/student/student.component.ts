import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {StudentService} from "../../services/student.service";
import {AssingmentDto} from "../../dto/assingment-dto";
import {QuestionDto} from "../../dto/question-dto";
import {StudentMarksDto} from "../../dto/student-marks-dto";

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
  questionReviewState=false
  asmntId;
  studentmarks:StudentMarksDto;

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
    this.questionReviewState=false
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
    this.questionReviewState=false

  }

  reviewQuestion(asmntId, qNo){
    this.questionReviewState=true
    this.assignmentState=false;
    this.questionState=false
    let j=0;
    for (let i = 0; i< this.questions.length; i++){
      if(this.questions[i].asmntId==asmntId){
        j=i;
        break
      }
    }
      this.studentService.getStudentMarks(asmntId,qNo,this.id).subscribe((resp)=>{
        console.log(qNo)
          this.studentmarks=new StudentMarksDto(qNo, this.questions[j].question, resp.data.answer, resp.data.noOfAttempts, resp.data.result,
          this.questions[j].correctAnswer, resp.data.spentTime)
      })
  };

}
