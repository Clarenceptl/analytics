export interface CreateEventFromClient {
  APP_ID: string;
  visitorId: string;
  session?: string;
  service: string;
  type: string;
  data: any;
  tag?: string;
  uaParser: any;
}

export interface CreateEventFromBack {
  APP_ID: string;
  APP_SECRET: string;
  service: string;
  type: string;
  data: any;
}
