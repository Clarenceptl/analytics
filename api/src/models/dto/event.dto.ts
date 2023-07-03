export interface CreateEvent {
  appID: string;
  visitorId: string;
  service: string;
  type: string;
  tag?: string;
}
