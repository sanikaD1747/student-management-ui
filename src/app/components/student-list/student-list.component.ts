import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  filteredStudents: Student[] = [];

  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private studentService: StudentService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.studentService.getStudents().subscribe(data => {
      this.students = data;
      this.filterStudents();
    });

    // Listen for global search queries
    this.route.queryParams.subscribe(params => {
      if (params['q']) {
        this.searchTerm = params['q'];
        this.filterStudents();
      }
    });
  }

  filterStudents(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredStudents = this.students;
    } else {
      const lowerSearch = this.searchTerm.toLowerCase();
      this.filteredStudents = this.students.filter(student =>
        student.name.toLowerCase().includes(lowerSearch) ||
        student.email.toLowerCase().includes(lowerSearch) ||
        student.course.toLowerCase().includes(lowerSearch) ||
        student.city.toLowerCase().includes(lowerSearch)
      );
    }
    this.currentPage = 1;
  }

  deleteStudent(id: number): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(id);
    }
  }

  get paginatedStudents(): Student[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredStudents.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredStudents.length / this.itemsPerPage);
  }

  get pages(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getUniqueCourses(): number {
    const courses = this.students.map(s => s.course);
    return new Set(courses).size;
  }

  getUniqueCities(): number {
    const cities = this.students.map(s => s.city);
    return new Set(cities).size;
  }
}
