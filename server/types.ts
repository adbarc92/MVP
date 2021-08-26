export interface BookPost {
  name: string;
  textBody: string;
}

export interface GetOneParams {
  id: string;
}

export interface getChapterParams {
  bookId: string;
}

export interface BookPut {
  name: string;
  sequenceNum: number;
  textBody: string;
}

export interface ChapterPost {
  name: string;
  textBody: string;
  bookId: string;
}

export interface ChapterPut {
  name: string;
  textBody: string;
  bookId: string;
  sequenceNum: string;
}
