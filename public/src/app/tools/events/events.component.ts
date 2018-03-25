import { Component, OnInit } from '@angular/core';
import { EventService } from "app/core";
import { ICalendarEvent } from "models/api-contracts/event";

@Component({
  selector: 'ogk-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  public events: ICalendarEvent[] = [];
  public isInitialized: boolean;

  constructor(
     private eventService: EventService,
  ) { }

  ngOnInit() {
    this.eventService.getEvents().subscribe((events: ICalendarEvent[]) => {
      this.isInitialized = true;
      this.events = events;
    });
  }

}
