import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SkillStorageService } from '../../../../core/services/skill-storage.service';
import { SkillTopic, SubSkill } from '../../../../core/models/skill.model';

@Component({
  selector: 'app-skill-creator',
  templateUrl: './skill-creator.component.html',
  styleUrls: ['./skill-creator.component.css']
})
export class SkillCreatorComponent implements OnInit {
  skillForm: FormGroup;
  showTemplateSuggestions = false;
  
  templates = [
    { name: 'Python Programming', icon: 'bi bi-code-slash', 
      subSkills: ['Variables & Data Types', 'Control Flow', 'Functions', 'Lists & Dictionaries', 'File I/O'] },
    { name: 'Public Speaking', icon: 'bi bi-megaphone',
      subSkills: ['Overcoming Anxiety', 'Body Language', 'Voice Modulation', 'Storytelling', 'Handling Q&A'] },
    { name: 'Cooking Basics', icon: 'bi bi-egg-fried',
      subSkills: ['Knife Skills', 'Cooking Methods', 'Food Safety', 'Flavor Balancing', 'Meal Planning'] },
    { name: 'Photography', icon: 'bi bi-camera',
      subSkills: ['Camera Settings', 'Composition Rules', 'Lighting Basics', 'Editing Software', 'Portrait Photography'] }
  ];

  constructor(
    private fb: FormBuilder,
    private skillStorageService: SkillStorageService,
    private router: Router
  ) {
    this.skillForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      icon: ['📚', Validators.required],
      subSkills: this.fb.array([this.createSubSkillForm()])
    });
  }

  ngOnInit(): void {}

  createSubSkillForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      youtubeUrl: [''],
      prompt: [''],
      estimatedTime: ['']
    });
  }

  get subSkillsArray(): FormArray {
    return this.skillForm.get('subSkills') as FormArray;
  }

  addSubSkill(): void {
    this.subSkillsArray.push(this.createSubSkillForm());
  }

  removeSubSkill(index: number): void {
    this.subSkillsArray.removeAt(index);
  }

  applyTemplate(template: any): void {
    this.skillForm.patchValue({
      name: template.name,
      icon: template.icon
    });
    
    while (this.subSkillsArray.length) {
      this.subSkillsArray.removeAt(0);
    }
    
    template.subSkills.forEach((skillName: string) => {
      this.subSkillsArray.push(this.fb.group({
        name: [skillName, Validators.required],
        description: [`Learn how to ${skillName.toLowerCase()}`, Validators.required],
        youtubeUrl: [''],
        prompt: [''],
        estimatedTime: ['']
      }));
    });
    
    this.showTemplateSuggestions = false;
  }

  onSubmit(): void {
    if (this.skillForm.valid) {
      const formValue = this.skillForm.value;
      
      const newSkill: SkillTopic = {
        id: 0,
        name: formValue.name,
        icon: formValue.icon,
        isCustom: true,
        subSkills: formValue.subSkills.map((skill: any, index: number) => ({
          id: 0,
          name: skill.name,
          description: skill.description,
          completed: false,
          resources: {
            youtubeUrl: skill.youtubeUrl,
            prompt: skill.prompt,
            estimatedTime: skill.estimatedTime
          }
        }))
      };
      
      this.skillStorageService.saveSkill(newSkill);
      this.router.navigate(['/']);
    }
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}
