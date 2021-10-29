import { Directive } from '@angular/core';
import { AsyncValidator, ValidationErrors, AbstractControl, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { Observable } from 'rxjs';
import { BackendService } from '../services/backend.service';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[uniqueEmail]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: UniqueEmailValidatorDirective, multi: true }]
})
export class UniqueEmailValidatorDirective implements AsyncValidator {

  constructor(private usersData: BackendService) { }
  validate(c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.usersData.getUserByEmail(c.value).pipe(
      map(users => {
        return users && users.length > 0 ? { uniqueEmail: true } : null;
      })
    );

  }
}