export class StatisticsDto {
  constructor(public avgTime?:String, public rightCount?:number,public wrongCount?:number,
              public partialCount?:number, public studentMarks?:any){

  }
}
