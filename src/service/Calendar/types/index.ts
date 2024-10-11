export interface Event {
  id: string;
  title: string;
  date: string;
  allDay: boolean;
  start: string;
  end: string;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
}
