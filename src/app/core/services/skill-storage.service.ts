import { Injectable } from '@angular/core';
import { SkillTopic, SubSkill } from '../models/skill.model';

@Injectable({
  providedIn: 'root'
})
export class SkillStorageService {
  private readonly STORAGE_KEY = 'skillSpinnerData';
  private readonly ID_KEY = 'skillSpinnerNextId';

  constructor() {
    this.initializeData();
  }

  private initializeData(): void {
    const existing = localStorage.getItem(this.STORAGE_KEY);
    if (!existing) {
      const defaultSkills: SkillTopic[] = [
        {
          id: 1,
          name: 'Guitar',
          icon: 'bi bi-music-note-beamed',
          isCustom: false,
          subSkills: [
            { 
              id: 101, 
              name: 'Basic Chords (G, C, D, Em)', 
              description: 'Learn the 4 most common open chords',
              completed: false,
              resources: {
                youtubeUrl: 'https://youtube.com/watch?v=2ncjKvcwXy4',
                prompt: 'Explain how to position fingers for G, C, D, and Em chords',
                estimatedTime: '2-3 days'
              }
            },
            { 
              id: 102, 
              name: 'Strumming Patterns', 
              description: 'Master basic strumming rhythms',
              completed: false,
              resources: {
                youtubeUrl: 'https://youtube.com/watch?v=B1UEGP_0hH4',
                prompt: 'Teach me common strumming patterns for beginner guitar',
                estimatedTime: '1-2 days'
              }
            },
            { 
              id: 103, 
              name: 'Reading Tablature', 
              description: 'Learn to read guitar tabs',
              completed: false,
              resources: {
                youtubeUrl: 'https://youtube.com/watch?v=Q9Cz3LcXq8M',
                prompt: 'Explain how to read and understand guitar tablature',
                estimatedTime: '1 day'
              }
            },
            { 
              id: 104, 
              name: 'Fingerpicking Basics', 
              description: 'Introduction to fingerstyle playing',
              completed: false,
              resources: {
                youtubeUrl: 'https://youtube.com/watch?v=2I1Ht1c6o7w',
                prompt: 'Teach me basic fingerpicking patterns and techniques',
                estimatedTime: '3-4 days'
              }
            },
            { 
              id: 105, 
              name: 'Chord Transitions', 
              description: 'Smooth chord changes',
              completed: false,
              resources: {
                youtubeUrl: 'https://youtube.com/watch?v=Jg5U9j3Lp7c',
                prompt: 'How can I practice smooth chord transitions on guitar?',
                estimatedTime: '2-3 days'
              }
            },
            { 
              id: 106, 
              name: 'Basic Music Theory', 
              description: 'Understanding scales and keys',
              completed: false,
              resources: {
                youtubeUrl: 'https://youtube.com/watch?v=rgaLFrEE8A0',
                prompt: 'Explain basic music theory for guitar beginners',
                estimatedTime: '3-4 days'
              }
            },
            { 
              id: 107, 
              name: 'Playing Your First Song', 
              description: 'Put it all together with a simple song',
              completed: false,
              resources: {
                youtubeUrl: 'https://youtube.com/watch?v=ccAFpKqA8eU',
                prompt: 'Help me learn to play a complete beginner song on guitar',
                estimatedTime: '2-3 days'
              }
            }
          ]
        },
        {
          id: 2,
          name: 'Angular',
          icon: 'bi bi-code-slash',
          isCustom: false,
          subSkills: [
            { 
              id: 201, 
              name: 'Components & Templates', 
              description: 'Understanding Angular components and templates',
              completed: false,
              resources: {
                youtubeUrl: 'https://youtube.com/watch?v=k5E2AVpn_0E',
                prompt: 'Explain Angular components and templates in detail',
                estimatedTime: '2-3 days'
              }
            },
            { 
              id: 202, 
              name: 'Data Binding', 
              description: 'Learn interpolation, property binding, and event binding',
              completed: false,
              resources: {
                youtubeUrl: 'https://youtube.com/watch?v=3qHkXK9kq5I',
                prompt: 'Teach me about Angular data binding techniques',
                estimatedTime: '2 days'
              }
            },
            { 
              id: 203, 
              name: 'Directives', 
              description: 'Understanding built-in and custom directives',
              completed: false,
              resources: {
                youtubeUrl: 'https://youtube.com/watch?v=3AQTaf0P3wM',
                prompt: 'Explain Angular directives and how to create custom ones',
                estimatedTime: '3 days'
              }
            },
            { 
              id: 204, 
              name: 'Services & Dependency Injection', 
              description: 'Creating and using services',
              completed: false,
              resources: {
                youtubeUrl: 'https://youtube.com/watch?v=5L6z3lG8xQc',
                prompt: 'How do services and dependency injection work in Angular?',
                estimatedTime: '2-3 days'
              }
            },
            { 
              id: 205, 
              name: 'Routing', 
              description: 'Implementing navigation in Angular apps',
              completed: false,
              resources: {
                youtubeUrl: 'https://youtube.com/watch?v=oFfaIiT4P3M',
                prompt: 'Teach me Angular routing and navigation',
                estimatedTime: '2 days'
              }
            },
            { 
              id: 206, 
              name: 'Forms (Template & Reactive)', 
              description: 'Working with user input',
              completed: false,
              resources: {
                youtubeUrl: 'https://youtube.com/watch?v=CDr3JGcKsDM',
                prompt: 'Explain template-driven and reactive forms in Angular',
                estimatedTime: '3-4 days'
              }
            },
            { 
              id: 207, 
              name: 'HTTP Client & Observables', 
              description: 'Making API calls and handling async data',
              completed: false,
              resources: {
                youtubeUrl: 'https://youtube.com/watch?v=3HqkXK9kq5I',
                prompt: 'How to use HTTP client and observables in Angular?',
                estimatedTime: '3 days'
              }
            },
            { 
              id: 208, 
              name: 'State Management', 
              description: 'Managing application state',
              completed: false,
              resources: {
                youtubeUrl: 'https://youtube.com/watch?v=7ULq_wc6lqM',
                prompt: 'What are the best practices for state management in Angular?',
                estimatedTime: '2-3 days'
              }
            }
          ]
        },
        {
          id: 3,
          name: 'Watercolor',
          icon: 'bi bi-palette',
          isCustom: false,
          subSkills: [
            { 
              id: 301, 
              name: 'Basic Supplies & Setup', 
              description: 'Essential materials and workspace setup',
              completed: false,
              resources: {
                youtubeUrl: 'https://youtube.com/watch?v=9hXfRlPqQpU',
                prompt: 'What supplies do I need to start watercolor painting?',
                estimatedTime: '1 day'
              }
            },
            { 
              id: 302, 
              name: 'Water Control Techniques', 
              description: 'Mastering wet-on-wet and wet-on-dry',
              completed: false,
              resources: {
                youtubeUrl: 'https://youtube.com/watch?v=9hXfRlPqQpU',
                prompt: 'How do I control water in watercolor painting?',
                estimatedTime: '2-3 days'
              }
            },
            { 
              id: 303, 
              name: 'Color Mixing Basics', 
              description: 'Understanding color theory and mixing',
              completed: false,
              resources: {
                youtubeUrl: 'https://youtube.com/watch?v=9hXfRlPqQpU',
                prompt: 'Teach me color mixing for watercolor painting',
                estimatedTime: '2 days'
              }
            },
            { 
              id: 304, 
              name: 'Basic Washes', 
              description: 'Creating flat, graded, and variegated washes',
              completed: false,
              resources: {
                youtubeUrl: 'https://youtube.com/watch?v=9hXfRlPqQpU',
                prompt: 'How do I create different types of washes in watercolor?',
                estimatedTime: '2-3 days'
              }
            },
            { 
              id: 305, 
              name: 'Brush Techniques', 
              description: 'Different brush strokes and their effects',
              completed: false,
              resources: {
                youtubeUrl: 'https://youtube.com/watch?v=9hXfRlPqQpU',
                prompt: 'What are the essential brush techniques for watercolor?',
                estimatedTime: '2-3 days'
              }
            },
            { 
              id: 306, 
              name: 'Lifting & Corrections', 
              description: 'Fixing mistakes and creating highlights',
              completed: false,
              resources: {
                youtubeUrl: 'https://youtube.com/watch?v=9hXfRlPqQpU',
                prompt: 'How can I lift paint and make corrections in watercolor?',
                estimatedTime: '1-2 days'
              }
            },
            { 
              id: 307, 
              name: 'Painting Simple Landscapes', 
              description: 'Creating basic landscape paintings',
              completed: false,
              resources: {
                youtubeUrl: 'https://youtube.com/watch?v=9hXfRlPqQpU',
                prompt: 'Help me paint a simple watercolor landscape',
                estimatedTime: '3-4 days'
              }
            }
          ]
        }
      ];
      this.saveAllSkills(defaultSkills);
      localStorage.setItem(this.ID_KEY, '1000');
    }
  }

  private saveAllSkills(skills: SkillTopic[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(skills));
  }

  getSkills(): SkillTopic[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  getSkill(id: number): SkillTopic | undefined {
    return this.getSkills().find(s => s.id === id);
  }

  private getNextId(): number {
    const idStr = localStorage.getItem(this.ID_KEY) || '1000';
    const id = parseInt(idStr, 10);
    localStorage.setItem(this.ID_KEY, (id + 1).toString());
    return id;
  }

  saveSkill(topic: SkillTopic): void {
    const skills = this.getSkills();
    topic.id = this.getNextId();
    topic.isCustom = true;
    
    topic.subSkills.forEach(sub => {
      sub.id = this.getNextId();
      sub.isCustom = true;
    });

    skills.push(topic);
    this.saveAllSkills(skills);
  }

  updateSkill(topic: SkillTopic): void {
    const skills = this.getSkills();
    const index = skills.findIndex(s => s.id === topic.id);
    if (index !== -1) {
      skills[index] = topic;
      this.saveAllSkills(skills);
    }
  }

  deleteSkill(id: number): void {
    const skills = this.getSkills();
    const filtered = skills.filter(s => s.id !== id);
    this.saveAllSkills(filtered);
  }

  deleteSubSkill(topicId: number, subSkillId: number): void {
    const skills = this.getSkills();
    const topicIndex = skills.findIndex(s => s.id === topicId);
    if (topicIndex !== -1) {
      skills[topicIndex].subSkills = skills[topicIndex].subSkills.filter(sub => sub.id !== subSkillId);
      this.saveAllSkills(skills);
    }
  }

  updateProgress(topicId: number, subSkills: SubSkill[]): void {
    const skills = this.getSkills();
    const index = skills.findIndex(s => s.id === topicId);
    if (index !== -1) {
      skills[index].subSkills = subSkills;
      this.saveAllSkills(skills);
    }
  }
}
