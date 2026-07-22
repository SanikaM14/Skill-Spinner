import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SkillTopic } from '../../../../core/models/skill.model';
import { SkillStorageService } from '../../../../core/services/skill-storage.service';

@Component({
  selector: 'app-skill-selector',
  templateUrl: './skill-selector.component.html',
  styleUrls: ['./skill-selector.component.css']
})
export class SkillSelectorComponent implements OnInit {
  allSkills: SkillTopic[] = [];
  activeTab: 'all' | 'predefined' | 'custom' = 'all';
  
  constructor(
    private skillStorageService: SkillStorageService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.loadSkills();
  }

  loadSkills(): void {
    this.allSkills = this.skillStorageService.getSkills();
  }
  
  get displayedSkills(): SkillTopic[] {
    switch(this.activeTab) {
      case 'predefined':
        return this.allSkills.filter(s => !s.isCustom);
      case 'custom':
        return this.allSkills.filter(s => s.isCustom);
      default:
        return this.allSkills;
    }
  }
  
  deleteSkill(topicId: number, event: Event): void {
    event.stopPropagation();
    if (confirm('Are you sure you want to delete this skill path?')) {
      this.skillStorageService.deleteSkill(topicId);
      this.loadSkills();
    }
  }
  
  navigateToCreator(): void {
    this.router.navigate(['/create-skill']);
  }
}
