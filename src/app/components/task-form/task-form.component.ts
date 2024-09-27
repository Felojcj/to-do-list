import { PersonFormComponent } from './person-form/person-form.component';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDividerModule,
    CommonModule,
    PersonFormComponent,
  ],
})
export class TaskFormComponent {
  taskForm!: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.taskForm = this.fb.group({
      taskName: ['', [Validators.required, Validators.minLength(5)]],
      limitDate: ['', Validators.required],
      people: this.fb.array([]),
    });
  }

  get people() {
    return this.peopleFormArray.controls as FormGroup[];
  }

  get peopleFormArray() {
    return this.taskForm.get('people') as FormArray;
  }

  addPerson() {
    const personForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      skills: this.fb.array([]),
    });
    this.people.push(personForm);
  }

  deletePerson(index: number) {
    this.peopleFormArray.removeAt(index);
  }
}

// [{personas}]
