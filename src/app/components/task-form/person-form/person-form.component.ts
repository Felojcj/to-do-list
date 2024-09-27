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
  ],
  standalone: true,
})
export class PersonFormComponent {
  @Input() personForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  get skills() {
    return this.skillFormArray.controls as FormGroup[];
  }

  get skillFormArray() {
    return this.personForm.get('skills') as FormArray;
  }

  addSkill() {
    const skillForm = this.fb.group({
      skill: ['', Validators.required],
    });
    this.skills.push(skillForm);
  }

  deleteSkill(index: number) {
    this.skillFormArray.removeAt(index);
  }
}
