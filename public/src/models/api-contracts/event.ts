export interface IGetEventsResponse {
  _embedded: {
    events: ICalendarEvent[]
  }
}

export interface ICalendarEvent {
  id: string;
  type: string;
  title: string;
  status: string;
  date: Date;
  dateUntil: Date;
  location: string;
  description: string;
  hidden: boolean;
  createdBy: string;
  attendees: string[];
}

export interface ICalendarEventSpecification {
  type: string;
  title: string;
  date: Date;
  dateUntil: Date;
  location: string;
  description: string;
  hidden: boolean;
}