import { Injectable } from '@angular/core';
import { SkillTopic, SubSkill } from '../models/skill.model';

@Injectable({
  providedIn: 'root'
})
export class SkillCreationService {
  private userSkillsKey = 'userCreatedSkills';
  private nextIdKey = 'nextSkillId';

  constructor() {}

  // Get all user-created skills
  getUserSkills(): SkillTopic[] {
    const saved = localStorage.getItem(this.userSkillsKey);
    return saved ? JSON.parse(saved) : [];
  }

  // Save a new user-created skill
  saveUserSkill(topic: SkillTopic): void {
    const userSkills = this.getUserSkills();
    topic.id = this.getNextId();
    topic.isCustom = true;
    
    // Mark all sub-skills as custom
    topic.subSkills.forEach(skill => {
      skill.isCustom = true;
      skill.id = this.getNextSubSkillId();
    });
    
    userSkills.push(topic);
    localStorage.setItem(this.userSkillsKey, JSON.stringify(userSkills));
    this.incrementId();
  }

  // Update existing skill
  updateUserSkill(updatedTopic: SkillTopic): void {
    const userSkills = this.getUserSkills();
    const index = userSkills.findIndex(s => s.id === updatedTopic.id);
    if (index !== -1) {
      userSkills[index] = updatedTopic;
      localStorage.setItem(this.userSkillsKey, JSON.stringify(userSkills));
    }
  }

  // Delete a user skill
  deleteUserSkill(topicId: number): void {
    const userSkills = this.getUserSkills();
    const filtered = userSkills.filter(s => s.id !== topicId);
    localStorage.setItem(this.userSkillsKey, JSON.stringify(filtered));
  }

  // Add a new sub-skill to an existing skill
  addSubSkill(topicId: number, subSkill: SubSkill): void {
    const userSkills = this.getUserSkills();
    const skillIndex = userSkills.findIndex(s => s.id === topicId);
    if (skillIndex !== -1) {
      subSkill.id = this.getNextSubSkillId();
      subSkill.isCustom = true;
      userSkills[skillIndex].subSkills.push(subSkill);
      localStorage.setItem(this.userSkillsKey, JSON.stringify(userSkills));
    }
  }

  // Delete a sub-skill from a skill
  deleteSubSkill(topicId: number, subSkillId: number): void {
    const userSkills = this.getUserSkills();
    const skillIndex = userSkills.findIndex(s => s.id === topicId);
    if (skillIndex !== -1) {
      userSkills[skillIndex].subSkills = userSkills[skillIndex].subSkills.filter(
        sub => sub.id !== subSkillId
      );
      localStorage.setItem(this.userSkillsKey, JSON.stringify(userSkills));
    }
  }

  private getNextId(): number {
    const nextId = localStorage.getItem(this.nextIdKey);
    return nextId ? parseInt(nextId) : 1000; // Start from 1000 to avoid conflict with predefined
  }

  private getNextSubSkillId(): number {
    const nextId = localStorage.getItem('nextSubSkillId');
    const id = nextId ? parseInt(nextId) : 1000;
    localStorage.setItem('nextSubSkillId', (id + 1).toString());
    return id;
  }

  private incrementId(): void {
    const current = this.getNextId();
    localStorage.setItem(this.nextIdKey, (current + 1).toString());
  }
}
