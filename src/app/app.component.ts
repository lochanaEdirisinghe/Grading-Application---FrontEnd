import { Component } from '@angular/core';
import {TokenStorageService} from "./services/token-storage.service";
import {SharedServiceService} from "./services/shared-service.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gradingApplication';

}
