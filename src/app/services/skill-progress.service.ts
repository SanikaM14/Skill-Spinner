import { Injectable } from '@angular/core';
import { SkillTopic, SubSkill } from '../models/skill.model';

@Injectable({
  providedIn: 'root'
})
export class SkillProgressService {
  private storageKey = 'skillSpinnerProgress';
  
  constructor() { }

  saveProgress(topicId: number, subSkills: SubSkill[]): void {
    const progress = this.getAllProgress();
    progress[topicId] = subSkills.map(skill => ({
      id: skill.id,
      completed: skill.completed
    }));
    localStorage.setItem(this.storageKey, JSON.stringify(progress));
  }
  
  loadProgress(topicId: number, defaultSubSkills: SubSkill[]): SubSkill[] {
    const allProgress = this.getAllProgress();
    const savedProgress = allProgress[topicId];
    
    if (!savedProgress) return defaultSubSkills;
    
    // Merge saved completion status with current skills
    return defaultSubSkills.map(skill => ({
      ...skill,
      completed: savedProgress.find((s: any) => s.id === skill.id)?.completed || false
    }));
  }
  
  private getAllProgress(): any {
    const saved = localStorage.getItem(this.storageKey);
    return saved ? JSON.parse(saved) : {};
  }
  
  clearProgress(topicId?: number): void {
    if (topicId) {
      const progress = this.getAllProgress();
      delete progress[topicId];
      localStorage.setItem(this.storageKey, JSON.stringify(progress));
    } else {
      localStorage.removeItem(this.storageKey);
    }
  }
}
