import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../modules/Auth/auth.service';
@Component({
  selector: 'app-main-layout',
  standalone: false,
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {
  constructor(private authService: AuthService, private router: Router) {}
  userEmail: string = '';
  ngOnInit() {
    const user = this.authService.getUser();
    this.userEmail = user?.email ?? '';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
