import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private students: Student[] = [
    { id: 1, name: 'Sanika', age: 22, email: 'sanika@example.com', course: 'Computer Science', city: 'Mumbai' },
    { id: 2, name: 'Rahul', age: 24, email: 'rahul@example.com', course: 'Information Technology', city: 'Pune' },
    { id: 3, name: 'Priya', age: 21, email: 'priya@example.com', course: 'Electrical Engineering', city: 'Delhi' },
    { id: 4, name: 'Amit', age: 23, email: 'amit@example.com', course: 'Mechanical', city: 'Bangalore' },
    { id: 5, name: 'Neha', age: 22, email: 'neha@example.com', course: 'Finance', city: 'Chennai' }
  ];

  private studentsSubject = new BehaviorSubject<Student[]>([...this.students]);

  constructor() { }

  getStudents(): Observable<Student[]> {
    return this.studentsSubject.asObservable();
  }

  getStudentById(id: number): Student | undefined {
    return this.students.find(s => s.id === id);
  }

  addStudent(student: Student): void {
    const maxId = this.students.length > 0 ? Math.max(...this.students.map(s => s.id)) : 0;
    student.id = maxId + 1;
    this.students = [...this.students, student];
    this.studentsSubject.next([...this.students]);
  }

  updateStudent(student: Student): void {
    const index = this.students.findIndex(s => s.id === student.id);
    if (index !== -1) {
      this.students[index] = student;
      this.students = [...this.students];
      this.studentsSubject.next([...this.students]);
    }
  }

  deleteStudent(id: number): void {
    this.students = this.students.filter(s => s.id !== id);
    this.studentsSubject.next([...this.students]);
  }
}
