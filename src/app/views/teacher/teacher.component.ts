import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TeacherService} from "../../services/teacher.service";
import {TeacherDto} from "../../dto/teacher-dto";
import {AssingmentDto} from "../../dto/assingment-dto";
import {QuestionDto} from "../../dto/question-dto";

@Component( {
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
} )
export class TeacherComponent implements OnInit {

  constructor(private route: ActivatedRoute, private teacherService: TeacherService) {
  }

  username;
  teacher: TeacherDto;
  assingments: AssingmentDto[] = []
  assignmentState = true;
  questionState = false;
  questions: QuestionDto[] = []
  asmntId;

  ngOnInit(): void {
    this.route.queryParamMap.subscribe( (value) => {
      this.username = value.get( 'userName' )
    } )

    this.teacherService.getTeacherDetails( this.username ).subscribe( (resp) => {
      this.teacher = new TeacherDto( resp.data.id, resp.data.name, resp.data.assignedClass )
      this.teacherService.getAllAssignment( this.teacher.id ).subscribe( (resp) => {
        this.assingments = resp.data;
      } )
    } )
  }

  AssingmentList() {
    this.assignmentState = true
    this.questionState = false
    this.questions = [];
  }

  viewQuestions(asmntId) {
    this.questionState = true
    this.assignmentState = false;
    this.asmntId=asmntId;
    this.teacherService.getAsmntQuestions( asmntId ).subscribe( (resp) => {
      for (let i = 0; i < resp.data.length; i++) {
        this.questions.push( new QuestionDto( asmntId, resp.data[i].questionPK.qno, resp.data[i].question, resp.data[i].answer ) )
      }
    } )

  }

  questionStatistics(asmntId, qNo) {

  }


}
