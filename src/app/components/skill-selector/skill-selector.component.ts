import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SkillTopic } from '../../models/skill.model';
import { SkillDataService } from '../../services/skill-data.service';
import { SkillCreationService } from '../../services/skill-creation.service';

@Component({
  selector: 'app-skill-selector',
  templateUrl: './skill-selector.component.html',
  styleUrls: ['./skill-selector.component.css']
})
export class SkillSelectorComponent implements OnInit {
  predefinedSkills: SkillTopic[] = [];
  userSkills: SkillTopic[] = [];
  activeTab: 'all' | 'predefined' | 'custom' = 'all';
  
  constructor(
    private skillDataService: SkillDataService,
    private skillCreationService: SkillCreationService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.predefinedSkills = this.skillDataService.getSkillTopics();
    this.userSkills = this.skillCreationService.getUserSkills();
  }
  
  get displayedSkills(): SkillTopic[] {
    switch(this.activeTab) {
      case 'predefined':
        return this.predefinedSkills;
      case 'custom':
        return this.userSkills;
      default:
        return [...this.predefinedSkills, ...this.userSkills];
    }
  }
  
  deleteCustomSkill(topicId: number, event: Event): void {
    event.stopPropagation();
    if (confirm('Are you sure you want to delete this skill path?')) {
      this.skillCreationService.deleteUserSkill(topicId);
      this.userSkills = this.skillCreationService.getUserSkills();
    }
  }
  
  navigateToCreator(): void {
    this.router.navigate(['/create-skill']);
  }
}
