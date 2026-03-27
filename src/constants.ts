import { 
  Briefcase, 
  FileText, 
  Users, 
  GraduationCap, 
  Building2, 
  Monitor, 
  Wallet, 
  TrendingUp, 
  Database,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Star,
  MessageCircle,
  ChevronUp,
  Search,
  Menu,
  X
} from 'lucide-react';

export interface Job {
  id: string;
  title: string;
  company: string;
  category: string;
  location: string;
  locationDetail: string;
  salary: string;
  type: string;
  skills: string[];
  date: string;
  initial: string;
}

export const LATEST_JOBS: Job[] = [
  {
    id: '1',
    title: 'ADMINISTRATION OFFICER FOR STEEL PLANT',
    company: 'Steel Plant',
    category: 'Office Administration',
    location: 'TILDA , CHHATTISGARH',
    locationDetail: 'Tilda',
    salary: '3.00 LPA TO 3.60 LPA',
    type: 'Full Time',
    skills: ['Office Administration', 'Inventory Management', 'Procurement'],
    date: '26th Mar, 2026',
    initial: 'T'
  },
  {
    id: '2',
    title: 'SENIOR ACCOUNTANT FOR MANUFACTURING',
    company: 'Manufacturing Co.',
    category: 'Banking & Finance',
    location: 'RAIPUR , CHHATTISGARH',
    locationDetail: 'Raipur',
    salary: '4.50 LPA TO 6.00 LPA',
    type: 'Full Time',
    skills: ['Tally Prime', 'GST Filing', 'Audit'],
    date: '25th Mar, 2026',
    initial: 'A'
  },
  {
    id: '3',
    title: 'SALES MANAGER FOR REAL ESTATE',
    company: 'Real Estate Group',
    category: 'Sales & Marketing',
    location: 'BHILAI , CHHATTISGARH',
    locationDetail: 'Bhilai',
    salary: '5.00 LPA TO 8.00 LPA',
    type: 'Full Time',
    skills: ['Lead Generation', 'Negotiation', 'CRM'],
    date: '24th Mar, 2026',
    initial: 'S'
  },
  {
    id: '4',
    title: 'HR RECRUITER FOR CONSULTANCY',
    company: 'KBD Consultancy',
    category: 'Management',
    location: 'RAIPUR , CHHATTISGARH',
    locationDetail: 'Raipur',
    salary: '2.40 LPA TO 3.60 LPA',
    type: 'Full Time',
    skills: ['Sourcing', 'Interviewing', 'Onboarding'],
    date: '23rd Mar, 2026',
    initial: 'H'
  },
  {
    id: '5',
    title: 'BACK OFFICE EXECUTIVE',
    company: 'Corporate Services',
    category: 'Back Office',
    location: 'RAIPUR , CHHATTISGARH',
    locationDetail: 'Raipur',
    salary: '1.80 LPA TO 2.40 LPA',
    type: 'Full Time',
    skills: ['MS Excel', 'Data Entry', 'Documentation'],
    date: '22nd Mar, 2026',
    initial: 'B'
  },
  {
    id: '6',
    title: 'IT SUPPORT ENGINEER',
    company: 'Tech Solutions',
    category: 'IT Jobs',
    location: 'RAIPUR , CHHATTISGARH',
    locationDetail: 'Raipur',
    salary: '3.00 LPA TO 4.80 LPA',
    type: 'Full Time',
    skills: ['Networking', 'Hardware', 'Troubleshooting'],
    date: '21st Mar, 2026',
    initial: 'I'
  }
];

export const FAQS = [
  {
    question: 'Is my data safe on KBDFinnotech.com?',
    answer: 'Yes, your data is completely safe with us. We use industry-standard encryption and security protocols to protect your personal information.'
  },
  {
    question: 'What is KBDFinnotech.com?',
    answer: 'KBDFinnotech.com is an online job portal that connects job seekers with verified employers. You can search jobs by city, category, experience, and apply directly — all for free.'
  },
  {
    question: 'I forgot my login password — how can I reset it?',
    answer: 'You can reset your password by clicking on the "Forgot Password" link on the login page. We will send you an email with instructions to reset it.'
  },
  {
    question: 'How do I find jobs near me on KBDFinnotech.com?',
    answer: 'You can use the search bar on our homepage to filter jobs by location. Simply enter your city or area to see relevant listings.'
  },
  {
    question: 'Can I filter jobs near me based on salary or experience?',
    answer: 'Yes, our advanced search filters allow you to narrow down your search based on salary range, experience level, job type, and more.'
  },
  {
    question: 'Do I need to register to see jobs near me?',
    answer: 'No, you can browse all available jobs without registering. However, to apply for a job and receive personalized alerts, you will need to create an account.'
  }
];

export const SERVICES = [
  {
    title: 'Job Placement',
    description: 'Connecting you with top-tier companies across various industries.',
    icon: Briefcase
  },
  {
    title: 'Resume Building',
    description: 'Professional resume crafting to help you stand out from the crowd.',
    icon: FileText
  },
  {
    title: 'Interview Preparation',
    description: 'Mock interviews and expert tips to boost your confidence.',
    icon: Users
  },
  {
    title: 'Career Guidance',
    description: 'Personalized advice to map out your long-term career path.',
    icon: GraduationCap
  },
  {
    title: 'Bulk Hiring Solutions',
    description: 'Efficient recruitment services for organizations of all sizes.',
    icon: Building2
  }
];

export const CATEGORIES = [
  { name: 'IT Jobs', icon: Monitor },
  { name: 'Banking & Finance', icon: Wallet },
  { name: 'Sales & Marketing', icon: TrendingUp },
  { name: 'Back Office', icon: Database }
];

export const TESTIMONIALS = [
  {
    name: 'Rahul Sharma',
    role: 'Software Engineer',
    content: 'KBD FINNOTECH helped me land my dream job in Raipur. Their process was incredibly smooth and professional.',
    rating: 5
  },
  {
    name: 'Priya Verma',
    role: 'Bank Manager',
    content: 'The career guidance I received was life-changing. I highly recommend their services to anyone looking for growth.',
    rating: 5
  },
  {
    name: 'Amit Patel',
    role: 'Sales Head',
    content: 'Excellent placement support and very helpful team. They truly care about your career success.',
    rating: 4
  }
];
