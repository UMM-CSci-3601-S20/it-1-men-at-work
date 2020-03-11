export interface Note {
  _id: string;
  owner: string;
  body: string;
  addDate: Date;
  expirationDate: Date;
  tag: 'office hours' | 'personal' | 'class time';

}

