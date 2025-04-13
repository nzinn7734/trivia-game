import { Component } from '@angular/core';
import { LIGHT_THEME_CORRECT, 
  LIGHT_THEME_INCORRECT, 
  DARK_THEME_CORRECT, 
  DARK_THEME_INCORRECT,
  LIGHT,
  DARK
} from '../constants/theme';

@Component({
  selector: 'app-theme-toggle',
  imports: [],
  templateUrl: './theme-toggle.component.html',
})
export class ThemeToggleComponent {

  private theme = document.getElementById("root")?.getAttribute("data-theme");

  public themeToggle() {
    let newTheme = this.theme === "dark" ? "light" : "dark"
    this.theme = newTheme;
    let correctAnswers = document.getElementsByClassName("outline correct");
    let incorrectAnswers = document.getElementsByClassName("outline incorrect");
    for(var i = 0; i < correctAnswers.length; i++) {
      correctAnswers[i].setAttribute("style", "background-color:"+this.currentThemeCorrect())
    }
    for(var i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswers[i].setAttribute("style", "background-color:"+this.currentThemeIncorrect())
    }
    document.getElementById("root")?.setAttribute("data-theme", newTheme);
  }

  private currentThemeCorrect() {
    return this.theme === LIGHT ? LIGHT_THEME_CORRECT : DARK_THEME_CORRECT; 
  }

  private currentThemeIncorrect() {
    return this.theme === LIGHT ? LIGHT_THEME_INCORRECT : DARK_THEME_INCORRECT;
  }

}
