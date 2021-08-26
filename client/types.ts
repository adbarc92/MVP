// export interface Node {
//   id: string;
//   createdAt: Date | string;
//   updatedAt: Date | string;
//   name: string;
//   description: string;
// }

// export interface Section {
//   id: string;
//   chapterId: string;
//   createdAt: Date | string;
//   updatedAt: Date | string;
//   name: string;
//   sequenceNum: number;
//   textBody: string;
// }

export interface Chapter {
  id: string;
  bookId: string;
  // sections: Section[];
  createdAt: Date | string;
  updatedAt: Date | string;
  name: string;
  sequenceNum: number;
  textBody: string;
}

export interface Book {
  id: string;
  chapters: Chapter[];
  createdAt: Date | string;
  updatedAt: Date | string;
  name: string;
  sequenceNum: number;
  textBody: string;
}
