export interface CreateEventFromClient {
  APP_ID: string;
  visitorId: string;
  session: string;
  service: string;
  type: string;
  data: any;
  tag?: string;
  uaParser: any;
}
