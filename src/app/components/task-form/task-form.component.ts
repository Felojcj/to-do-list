import { CoreService } from './../../services/core.service';
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
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

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
    MatIconModule,
    MatCardModule,
  ],
})
export class TaskFormComponent {
  taskForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private coreService: CoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.taskForm = this.fb.group({
      taskName: ['', [Validators.required, Validators.minLength(5)]],
      limitDate: ['', Validators.required],
      active: [false],
      people: this.fb.array([]),
    });
    this.addPerson();
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
      age: ['', [Validators.required, Validators.min(18)]],
      skills: this.fb.array([]),
    });
    this.peopleFormArray.push(personForm);
  }

  deletePerson(index: number) {
    this.peopleFormArray.removeAt(index);
  }

  createTask() {
    console.log(this.taskForm.value);
    this.coreService.postTasks(this.taskForm.value).subscribe((users) => {
      console.log('done');
      this.router.navigate(['/list']);
    });
  }
}

// [{personas}]
