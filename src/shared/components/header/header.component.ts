import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from 'src/shared/services/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public utilsService: UtilsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  navigateToCart(path: string) {
    this.router.navigate([path]);
  }

}
