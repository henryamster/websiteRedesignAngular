import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor() { }
  workExperiences: workExperience[]
  expandSocialAndBio:boolean=false;

  ngOnInit(): void {
    this["workExperiences"]= this["WORK_EXPERIENCE_ARRAY"]
  }

  COURSE_LIST =[
[
    'Project Management',
    'Business Programming',
    'Databases',
    'System Design & Analysis',
    'Management',
    'Accounting',
    'Business Law',
    'Microeconomics','Macroeconomics',
    'Statistics',
    'Managerial Reporting',
    'Data Mining',
    'Forensic Computing',
    'Networking',
    '3D Printing',
    'Business Strategy',
    'Advanced Networking',
  'Marketing']
  ,
  [
    'Chemistry',
    'Geology',
    'Plate Tectonics',
    'Calculus',
    'Ethics',
    'English Composition',
    'French Film',
    'Linguistics',
    'Sociology',
    'Political Science',
    'Program Design: Algorithms',
    'Asian Philosophy',

  ]
  ]

  INTERESTS:string[]=[
    "Web Design",
    "Web Development",
    "3D Motion Graphics",
     "3D Parametric Modeling",
     "Automation",
     "Machine Learning in Computer Graphics",
     "Graphic Design",
     "Procedural & Generative Art",
      "Computer Vision",
      "Data Analytics", "Systems Design",
      "Database Modeling", "Javascript",
      "TypeScript", "Python",
       "A/V Production/Engineering",
       "Pen Testing", "Data Scraping",

  ]

  WORK_EXPERIENCE_ARRAY: workExperience[] = [
    {
      logo: './../../assets/TRClogo.png',
      organization: `EKU Training Resource Center`,
      positions: [`Sr. Programmer Analyst`],
      employmentDurations: [`November 2019- Current`],
      responsibilities: [
        'Front-End Development',
        'Back-End Development',
        'Linux Server Configuration & Administration',
        'Windows Server Configuration & Administration',
        'Managing Git Repositories',
        'Overseeing Deployments',
        'Working Directly With End-Users for Requirements',
        'Maintaining Security Certificates',
        'Monitoring and Managing Virtual Infrastructure',
        'Training Videos',
        'Mockup Creation',
        'Dropping Out Of Zoom Calls for 5-10 Seconds As my Starlink Dishy Finds a New Satellite'
      ],
      techStack: [
        'Angular',
        'Angular Material',
        'Typescript',
        'RxJS',
        'C#',
        'dotnet',
        'EntityFramework',
        'PHP',
        'SQL',
        'Bash',

      ]
    },
    {
      organization: 'Meijer',
      logo: './../../assets/meijer.png',
      positions: ['Cloud Infrastructure Intern', 'Electronics Manager', 'General Merchandise Manager', 'Sales Clerk', 'Produce Clerk']
      , employmentDurations: ['April 2019- August 2019', 'November 2017-April 2019', 'June 2012-September 2015'],
      responsibilities: [
        'Creating an End-to-End System for Naming Azure Cloud Resources',
        'Learning the Azure Cloud Ecosystem',
        'Creating an App with that Creates ARM Templates for use with the Azure CLI'
        , 'Making Sure Everyone Takes Their Breaks',
        'Stacking Fruits & Veggies',
        'Tarping Plants in September',
        'Writing Employees Up For Not Tucking Their Shirt In (Just kidding! I never did this!)'
      ],
      techStack: [
        'Azure',
        'Azure CLI',
        'Powershell',
        'Javascript',
        'Node',
        'Express',
        'OAuth',
        'bulmaCSS'
      ]
    },
    {
      organization: 'Habitat for Humanity of Madison & Clark ',
      logo: './../../assets/h4h.png',
      positions: ['Web Designer/Developer'],
      employmentDurations: ['September 2018- April 2019'],
      responsibilities: [
        'Wireframing',
        'Fully Custom Theme Design with Wordpress',
        'Website Administration',
        'Content',
        'Video & Graphic Design work'
      ],
      techStack: ['PHP'
        , 'Wordpress',
        'SCSS',
        "_underscores",
        'Javascript',
        'mysql',
        'DNS',
        'Hosting'
        ]
    },
    {
      organization: 'Henry Fritz Design & Development',
      logo: './../../assets/me.png',
      employmentDurations: ['September 2015-Current'],
      positions: ['Freelance Systems Consulting', 'Freelance Web Design', 'Motion Graphics Artist', 'Freelance Graphic Design',
        'Audio/Video Editing'],
      responsibilities: ['Do whatever I feel!'],
      techStack: ["Blender", "Adobe Creative Suite", "p5js", "ml5js", "python", "collab", "TypeScript",
        "FireBase", "Vue", "Angular", "THREEjs", "Azure", "AWS", "Nest", "Bash", "Powershell"]
    }
  ]

}

interface workExperience {
  organization?: string;
  positions?: string[];
  employmentDurations?: string[];
  responsibilities?: string[];
  techStack: string[];
  logo?:string;
}
