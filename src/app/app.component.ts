import { Component } from '@angular/core';
import { AuthService } from './modules/Auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'HappyInventoryclient';
  userEmail: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    const user = this.authService.getUser();
    this.userEmail = user?.email ?? '';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
