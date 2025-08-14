export interface Instructor {
  _id: string;
  name: string;
  email: string;
}

export interface ICourse {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  price: string;
  instructor: Instructor;
  students: string[]; // assuming array of student IDs
  lessons: string[]; // assuming array of lesson IDs
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}
