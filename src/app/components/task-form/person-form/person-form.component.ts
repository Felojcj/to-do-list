import { SkillFormComponent } from './skill-form/skill-form.component';
import { Component, Input } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormArray,
} from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss'],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    SkillFormComponent,
    MatCardModule
  ],
  standalone: true,
})
export class PersonFormComponent {
  @Input() personForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.addSkill()
  }

  get skills() {
    return this.skillsFormArray.controls as FormGroup[];
  }

  get skillsFormArray() {
    return this.personForm.get('skills') as FormArray;
  }

  addSkill() {
    const skillForm = this.fb.group({
      skill: ['', Validators.required],
    });
    this.skillsFormArray.push(skillForm);
  }

  deleteSkill(index: number) {
    this.skillsFormArray.removeAt(index);
  }
}
