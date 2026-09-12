export interface SiteSettings {
  id?: string;
  brandName: string;
  ownerName: string;
  professionalTitle: string;
  tagline?: string;
  email: string;
  phone: string;
  whatsapp: string;
  contactEmail?: string;
  contactPhone?: string;
  whatsappNumber?: string;
  location: string;
  shortBio: string;
  cvUrl: string;
  profileImage: string;
  primaryAccent: string; // e.g. "#f97316"
  secondaryAccent: string; // e.g. "#eab308"
  backgroundColor: string; // e.g. "#080808"
  updatedAt?: string;
}

export interface HeroContent {
  id?: string;
  badge: string;
  mainHeading: string;
  highlightedText: string;
  description: string;
  profileImage: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  trustPills: string[];
}

export interface AboutContent {
  id?: string;
  heading: string;
  subheading: string;
  bioParagraph1: string;
  bioParagraph2: string;
  profileImage: string;
  approach: string;
  cvUrl: string;
  stats: {
    label: string;
    value: string;
    suffix?: string;
  }[];
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  icon: string;
  features: string[];
  image?: string;
  displayOrder: number;
  published: boolean;
}

export interface ProcessStep {
  id: string;
  stepNumber: string; // e.g. "01"
  title: string;
  description: string;
  displayOrder: number;
  published: boolean;
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'Digital Marketing' | 'Creative' | 'Tools';
  percentage: number;
  icon?: string;
  displayOrder: number;
  published: boolean;
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  employmentType: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
  logoUrl?: string;
  displayOrder: number;
  published: boolean;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  startYear: string;
  endYear: string;
  description: string;
  displayOrder: number;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuingOrg: string;
  date: string;
  credentialId?: string;
  certificateUrl?: string;
  imageUrl?: string;
  displayOrder: number;
}

export interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  category: string; // e.g. "Social Media", "SEO", "Content Marketing", "Paid Advertising", "Campaigns"
  client: string;
  date: string;
  shortDescription: string;
  fullDescription: string;
  challenge: string;
  strategy: string;
  execution: string;
  results: string;
  metrics?: { label: string; value: string }[];
  services: string[];
  tools: string[];
  coverImage: string;
  gallery: string[];
  projectUrl?: string;
  caseStudyUrl?: string;
  featured: boolean;
  published: boolean;
  displayOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ResultMetric {
  id: string;
  number?: string;
  prefix?: string;
  suffix?: string;
  label?: string;
  metricValue?: string;
  metricLabel?: string;
  description: string;
  icon?: string;
  published?: boolean;
  displayOrder: number;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  clientPosition?: string;
  role?: string;
  company: string;
  profileImage?: string;
  avatar?: string;
  rating: number; // 1 to 5
  testimonial?: string;
  quote?: string;
  result?: string;
  date?: string;
  featured?: boolean;
  published: boolean;
  displayOrder: number;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  message: string;
  status: 'unread' | 'read' | 'replied' | 'archived';
  createdAt: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  label?: string;
  enabled?: boolean;
  published?: boolean;
  displayOrder: number;
}

export interface NavigationLink {
  id: string;
  label: string;
  url: string;
  isExternal: boolean;
  visible: boolean;
  displayOrder: number;
}

export interface PageSectionConfig {
  id: string;
  name: string;
  title?: string;
  enabled?: boolean;
  visible?: boolean;
  displayOrder: number;
}

export interface SeoSettings {
  id?: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string | string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  canonicalUrl?: string;
  robots?: string;
}

export interface MediaFile {
  id: string;
  name: string;
  type: string;
  url: string;
  size: number;
  createdAt: string;
}
