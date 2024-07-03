import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../core/interface/user';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, ToastModule, ButtonModule, RippleModule,CommonModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})

export class UserFormComponent {
  userId: any = 0;
  userForm: FormGroup | User | any;



  constructor(
    private _fb: FormBuilder,
    private userService: UserService,
    private actroute: ActivatedRoute,
    private messageService: MessageService,
    private router: Router) { }


  ngOnInit() {
    this.createForm();
    this.filterUser();
  }

  /**
   * @note create the reactive formgroup for validation and getting value
   */
  createForm() {
    this.userForm = this._fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18), Validators.max(70)]], // Age validation (minimum 18)
      email: ['', [Validators.required, Validators.email]], // Email validation
      id: ['']
    })
  }


  /**
   * @note This function will add and edit the data.
   */
  onSubmit() {
    if (this.userForm.valid) {
      if (this.userId > 0) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data updated successfully!' });
        this.userService.updateItemById(this.userId, this.userForm.value)
      } else {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data inserted successfully!' });
        this.userService.addItem(this.userForm.value);
      }
      setTimeout(() => {
        this.router.navigate(['home'])
      }, 1000);
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to insert data. Please try again' });
      console.log('Form is invalid');
    }
  }

  /**
   * @note this function will filter the user data based on id
   */
  filterUser() {
    this.userId = this.actroute.snapshot.paramMap.get('id');
    let user = this.userService.getItem().find(user => user.id === this.userId);
    if (user != undefined) {
      this.userForm = this._fb.group({
        firstName: [user.firstName, Validators.required],
        lastName: [user.lastName, Validators.required],
        age: [user.age, [Validators.required, Validators.min(18), Validators.max(70)]], // Age validation (minimum 18)
        email: [user.email, [Validators.required, Validators.email]], // Email validation
        id: [user.id]
      })
    }
  }

  navList(){
    this.router.navigate(['home'])
  }

}
