import { Component, Input, OnInit } from '@angular/core';
import { MenuService } from '../menu-service.service';
import { MenuItem } from '../menuItem';

@Component({
  selector: 'app-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.css']
})
export class MenuButtonComponent implements OnInit {
  @Input() menuItem: MenuItem = {} as MenuItem;
  isActive: boolean = false;

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuService.$activeButton.subscribe((activeButton) => this.isActive = (this.menuItem === activeButton));
  }
  
  setActive(): void {
    this.menuService.$activeButton.next(this.menuItem);
  }


}
