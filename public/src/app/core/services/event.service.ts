import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AuthService } from "app/core/services/auth.service";
import { BehaviorSubject } from "rxjs/Rx";
import { IGetEventsResponse, ICalendarEvent } from "models/api-contracts/event";
import { environment } from "environments/environment";
import { Observable } from "rxjs/Observable";

@Injectable()
export class EventService {

  constructor(
    private auth: AuthService, 
    private http: HttpClient,
  ) {
  }

  public getEvents(): Observable<ICalendarEvent[]> {
    return this.http.get(environment.apiBaseUrl +'/api/events').take(1).map((resp: IGetEventsResponse) => {
      return resp._embedded.events;
    });
  }
}