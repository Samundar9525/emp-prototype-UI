import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginComponent } from './shared/login/login.component';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'emp-management-UI';
  isDrawerOpen = false;
  loggedUser = 'Login';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private loginServices: LoginService
  ) {
    // 👇 Check for token in query params (redirect from Django)
    this.route.queryParams.subscribe((params) => {
      const token = params['token'];
      const username = params['username'];

      if (token) {
        localStorage.setItem('authToken', token);
        if (username) {
          localStorage.setItem('username', username);
          this.loggedUser = username;
          this.loginServices.userLogged.next(username);
        }
        // Clean URL after storing token
        this.router.navigate([], { queryParams: {} });
      }
      if (localStorage.getItem('username')){
          this.loggedUser = localStorage.getItem('username') || '';
          this.loginServices.userLogged.next(username);
      }
    });

  }

  goHome() {
    this.router.navigate(['/department-dashboard']).then(() => {
      console.log('Navigated to home');
    });
  }

  drawerHandler(ev: any) {
    if (ev === false) {
      this.isDrawerOpen = false;
    }
  }


  logout() {
    this.loggedUser = 'Login';
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    sessionStorage.clear();
    this.loginServices.userLogged.next('Login');
    window.location.href = 'http://127.0.0.1:8000/login/login/'
  }

}
