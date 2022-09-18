import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { Themes } from '../../enums/themes';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  theme: Themes =
    (window.localStorage.getItem('themeMode') as Themes) || Themes.Dark;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.initializeTheme();
  }

  private initializeTheme(): void {
    this.renderer.addClass(this.document.body, this.theme);
  }

  protected changeThemeMode(): void {
    this.theme === Themes.Light
      ? this.replaceBodyClassAndStorage(Themes.Dark)
      : this.replaceBodyClassAndStorage(Themes.Light);
  }

  private replaceBodyClassAndStorage(themeName: Themes): void {
    window.localStorage.setItem('themeMode', themeName);
    this.document.body.classList.replace(this.theme, (this.theme = themeName));
  }
}
