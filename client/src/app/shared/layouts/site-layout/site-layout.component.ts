import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MaterialService } from '../../services/material.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements OnInit, AfterViewInit {
  @ViewChild('floatButton', null) floatButtonRef: ElementRef;

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

  ngAfterViewInit(): void {
    MaterialService.initFloatingButton(this.floatButtonRef);
  }
}
