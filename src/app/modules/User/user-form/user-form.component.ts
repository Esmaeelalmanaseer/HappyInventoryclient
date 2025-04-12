import { Component } from '@angular/core';
import { RegisterRequistDto, UpdateUserDto } from '../../../shared/Models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-form',
  standalone: false,
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  userForm!: FormGroup;
  isEditMode = false;
  userId = '';
  roles = ['Admin', 'Management', 'Auditor'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
          )
        ]
      ]
    });
  }

  ngOnInit(): void {
    this.initForm();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.userId = id;
      this.loadUser();
    }
  }

  initForm(): void {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', Validators.required],
      role: ['', Validators.required],
      active: [true],
      password: [''] // only required in create mode
    });

    if (this.isEditMode) {
      this.userForm.get('email')?.disable();
      this.userForm.get('password')?.clearValidators();
    }
  }

  loadUser(): void {
    this.userService.getById(this.userId).subscribe(user => {
      this.userForm.patchValue(user);
      this.userForm.get('email')?.disable();
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) return;

    const formValue = this.userForm.getRawValue();

    if (this.isEditMode) {
      const dto: UpdateUserDto = {
        id: this.userId,
        fullName: formValue.fullName,
        role: formValue.role,
        isactive: formValue.active
      };
      this.userService.update(dto).subscribe(() => {
        this.router.navigate(['/users']);
      });
    } else {
      const dto: RegisterRequistDto = {
        email: formValue.email,
        fullName: formValue.fullName,
        password: formValue.password,
        role: formValue.role,
        isactive: formValue.active
      };
      this.userService.create(dto).subscribe(() => {
        this.router.navigate(['/users']);
      });
    }
  }
}
