import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {StudentService} from "../../services/student.service";
import {AssingmentDto} from "../../dto/assingment-dto";
import {QuestionDto} from "../../dto/question-dto";
import {StudentMarksDto} from "../../dto/student-marks-dto";
import {StudentDto} from "../../dto/student-dto";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  username:string;
  asmntId:string;
  grade:string;
  studentdto: StudentDto=new StudentDto("S001");
  assingments: AssingmentDto[] = []
  questions: QuestionDto[] = []
  assignmentState=true
  questionState=false
  questionReviewState=false
  studentmarks:StudentMarksDto=new StudentMarksDto(1);

  constructor(private route:ActivatedRoute, private studentService:StudentService) {
  }

  ngOnInit(): void {
    this.stateManager("assignmentState")
    this.route.queryParamMap.subscribe((value) => {
        this.username = value.get('userName');

    })
    this.studentService.getStudentDetails(this.username).subscribe((resp)=>{
      this.studentdto = new StudentDto(resp.data.id, resp.data.name, resp.data.className,resp.data.teacher,
        resp.data.teacherId);


      this.studentService.getAllAssingments(this.studentdto.teacherId).subscribe((resp)=>{
        this.assingments=resp.data
      })
    })
  }

  viewQuestions(asmntId){
    this.stateManager('questionState')
    this.asmntId=asmntId;
    this.studentService.getAsmntQuestions(asmntId).subscribe((resp)=>{
      for (let i = 0; i< resp.data.length; i++){
        this.questions.push(new QuestionDto(asmntId, resp.data[i].questionPK.qno, resp.data[i].question, resp.data[i].answer))
      }
    })
    this.studentService.getOverallGrades(asmntId).subscribe((resp)=>{
      console.log(resp.data)
      for (let i = 0; i< resp.data.length; i++){
        if(resp.data[i].studentId==this.studentdto.id){
          this.grade=resp.data[i].grade
        }
      }
    })
  }

  AssingmentList(){
    this.questions = [];
    this.stateManager('assignmentState')

  }

  reviewQuestion(asmntId, qNo){
    this.stateManager('questionReviewState')
    let j=0;
    for (let i = 0; i< this.questions.length; i++){
      if(this.questions[i].asmntId==asmntId && this.questions[i].qNo==qNo){
        j=i;
        break
      }
    }
      this.studentService.getStudentMarks(asmntId,qNo,this.studentdto.id).subscribe((resp)=>{
        console.log(this.questions)
        console.log(resp.data)
          this.studentmarks=new StudentMarksDto(qNo, this.questions[j].question, resp.data.answer, resp.data.noOfAttempts, resp.data.result,
          this.questions[j].correctAnswer, resp.data.spentTime)
      })
  };


  back(){
    this.stateManager('questionState');

  }
  stateManager(state) {
    if (state == "questionState") {
      this.questionState = true;
      this.questionReviewState = false;
      this.assignmentState = false;
    } else if (state == "questionReviewState") {
      this.questionReviewState = true;
      this.questionState = false;
      this.assignmentState = false;
    } else if (state == "assignmentState") {
      this.assignmentState = true;
      this.questionState = false;
      this.questionReviewState = false;
    }
  }

}
