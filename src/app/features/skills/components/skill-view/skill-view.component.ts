import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SkillStorageService } from '../../../../core/services/skill-storage.service';
import { SkillTopic, SubSkill } from '../../../../core/models/skill.model';

@Component({
  selector: 'app-skill-view',
  templateUrl: './skill-view.component.html',
  styleUrls: ['./skill-view.component.css']
})
export class SkillViewComponent implements OnInit {
  currentTopic: SkillTopic | null = null;
  subSkills: SubSkill[] = [];
  originalSubSkills: SubSkill[] = [];
  isCustomSkill = false;
  
  constructor(
    private route: ActivatedRoute,
    private skillStorageService: SkillStorageService
  ) {}
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const topicId = +params['id'];
      this.loadTopic(topicId);
    });
  }
  
  loadTopic(topicId: number): void {
    const topic = this.skillStorageService.getSkill(topicId);
    
    if (topic) {
      this.currentTopic = topic;
      this.isCustomSkill = !!topic.isCustom;
      this.originalSubSkills = [...topic.subSkills];
      this.subSkills = [...this.originalSubSkills];
    }
  }
  
  shuffleSkills(): void {
    const shuffled = [...this.originalSubSkills];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    this.subSkills = shuffled;
  }
  
  toggleComplete(skill: SubSkill): void {
    skill.completed = !skill.completed;
    this.saveProgress();
  }
  
  deleteSubSkill(subSkillId: number): void {
    if (this.currentTopic && confirm('Delete this sub-skill?')) {
      this.skillStorageService.deleteSubSkill(this.currentTopic.id, subSkillId);
      this.loadTopic(this.currentTopic.id);
    }
  }
  
  private saveProgress(): void {
    if (this.currentTopic) {
      // Create a copy of the topic with updated subSkills
      const updatedTopic = { ...this.currentTopic, subSkills: this.originalSubSkills };
      this.skillStorageService.updateSkill(updatedTopic);
    }
  }
  
  get completionPercentage(): number {
    if (this.subSkills.length === 0) return 0;
    const completed = this.subSkills.filter(s => s.completed).length;
    return (completed / this.subSkills.length) * 100;
  }
}
