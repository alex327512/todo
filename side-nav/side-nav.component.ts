import { Component, OnInit } from '@angular/core';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {OverlayContainer} from '@angular/cdk/overlay';

const SMALL_WIDTH_BREAKPOINT = 720;
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  showFiller = false;
  isScreenSmall: boolean;
  links = [
    {path: '', value: 'Main'},
    {path: 'todo', value: 'Todo'},
    {path: 'store', value: 'Sports Store'},
  ];
  constructor(private breakpointObserver: BreakpointObserver,
              private overlayContainer: OverlayContainer) { }
  isDark = false;
  themeColor: 'primary' | 'accent' | 'warn' = 'primary';
  ngOnInit(): void {
    this.breakpointObserver
      .observe([`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`])
      .subscribe((state: BreakpointState) => {
        this.isScreenSmall = state.matches;
      });
  }

  toggleTheme(): void {
    this.isDark = !this.isDark;
    if (this.isDark) {
      this.overlayContainer.getContainerElement().classList.add('dark-theme');
    } else {
      this.overlayContainer
        .getContainerElement()
        .classList.remove('dark-theme');
    }
  }

}
