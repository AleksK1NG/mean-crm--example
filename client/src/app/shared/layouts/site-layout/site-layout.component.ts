import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements OnInit {
  private links = [
    { url: '/overview', name: 'Overview' },
    { url: '/analytics', name: 'Analytics' },
    { url: '/history', name: 'History' },
    { url: '/order', name: 'Create Order' },
    { url: '/categories', name: 'Categories' }
  ];

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  logout(event: Event) {
    event.preventDefault();
    this.authService.logout();
    console.log('Logout');
  }
}
