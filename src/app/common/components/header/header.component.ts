import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { Themes } from '../../enums/themes';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  theme: Themes = Themes.Dark;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {}

  protected changeThemeMode(): void {
    this.document.body.classList.replace(
      this.theme,
      this.theme === Themes.Light
        ? (this.theme = Themes.Dark)
        : (this.theme = Themes.Light)
    );
  }
}
