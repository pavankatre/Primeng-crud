import { Component, Input, OnInit, AfterContentChecked, AfterViewChecked, AfterContentInit, AfterViewInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TagModule } from 'primeng/tag';
import { TopbarComponent } from '../topbar/topbar.component';
import { UserService } from '../../core/services/user.service';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Router } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';



@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [TableModule, HttpClientModule, ConfirmDialogModule, ToastModule, InputTextModule, NgxChartsModule, TagModule, IconFieldModule, InputIconModule, TopbarComponent, ButtonModule, InputTextModule, DialogModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {


  users!: any[];
  selectedCustomers!: any;
  visible: boolean = false;
  modalRef: any


  constructor(
    private userService: UserService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) { }



  ngOnInit() {
    this.users = this.userService.getItem();
  }


  showDialog() {
    this.router.navigate(['adduser'])
  }

  /**
   * @note This function will remve the record after user confirmation.
   * @param user
   */
  removeUser(user: any) {
    this.confirmationService.confirm({
      target: user.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",

      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
        this.userService.removeItem(user);
        this.users = this.userService.getItem();
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });

  }

  

  updateUser(id: any, data: any) {
    this.router.navigate(['updateuser', id])
  }

  colorScheme: any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };


  navGraph() {
    this.router.navigate(['graph'])
  }

}
