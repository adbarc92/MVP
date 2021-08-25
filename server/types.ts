export interface BookPost {
  name: string;
  textBody: string;
}

export interface GetOneParams {
  id: string;
}

export interface BookPut {
  name: string;
  sequenceNum: number;
  textBody: string;
}
