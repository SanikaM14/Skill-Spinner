export interface SubSkill {
  id: number;
  name: string;
  description: string;
  completed: boolean;
  isCustom?: boolean;
  resources?: {
    youtubeUrl?: string;
    prompt?: string;
    estimatedTime?: string;
  };
}

export interface SkillTopic {
  id: number;
  name: string;
  icon: string;
  subSkills: SubSkill[];
  isCustom?: boolean;
}
