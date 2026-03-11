import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
  studentForm!: FormGroup;
  isEditMode = false;
  studentId!: number;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initForm();

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.studentId = +params['id'];
        const student = this.studentService.getStudentById(this.studentId);
        if (student) {
          this.studentForm.patchValue(student);
        } else {
          this.router.navigate(['/students']);
        }
      }
    });
  }

  initForm(): void {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(5), Validators.max(100), Validators.pattern("^[0-9]*$")]],
      email: ['', [Validators.required, Validators.email]],
      course: ['', Validators.required],
      city: ['', Validators.required]
    });
  }

  get f() { return this.studentForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.studentForm.invalid) {
      return;
    }

    const formData: Student = {
      id: this.isEditMode ? this.studentId : 0,
      ...this.studentForm.value
    };

    if (this.isEditMode) {
      this.studentService.updateStudent(formData);
    } else {
      this.studentService.addStudent(formData);
    }

    this.router.navigate(['/students']);
  }
}
