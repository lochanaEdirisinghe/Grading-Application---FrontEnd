export class StudentMarksDto {
  constructor(public qNo?:number, public question?:String,
              public studentAns?:String, public noOfAttempts?:number,public result?:String,
              public correctAnswer?:String, public spentTime?:String) {
  }
}
