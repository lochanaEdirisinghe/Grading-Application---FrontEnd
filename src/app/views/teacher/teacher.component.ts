import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TeacherService} from "../../services/teacher.service";
import {TeacherDto} from "../../dto/teacher-dto";
import {AssingmentDto} from "../../dto/assingment-dto";
import {QuestionDto} from "../../dto/question-dto";
import {StudentMarksDto2} from "../../dto/student-marks-dto2";
import {StatisticsDto} from "../../dto/statistics-dto";

@Component( {
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
} )
export class TeacherComponent implements OnInit {

  constructor(private route: ActivatedRoute, private teacherService: TeacherService) {}

  username: string;
  asmntId: string;
  qNo: number;
  statistics: StatisticsDto=new StatisticsDto("00:00:00");
  teacher: TeacherDto=new TeacherDto("T002");
  assignmentState:boolean = true;
  questionState:boolean = false;
  questionstatistics:boolean=false;
  gradeDetails
  questions: QuestionDto[] = []
  assingments: AssingmentDto[] = []
  studentMarks:StudentMarksDto2[]=[];


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
    this.stateManager("assignmentState")
    this.questions = [];
  }

  viewQuestions(asmntId) {
    this.stateManager("questionState")
    this.asmntId=asmntId;
    this.teacherService.getAsmntQuestions( asmntId ).subscribe( (resp) => {
      for (let i = 0; i < resp.data.length; i++) {
        this.questions.push( new QuestionDto( asmntId, resp.data[i].questionPK.qno, resp.data[i].question, resp.data[i].answer ) )
      }
    })
    this.teacherService.getOverallGrades(asmntId).subscribe((resp)=>{
      this.gradeDetails=resp.data;
    })
  }
  questionStatistics(asmntId, qNo) {
    this.stateManager("questionstatistics")
    this.qNo=qNo;
      this.teacherService.getQuestionStatics(asmntId, qNo).subscribe((resp)=>{
        this.statistics=new StatisticsDto(resp.data.avgTime, resp.data.rightCount, resp.data.wrongCount, resp.data.partialCount)
        this.studentMarks=resp.data.studentMarks
      })
  }

  stateManager(state){
    if(state=="questionState"){
      this.questionState=true;
      this.questionstatistics=false;
      this.assignmentState = false;
    }else if(state=="questionstatistics"){
      this.questionstatistics=true;
      this.questionState=false;
      this.assignmentState = false;
    }else if(state=="assignmentState"){
      this.assignmentState = true;
      this.questionState=false;
      this.questionstatistics=false;
    }
  }

  back(){
    this.stateManager('questionState')
  }


}
