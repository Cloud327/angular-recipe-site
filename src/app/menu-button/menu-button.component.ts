import { Component } from '@angular/core';

@Component({
  selector: 'app-auto-open-menu',
  template: `
  
  <!-- <div class="app-nav-item" *matMenuTriggerFor="menu" #menuTrigger="matMenuTrigger"
                  (mouseenter)="mouseEnter(menuTrigger)" (mouseleave)="mouseLeave(menuTrigger)">
      <ng-content select="[trigger]"></ng-content>
  </div>
  <mat-menu #Rmenu="matMenu" *hasBackdrop="false">
      <div (mouseenter)="mouseEnter(menuTrigger)" (mouseleave)="mouseLeave(menuTrigger)">
          <ng-content select="[content]"></ng-content>
      </div>
  </mat-menu> -->
  `
})
export class MenuButtonComponent {
  timedOutCloser: string | number | NodeJS.Timeout | undefined;

  constructor() { }

  mouseEnter(trigger: { openMenu: () => void; }) {
    if (this.timedOutCloser) {
      clearTimeout(this.timedOutCloser);
    }
    trigger.openMenu();
  }

  mouseLeave(trigger: { closeMenu: () => void; }) {
    this.timedOutCloser = setTimeout(() => {
      trigger.closeMenu();
    }, 50);
  }
}