import { Component } from '@angular/core';
import { UserDto } from '../../../shared/Models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  users: UserDto[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAll().subscribe(res => {
      this.users = res;
    });
  }

  deleteUser(user: UserDto): void {
    if (user.email === 'admin@happywarehouse.com') {
      alert('Cannot delete the admin user.');
      return;
    }

    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.delete(user.id).subscribe(() => {
        this.loadUsers();
      });
    }
  }
}
