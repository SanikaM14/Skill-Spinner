import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SkillSelectorComponent } from './features/skills/components/skill-selector/skill-selector.component';
import { SkillViewComponent } from './features/skills/components/skill-view/skill-view.component';
import { SkillCardComponent } from './features/skills/components/skill-card/skill-card.component';
import { SkillCreatorComponent } from './features/skills/components/skill-creator/skill-creator.component';

@NgModule({
  declarations: [
    AppComponent,
    SkillSelectorComponent,
    SkillViewComponent,
    SkillCardComponent,
    SkillCreatorComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
