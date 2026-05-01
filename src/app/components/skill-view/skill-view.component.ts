import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SkillDataService } from '../../services/skill-data.service';
import { SkillCreationService } from '../../services/skill-creation.service';
import { SkillProgressService } from '../../services/skill-progress.service';
import { SkillTopic, SubSkill } from '../../models/skill.model';

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
    private skillDataService: SkillDataService,
    private skillCreationService: SkillCreationService,
    private progressService: SkillProgressService
  ) {}
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const topicId = +params['id'];
      this.loadTopic(topicId);
    });
  }
  
  loadTopic(topicId: number): void {
    // First try predefined skills
    let topic = this.skillDataService.getSkillTopics()
      .find(t => t.id === topicId);
    
    // If not found, try user-created skills
    if (!topic) {
      topic = this.skillCreationService.getUserSkills()
        .find(t => t.id === topicId);
      this.isCustomSkill = true;
    } else {
      this.isCustomSkill = false;
    }
    
    if (topic) {
      this.currentTopic = topic;
      // Load saved progress
      this.originalSubSkills = this.progressService.loadProgress(topicId, topic.subSkills);
      this.subSkills = [...this.originalSubSkills];
    }
  }
  
  shuffleSkills(): void {
    // Fisher-Yates shuffle algorithm
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
    if (this.currentTopic && this.isCustomSkill && confirm('Delete this sub-skill?')) {
      this.skillCreationService.deleteSubSkill(this.currentTopic.id, subSkillId);
      // Reload the topic to refresh the sub-skills list
      this.loadTopic(this.currentTopic.id);
    }
  }
  
  private saveProgress(): void {
    if (this.currentTopic) {
      this.progressService.saveProgress(this.currentTopic.id, this.subSkills);
    }
  }
  
  get completionPercentage(): number {
    const completed = this.subSkills.filter(s => s.completed).length;
    return (completed / this.subSkills.length) * 100;
  }
}
