import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkillSelectorComponent } from './features/skills/components/skill-selector/skill-selector.component';
import { SkillViewComponent } from './features/skills/components/skill-view/skill-view.component';
import { SkillCreatorComponent } from './features/skills/components/skill-creator/skill-creator.component';

const routes: Routes = [
  { path: '', component: SkillSelectorComponent },
  { path: 'skills/:id', component: SkillViewComponent },
  { path: 'create-skill', component: SkillCreatorComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
