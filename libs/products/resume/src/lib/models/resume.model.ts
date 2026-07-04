export type SectionType =
  | 'header'
  | 'summary'
  | 'experience'
  | 'education'
  | 'skills'
  | 'projects'
  | 'contact'
  | 'custom';

export interface HeaderData {
  fullName: string;
  jobTitle: string;
  photoUrl: string;
}

export interface SummaryData {
  text: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface ExperienceData {
  items: ExperienceItem[];
}

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
  gpa: string;
}

export interface EducationData {
  items: EducationItem[];
}

export interface SkillsData {
  categories: { name: string; skills: string[] }[];
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  link: string;
  technologies: string;
}

export interface ProjectsData {
  items: ProjectItem[];
}

export interface ContactData {
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  website: string;
}

export interface CustomData {
  content: string;
}

export type SectionData =
  | HeaderData
  | SummaryData
  | ExperienceData
  | EducationData
  | SkillsData
  | ProjectsData
  | ContactData
  | CustomData;

export interface ResumeSection {
  id: string;
  type: SectionType;
  title: string;
  visible: boolean;
  order: number;
  data: SectionData;
}

export interface ResumeData {
  id: string;
  name: string;
  templateId: string;
  fontFamily: string;
  accentColor: string;
  sections: ResumeSection[];
  createdAt: string;
  updatedAt: string;
}

export interface TemplateConfig {
  id: string;
  name: string;
  description: string;
  previewClass: string;
  layout: 'single' | 'two-column';
}

export interface FontConfig {
  family: string;
  label: string;
  category: 'sans-serif' | 'serif' | 'monospace' | 'display';
  url: string;
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
}

export const DEFAULT_RESUME: ResumeData = {
  id: generateId(),
  name: 'My Resume',
  templateId: 'modern',
  fontFamily: 'Inter',
  accentColor: '#6366f1',
  sections: [
    {
      id: generateId(),
      type: 'header',
      title: 'Header',
      visible: true,
      order: 0,
      data: {
        fullName: 'John Doe',
        jobTitle: 'Senior Software Engineer',
        photoUrl: '',
      } as HeaderData,
    },
    {
      id: generateId(),
      type: 'contact',
      title: 'Contact',
      visible: true,
      order: 1,
      data: {
        email: 'john.doe@email.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        linkedin: 'linkedin.com/in/johndoe',
        github: 'github.com/johndoe',
        website: 'johndoe.dev',
      } as ContactData,
    },
    {
      id: generateId(),
      type: 'summary',
      title: 'Professional Summary',
      visible: true,
      order: 2,
      data: {
        text: 'Passionate software engineer with 8+ years of experience building scalable web applications. Proficient in Angular, TypeScript, and cloud architectures. Led teams of 5-10 engineers to deliver products used by millions.',
      } as SummaryData,
    },
    {
      id: generateId(),
      type: 'experience',
      title: 'Work Experience',
      visible: true,
      order: 3,
      data: {
        items: [
          {
            id: generateId(),
            company: 'Tech Corp Inc.',
            role: 'Senior Software Engineer',
            startDate: 'Jan 2021',
            endDate: 'Present',
            description:
              'Led development of a customer-facing dashboard serving 2M+ users. Architected micro-frontend migration reducing build times by 60%. Mentored 4 junior engineers through structured code review process.',
          },
          {
            id: generateId(),
            company: 'StartupXYZ',
            role: 'Full Stack Developer',
            startDate: 'Jun 2018',
            endDate: 'Dec 2020',
            description:
              'Built real-time collaboration features using WebSockets. Designed REST APIs handling 10K+ requests/sec. Implemented CI/CD pipeline reducing deployment time from 2 hours to 15 minutes.',
          },
        ],
      } as ExperienceData,
    },
    {
      id: generateId(),
      type: 'education',
      title: 'Education',
      visible: true,
      order: 4,
      data: {
        items: [
          {
            id: generateId(),
            school: 'University of California, Berkeley',
            degree: 'B.S. Computer Science',
            startDate: '2014',
            endDate: '2018',
            gpa: '3.8',
          },
        ],
      } as EducationData,
    },
    {
      id: generateId(),
      type: 'skills',
      title: 'Skills',
      visible: true,
      order: 5,
      data: {
        categories: [
          {
            name: 'Languages',
            skills: ['TypeScript', 'JavaScript', 'Python', 'Java', 'SQL'],
          },
          {
            name: 'Frameworks',
            skills: ['Angular', 'React', 'Node.js', 'Express', 'Spring Boot'],
          },
          {
            name: 'Tools',
            skills: ['Git', 'Docker', 'Kubernetes', 'AWS', 'PostgreSQL'],
          },
        ],
      } as SkillsData,
    },
    {
      id: generateId(),
      type: 'projects',
      title: 'Projects',
      visible: true,
      order: 6,
      data: {
        items: [
          {
            id: generateId(),
            name: 'Open Source CLI Tool',
            description:
              'Built a developer productivity CLI tool with 2K+ GitHub stars. Automates common workflows and integrates with popular CI/CD platforms.',
            link: 'github.com/johndoe/cli-tool',
            technologies: 'TypeScript, Node.js, Commander.js',
          },
        ],
      } as ProjectsData,
    },
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
