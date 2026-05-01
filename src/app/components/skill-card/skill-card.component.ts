import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SubSkill } from '../../models/skill.model';

@Component({
  selector: 'app-skill-card',
  templateUrl: './skill-card.component.html',
  styleUrls: ['./skill-card.component.css']
})
export class SkillCardComponent {
  @Input() skill!: SubSkill;
  @Input() isCustomSkill: boolean = false;
  @Output() toggleComplete = new EventEmitter<SubSkill>();
  @Output() deleteSubSkill = new EventEmitter<number>();
  
  showResources = false;
  
  onToggle(): void {
    this.toggleComplete.emit(this.skill);
  }
  
  toggleResources(): void {
    this.showResources = !this.showResources;
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Prompt copied to clipboard!');
    });
  }

  onDelete(): void {
    if (this.isCustomSkill) {
      this.deleteSubSkill.emit(this.skill.id);
    }
  }
}
