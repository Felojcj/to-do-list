import { AbstractControl, ValidationErrors, ValidatorFn, FormArray } from '@angular/forms';

export const uniqueNamesValidator: ValidatorFn = (formArray: AbstractControl): ValidationErrors | null => {
  const names = (formArray as FormArray).controls.map(control => control.get('name')?.value?.toLowerCase());
  const hasDuplicates = names.some((name, index) => names.indexOf(name) !== index);

  return hasDuplicates ? { duplicateNames: true } : null;
};
