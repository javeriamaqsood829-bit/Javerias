import {
  SiteSettings,
  HeroContent,
  AboutContent,
  ServiceItem,
  ProcessStep,
  SkillItem,
  ExperienceItem,
  EducationItem,
  CertificationItem,
  ProjectItem,
  ResultMetric,
  TestimonialItem,
  SocialLink,
  NavigationLink,
  PageSectionConfig,
  SeoSettings,
} from '../types/portfolio';

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  brandName: 'SOMA',
  ownerName: 'Soma',
  professionalTitle: 'Senior Digital Marketing & Growth Strategist',
  email: 'soma.marketing@gmail.com',
  phone: '+1 (555) 782-3901',
  whatsapp: '+15557823901',
  location: 'New York, NY / Remote',
  shortBio: 'Helping high-growth brands and scale-ups turn digital strategy into measurable pipeline, loyal communities, and sustainable revenue.',
  cvUrl: '#',
  profileImage: '/images/soma_hero_portrait_1789197660720.jpg',
  faviconUrl: '/favicon.svg',
  brandLogoUrl: '/favicon.svg',
  primaryAccent: '#f97316',
  secondaryAccent: '#eab308',
  backgroundColor: '#080808',
};

export const DEFAULT_HERO: HeroContent = {
  badge: 'DIGITAL MARKETING PROFESSIONAL',
  mainHeading: 'TURNING DIGITAL STRATEGY',
  highlightedText: 'INTO REAL GROWTH.',
  description:
    'I help brands build a stronger digital presence through strategic marketing, engaging content, social media, SEO, and conversion-focused digital solutions.',
  profileImage: '/images/soma_hero_portrait_1789197660720.jpg',
  primaryCtaText: 'View My Work',
  primaryCtaLink: '#projects',
  secondaryCtaText: "Let's Work Together",
  secondaryCtaLink: '#contact',
  trustPills: ['Social Media', 'SEO & Authority', 'Content Strategy', 'Brand Growth'],
};

export const DEFAULT_ABOUT: AboutContent = {
  heading: 'ABOUT SOMA',
  subheading: 'Where Analytical Rigor Meets High-Performance Creative Execution',
  bioParagraph1:
    'With over 7 years at the intersection of consumer psychology, paid performance, and organic growth, I build marketing ecosystems that compound over time rather than relying on one-off spikes.',
  bioParagraph2:
    'My philosophy centers on full-funnel coherence: ensuring that every impression, click, landing page interaction, and email drip is engineered to maximize customer lifetime value and lower blended CAC.',
  profileImage: '/images/soma_about_portrait_1789197673991.jpg',
  imageAlt: 'Soma – Marketing Strategy Session',
  imageCaption: '• Analytics & Creative Performance Studio — New York & Global Remote',
  approachTitle: 'The Growth Philosophy',
  approach: 'Creative intuition guided by cohort analytics, conversion rate optimization, and relentless A/B testing.',
  philosophyBullets: [
    'Dual Creative & Quantitative Core',
    'Unit Economics & Blended CAC Focus',
    'Rapid Omnichannel Experimentation',
    'Long-Term Brand Equity Compounding',
  ],
  contactCtaText: 'Discuss Your Growth Targets',
  contactCtaLink: '#contact',
  cvButtonText: 'Download Professional CV',
  cvUrl: '#',
  stats: [
    { label: 'Projects Completed', value: '140', suffix: '+' },
    { label: 'Happy Clients', value: '65', suffix: '+' },
    { label: 'Years of Experience', value: '7', suffix: '+' },
    { label: 'Digital Campaigns', value: '320', suffix: '+' },
  ],
};

export const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: 's1',
    title: 'Social Media Marketing & Management',
    shortDescription: 'Multi-platform social architectures engineered to build cult-like community followings and brand equity.',
    longDescription:
      'From TikTok & Reels vertical content production to LinkedIn thought-leadership calendars, we craft narrative arcs that capture attention and convert lurkers into vocal advocates.',
    icon: 'Share2',
    features: ['Content Production & Storyboarding', 'Community Engagement & Moderation', 'Influencer Seeding & Whitelisting', 'Social Listening & Trendjacking'],
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80',
    displayOrder: 1,
    published: true,
  },
  {
    id: 's2',
    title: 'SEO & Search Engine Domination',
    shortDescription: 'Technical optimization and authoritative content clusters designed to capture commercial intent keywords.',
    longDescription:
      'We do not chase vanity keywords. We execute semantic SEO, technical site hygiene audits, and digital PR link velocity campaigns that position your domain on page one for buyer queries.',
    icon: 'Search',
    features: ['Technical Site Architecture & Core Web Vitals', 'Topic Clusters & Pillar Page Strategy', 'Competitor Gap & Intent Analysis', 'Authoritative Editorial Backlink Sourcing'],
    image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?auto=format&fit=crop&w=800&q=80',
    displayOrder: 2,
    published: true,
  },
  {
    id: 's3',
    title: 'Performance Paid Advertising (PPC & Meta)',
    shortDescription: 'Scalable paid traffic across Meta, Google Ads, TikTok, and YouTube with surgical audience segmentation.',
    longDescription:
      'Eliminate ad fatigue and wasted spend. We build modular creative testing sandboxes, lookalike models, and dynamic retargeting arrays optimized directly for bottom-line ROAS and contribution margin.',
    icon: 'Target',
    features: ['Meta Ads (Facebook & Instagram) Scaled Spend', 'Google Search & PMax High-Intent Capture', 'UGC Creative Direction & Iteration', 'Server-Side CAPI & Offline Conversion Tracking'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    displayOrder: 3,
    published: true,
  },
  {
    id: 's4',
    title: 'Content Strategy & Brand Storytelling',
    shortDescription: 'High-converting editorial, video, and email funnels that turn casual browsers into loyal customers.',
    longDescription:
      'Content without distribution is noise; distribution without compelling narrative is spam. We craft omni-channel content roadmaps tailored to each micro-stage of the buyer journey.',
    icon: 'PenTool',
    features: ['Omnichannel Content Calendars', 'Long-form Case Studies & Whitepapers', 'Scriptwriting for Short-form Video', 'Brand Voice & Tone Guidelines'],
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80',
    displayOrder: 4,
    published: true,
  },
  {
    id: 's5',
    title: 'Email & Retention Lifecycle Marketing',
    shortDescription: 'Automated Klaviyo & HubSpot customer journeys delivering repeat purchases and high lifetime value.',
    longDescription:
      'Maximize the enterprise value of every acquired lead. We implement behavioral triggers, cart abandonment sequences, VIP loyalty flows, and win-back campaigns that produce 30%+ of total revenue.',
    icon: 'Mail',
    features: ['Automated Welcome & Abandonment Flows', 'Predictive LTV Segmentation', 'Plain-text & Rich HTML Campaign Design', 'Deliverability & Domain Reputation Management'],
    image: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&w=800&q=80',
    displayOrder: 5,
    published: true,
  },
  {
    id: 's6',
    title: 'Analytics, CRO & Growth Modeling',
    shortDescription: 'Deep-funnel tracking, GA4 telemetry, Heatmapping, and rigorous CRO to elevate page conversions.',
    longDescription:
      'Data-driven decisions supersede guesswork. We conduct heuristic UX reviews, multivariate split testing on checkout funnels, and build custom Looker Studio dashboards for executive visibility.',
    icon: 'BarChart3',
    features: ['GA4 & Google Tag Manager Custom Events', 'Heatmap & Session Recording Diagnostics', 'Landing Page A/B Split Testing', 'Executive Real-Time Dashboard Reporting'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    displayOrder: 6,
    published: true,
  },
];

export const DEFAULT_PROCESS: ProcessStep[] = [
  {
    id: 'p1',
    stepNumber: '01',
    title: 'Research & Audit',
    description: 'Deep dive into historical data, audience psychographics, competitor vulnerability gaps, and baseline funnel metrics.',
    displayOrder: 1,
    published: true,
  },
  {
    id: 'p2',
    stepNumber: '02',
    title: 'Strategy Formulation',
    description: 'Developing the integrated roadmap: channel prioritization, positioning hooks, budget allocation, and creative hypotheses.',
    displayOrder: 2,
    published: true,
  },
  {
    id: 'p3',
    stepNumber: '03',
    title: 'Content & Campaign Creation',
    description: 'Writing high-converting copy, developing visual assets, configuring tracking pixels, and engineering landing pages.',
    displayOrder: 3,
    published: true,
  },
  {
    id: 'p4',
    stepNumber: '04',
    title: 'Execution & Launch',
    description: 'Controlled rollouts across target channels, real-time bid monitoring, and quality assurance on tracking webhooks.',
    displayOrder: 4,
    published: true,
  },
  {
    id: 'p5',
    stepNumber: '05',
    title: 'Data & Attribution Analysis',
    description: 'Cohort tracking, blended ROAS calculations, channel incrementality analysis, and qualitative session feedback review.',
    displayOrder: 5,
    published: true,
  },
  {
    id: 'p6',
    stepNumber: '06',
    title: 'Continuous Optimization',
    description: 'Doubling down on winning angles, iterating underperforming ad variants, and expanding into auxiliary lookalike audiences.',
    displayOrder: 6,
    published: true,
  },
];

export const DEFAULT_SKILLS: SkillItem[] = [
  // Digital Marketing
  { id: 'sk1', name: 'Social Media Marketing', category: 'Digital Marketing', percentage: 95, icon: 'Share2', displayOrder: 1, published: true },
  { id: 'sk2', name: 'Search Engine Optimization (SEO)', category: 'Digital Marketing', percentage: 92, icon: 'Search', displayOrder: 2, published: true },
  { id: 'sk3', name: 'Paid Ads (Meta, Google, TikTok)', category: 'Digital Marketing', percentage: 94, icon: 'Target', displayOrder: 3, published: true },
  { id: 'sk4', name: 'Email & Lifecycle Automation', category: 'Digital Marketing', percentage: 90, icon: 'Mail', displayOrder: 4, published: true },
  { id: 'sk5', name: 'Growth & Funnel CRO', category: 'Digital Marketing', percentage: 88, icon: 'TrendingUp', displayOrder: 5, published: true },
  // Creative
  { id: 'sk6', name: 'Direct Response Copywriting', category: 'Creative', percentage: 93, icon: 'FileText', displayOrder: 6, published: true },
  { id: 'sk7', name: 'Visual Direction & Ad Creative', category: 'Creative', percentage: 88, icon: 'Image', displayOrder: 7, published: true },
  { id: 'sk8', name: 'Brand Storytelling & Strategy', category: 'Creative', percentage: 91, icon: 'Award', displayOrder: 8, published: true },
  { id: 'sk9', name: 'Short-Form Video Ideation', category: 'Creative', percentage: 89, icon: 'Video', displayOrder: 9, published: true },
  // Tools
  { id: 'sk10', name: 'Google Analytics 4 (GA4)', category: 'Tools', percentage: 96, icon: 'BarChart2', displayOrder: 10, published: true },
  { id: 'sk11', name: 'Meta Business Suite & Ads Mgr', category: 'Tools', percentage: 95, icon: 'Layers', displayOrder: 11, published: true },
  { id: 'sk12', name: 'Google Ads & Search Console', category: 'Tools', percentage: 92, icon: 'Globe', displayOrder: 12, published: true },
  { id: 'sk13', name: 'Klaviyo & HubSpot CRM', category: 'Tools', percentage: 90, icon: 'Inbox', displayOrder: 13, published: true },
  { id: 'sk14', name: 'Ahrefs & SEMrush', category: 'Tools', percentage: 91, icon: 'Search', displayOrder: 14, published: true },
  { id: 'sk15', name: 'Figma & Adobe Creative Cloud', category: 'Tools', percentage: 86, icon: 'PenTool', displayOrder: 15, published: true },
];

export const DEFAULT_EXPERIENCE: ExperienceItem[] = [
  {
    id: 'exp1',
    company: 'Apex Growth Collective',
    position: 'VP of Performance & Growth Marketing',
    employmentType: 'Full-Time',
    startDate: '2023',
    endDate: 'Present',
    location: 'San Francisco, CA',
    description: 'Leading digital acquisition and organic strategy for a portfolio of venture-backed Series A and B enterprise SaaS and DTC consumer brands.',
    responsibilities: [
      'Managing $4.2M+ in annual omnichannel digital ad spend with strict contribution margin targets',
      'Directing a team of 8 performance media buyers, copywriters, and conversion designers',
      'Implementing predictive retention funnels across CRM and proprietary email automations',
    ],
    achievements: [
      'Scaled average client ROAS from 1.8x to 3.4x within 6 months of onboarding',
      'Pioneered internal UGC creative testing pipeline producing 40+ ad variants weekly',
      'Drove $18M+ in attributed client revenue across 14 enterprise accounts',
    ],
    technologies: ['Meta Ads', 'Google Ads', 'GA4', 'Triple Whale', 'HubSpot', 'Shopify Plus'],
    displayOrder: 1,
    published: true,
  },
  {
    id: 'exp2',
    company: 'Vanguard Media Group',
    position: 'Senior Digital Marketing Strategist',
    employmentType: 'Full-Time',
    startDate: '2020',
    endDate: '2023',
    location: 'Austin, TX',
    description: 'Spearheaded full-funnel digital strategy, SEO expansion, and influencer acquisition programs for fast-growing lifestyle brands.',
    responsibilities: [
      'Conducted extensive keyword gap audits and established editorial link velocity programs',
      'Designed high-converting landing pages and conducted multivariate checkout split tests',
      'Architected automated multi-tier influencer gifting and whitelisting initiatives',
    ],
    achievements: [
      'Increased organic non-brand traffic by 340% for flagship health brand over 18 months',
      'Lowered blended CPA by 28% through creative angle diversification on TikTok & Meta',
      'Nominated for Agency Campaign of the Year for viral TikTok sound activation',
    ],
    technologies: ['SEMrush', 'TikTok Ads', 'Klaviyo', 'Unbounce', 'Hotjar'],
    displayOrder: 2,
    published: true,
  },
  {
    id: 'exp3',
    company: 'Catalyst Digital Agency',
    position: 'Digital Marketing & Content Lead',
    employmentType: 'Full-Time',
    startDate: '2018',
    endDate: '2020',
    location: 'Chicago, IL',
    description: 'Managed social media strategy, paid search campaigns, and digital brand development for diverse mid-market retail clients.',
    responsibilities: [
      'Curated content calendars and produced interactive Instagram & Facebook social campaigns',
      'Configured Google Search and Display network campaigns targeting commercial intent',
      'Drafted executive performance reports highlighting CAC, LTV, and churn metrics',
    ],
    achievements: [
      'Grew active client social community by 125,000+ targeted organic followers',
      'Automated client reporting using custom Google Data Studio / Looker Studio portals',
    ],
    technologies: ['Meta Ads', 'Google Analytics', 'Buffer', 'Canva', 'WordPress'],
    displayOrder: 3,
    published: true,
  },
];

export const DEFAULT_EDUCATION: EducationItem[] = [
  {
    id: 'edu1',
    degree: 'B.S. in Marketing & Behavioral Economics',
    institution: 'University of Texas at Austin',
    startYear: '2014',
    endYear: '2018',
    description: 'Specialized in quantitative consumer decision modeling, digital communication systems, and statistics.',
    displayOrder: 1,
  },
];

export const DEFAULT_CERTIFICATIONS: CertificationItem[] = [
  {
    id: 'cert1',
    name: 'Google Analytics 4 (GA4) Certification',
    issuingOrg: 'Google Skillshop',
    date: '2025',
    credentialId: 'GA4-992014-ADV',
    certificateUrl: 'https://skillshop.exceedlms.com',
    displayOrder: 1,
  },
  {
    id: 'cert2',
    name: 'Meta Certified Media Buying Professional',
    issuingOrg: 'Meta Blueprint',
    date: '2025',
    credentialId: 'META-BUY-8812',
    certificateUrl: 'https://www.facebook.com/business/learn/certification',
    displayOrder: 2,
  },
  {
    id: 'cert3',
    name: 'HubSpot Inbound & Email Marketing Certified',
    issuingOrg: 'HubSpot Academy',
    date: '2024',
    credentialId: 'HS-INB-7741',
    certificateUrl: 'https://academy.hubspot.com',
    displayOrder: 3,
  },
  {
    id: 'cert4',
    name: 'Google Search Ads & Shopping Specialist',
    issuingOrg: 'Google Ads Certification',
    date: '2024',
    credentialId: 'GOOG-ADS-5501',
    certificateUrl: 'https://skillshop.exceedlms.com',
    displayOrder: 4,
  },
];

export const DEFAULT_PROJECTS: ProjectItem[] = [
  {
    id: 'proj1',
    title: 'Scaling DTC Wellness Brand to $4.8M with Omnichannel Paid Media',
    slug: 'scaling-dtc-wellness-brand',
    category: 'Paid Advertising',
    client: 'Lumina Health & Wellness',
    date: 'Q3 2025',
    shortDescription: 'Revamping an inefficient Meta ad account with modular UGC angle testing, lowering CPA by 38% and scaling revenue 3.2x.',
    fullDescription:
      'Lumina Health was struggling with climbing customer acquisition costs and ad fatigue across their core Meta ad account. We stepped in to reconstruct their media buying structure, creative testing workflow, and post-click landing page funnel.',
    challenge:
      'Lumina relied heavily on static founder graphics that ceased converting as iOS privacy changes degraded audience targeting. Blended CAC had jumped from $42 to $78, making unit economics unsustainable.',
    strategy:
      'We introduced a modular Creative Sandboxing framework: testing 5 distinct hook angles across 3 UGC creator demographics weekly. Concurrently, we built custom advertorial pre-sell landing pages that educated skeptical prospects prior to the product purchase page.',
    execution:
      'Implemented CAPI server-side tracking, deployed 35 UGC video ad variations, launched segmented Google Search intent campaigns to capture brand spillover, and rebuilt their Klaviyo abandoned cart sequence into a 4-part founder story arc.',
    results:
      'Achieved a 3.4x average ROAS at scale, slashed customer acquisition cost by 38% from $78 to $48.20, and drove $4.8M in annual revenue while maintaining a healthy 28% EBITDA margin.',
    metrics: [
      { label: 'Revenue Growth', value: '+320%' },
      { label: 'CPA Reduction', value: '-38%' },
      { label: 'Blended ROAS', value: '3.4x' },
      { label: 'New Customers', value: '62,000+' },
    ],
    services: ['Performance Paid Media', 'Creative Direction', 'CRO Landing Pages', 'Klaviyo Retention'],
    tools: ['Meta Ads', 'Google Ads', 'Triple Whale', 'Shopify Plus', 'Klaviyo'],
    coverImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    ],
    projectUrl: 'https://luminahealth.example.com',
    featured: true,
    published: true,
    displayOrder: 1,
  },
  {
    id: 'proj2',
    title: 'B2B FinTech Organic Traffic Domination: 0 to 450k Monthly Search Visits',
    slug: 'fintech-seo-organic-domination',
    category: 'SEO',
    client: 'VaultFlow Technologies',
    date: 'Q1 2025',
    shortDescription: 'Building high-intent semantic content clusters and technical SEO architecture that elevated high-intent enterprise pipeline.',
    fullDescription:
      'VaultFlow provides treasury management APIs for venture-backed companies. They possessed an outstanding technical product but virtually zero organic inbound visibility, relying exclusively on expensive outbound SDR cadences.',
    challenge:
      'Finance and banking keywords are dominated by legacy institutions like Forbes Advisor and Investopedia. Competing on generic head terms was impossible within their timeline and budget.',
    strategy:
      'We bypassed generic terms and executed a programmatic "Bottom-of-Funnel" keyword strategy targeting high-intent developer and CFO problem terms (e.g. "multi-entity cash sweep automation api"). We paired this with high-authority original research reports.',
    execution:
      'Authored 45 technical comparison and integration guides, cleared 180+ Core Web Vitals crawl errors, and earned 85 tier-one editorial backlinks from TechCrunch, VentureBeat, and fintech journals through digital PR data storytelling.',
    results:
      'Organic organic traffic surged from 14,000 to 450,000+ monthly visits. Organic search became VaultFlows #1 pipeline source, generating 480+ qualified enterprise demo requests per quarter.',
    metrics: [
      { label: 'Organic Traffic', value: '+3,100%' },
      { label: 'Tier 1 Backlinks', value: '85+' },
      { label: 'Quarterly SQLs', value: '480+' },
      { label: 'Pipeline Value', value: '$12.4M' },
    ],
    services: ['Technical SEO Audit', 'Topic Cluster Strategy', 'Digital PR & Link Earning', 'CRO Consultation'],
    tools: ['Ahrefs', 'Google Search Console', 'Screaming Frog', 'Clearscope', 'HubSpot'],
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80',
    ],
    projectUrl: 'https://vaultflow.example.com',
    featured: true,
    published: true,
    displayOrder: 2,
  },
  {
    id: 'proj3',
    title: 'Viral TikTok & Social Commerce Strategy for Gen Z Fashion Brand',
    slug: 'viral-tiktok-social-commerce',
    category: 'Social Media',
    client: 'Kōrero Streetwear',
    date: 'Q4 2024',
    shortDescription: 'Driving 42M+ organic impressions and 18,000 unit sellout through narrative TikTok short-form and influencer whitelisting.',
    fullDescription:
      'Kōrero launched a limited-run sustainable streetwear drop. Rather than traditional lifestyle photoshoots, we designed an episodic behind-the-scenes narrative on TikTok following the garments journey from upcycled textiles to runway.',
    challenge:
      'Streetwear drops suffer from extreme consumer skepticism and short attention spans. Traditional paid banners generate low conversion without intense social proof.',
    strategy:
      'We seeded product samples to 60 micro-creators with unscripted video prompts, turning their candid try-ons into collaborative Spark Ads and organic stitching trends.',
    execution:
      'Produced 72 short-form videos across TikTok, Instagram Reels, and YouTube Shorts. Leveraged TikTok Shop integration and pinned interactive discount triggers linked directly to checkout.',
    results:
      'The collection sold out completely within 4 hours of the drop. The campaign garnered 42 Million organic views and grew Kōreros social followings by 210,000 followers.',
    metrics: [
      { label: 'Organic Views', value: '42M+' },
      { label: 'Sellout Time', value: '4 Hours' },
      { label: 'Follower Growth', value: '+210K' },
      { label: 'Influencer Reach', value: '60 Creators' },
    ],
    services: ['Social Media Strategy', 'Influencer Seeding', 'TikTok Video Direction', 'Spark Ads Management'],
    tools: ['CapCut', 'Meta Business Suite', 'TikTok Ads Manager', 'Shopify'],
    coverImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80',
    ],
    projectUrl: 'https://korerostreet.example.com',
    featured: true,
    published: true,
    displayOrder: 3,
  },
  {
    id: 'proj4',
    title: 'Lifecycle Email Architecture: Generating 34% of Total Shopify Revenue',
    slug: 'retention-email-architecture',
    category: 'Content Marketing',
    client: 'Aura Coffee Roasters',
    date: 'Q2 2024',
    shortDescription: 'Rebuilding subscription onboarding, predictive replenishment triggers, and conversational weekly editorial newsletters.',
    fullDescription:
      'Aura Coffee had high initial customer acquisition but suffered a 45% churn rate on their monthly coffee subscription tier. Email had been neglected, sending only generic promotional blasts once a month.',
    challenge:
      'Subscribers were receiving repeat bags before finishing their current bag, leading to order cancellations. Welcome flows had a low 14% open rate and zero segmentation.',
    strategy:
      'We created a dynamic behavioral quiz determining brew preference and consumption speed. We mapped out 12 automated Klaviyo flows including dynamic brewing tips and personalized skip-order options.',
    execution:
      'Designed bespoke typography-led HTML email templates with zero bloat. Set up smart replenishment reminders calculated on bag weight, and launched the "Sunday Roast" weekly editorial newsletter featuring brewing recipes.',
    results:
      'Email open rates surged to 48%, click-to-open hit 18%, and email revenue increased from 8% to 34% of total shop revenue, reducing subscription cancellation churn by half.',
    metrics: [
      { label: 'Email Revenue Share', value: '34%' },
      { label: 'Open Rate Avg', value: '48%' },
      { label: 'Churn Reduction', value: '-52%' },
      { label: 'Monthly Repeat Orders', value: '+85%' },
    ],
    services: ['Klaviyo Email Automation', 'Customer Journey Mapping', 'Editorial Copywriting', 'Deliverability Optimization'],
    tools: ['Klaviyo', 'Shopify Plus', 'Figma', 'Recharge Subscriptions'],
    coverImage: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80',
    ],
    projectUrl: 'https://auracoffee.example.com',
    featured: false,
    published: true,
    displayOrder: 4,
  },
];

export const DEFAULT_RESULTS: ResultMetric[] = [
  {
    id: 'r1',
    number: '340',
    prefix: '+',
    suffix: '%',
    label: 'Organic Search Traffic Growth',
    description: 'Average traffic lift achieved across client domains within 12 months of technical & content SEO overhaul.',
    icon: 'TrendingUp',
    displayOrder: 1,
  },
  {
    id: 'r2',
    number: '3.4',
    prefix: '',
    suffix: 'x',
    label: 'Blended Paid Media ROAS',
    description: 'Sustained return on advertising spend across Meta, Google, and TikTok paid customer acquisition channels.',
    icon: 'Target',
    displayOrder: 2,
  },
  {
    id: 'r3',
    number: '48',
    prefix: '-',
    suffix: '%',
    label: 'Customer Acquisition Cost (CAC)',
    description: 'Average reduction in blended acquisition cost through conversion rate optimization and creative angle testing.',
    icon: 'Zap',
    displayOrder: 3,
  },
  {
    id: 'r4',
    number: '28',
    prefix: '$',
    suffix: 'M+',
    label: 'Client Revenue Generated',
    description: 'Total trackable digital sales and enterprise contract values driven directly by managed campaigns.',
    icon: 'DollarSign',
    displayOrder: 4,
  },
];

export const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't1',
    clientName: 'Sarah Jenkins',
    clientPosition: 'Chief Marketing Officer',
    role: 'Chief Marketing Officer',
    company: 'Lumina Health & Wellness',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    rating: 5,
    quote:
      'Soma revolutionized our digital growth trajectory. Before partnering with her, our ad spend felt like rolling dice. Within 90 days, she engineered a predictive creative testing engine that scaled us from $150k/mo to over $400k/mo with 3.8x ROAS.',
    testimonial:
      'Soma revolutionized our digital growth trajectory. Before partnering with her, our ad spend felt like rolling dice. Within 90 days, she engineered a predictive creative testing engine that scaled us from $150k/mo to over $400k/mo with 3.8x ROAS.',
    result: '+165% Revenue Scaled in 90 Days (3.8x ROAS)',
    date: 'August 2025',
    featured: true,
    published: true,
    displayOrder: 1,
  },
  {
    id: 't2',
    clientName: 'David Zhang',
    clientPosition: 'Co-Founder & CEO',
    role: 'Co-Founder & CEO',
    company: 'VaultFlow Technologies',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    rating: 5,
    quote:
      'Most marketing consultants talk in vague high-level buzzwords. Soma delivers pure analytical clarity and execution horsepower. Her SEO and conversion architecture now brings us the vast majority of our enterprise sales demos completely inbound.',
    testimonial:
      'Most marketing consultants talk in vague high-level buzzwords. Soma delivers pure analytical clarity and execution horsepower. Her SEO and conversion architecture now brings us the vast majority of our enterprise sales demos completely inbound.',
    result: '82% Inbound Pipeline via Organic SEO',
    date: 'June 2025',
    featured: true,
    published: true,
    displayOrder: 2,
  },
  {
    id: 't3',
    clientName: 'Elena Rostova',
    clientPosition: 'Brand Director',
    role: 'Brand Director',
    company: 'Kōrero Streetwear',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    rating: 5,
    quote:
      'The viral TikTok and Meta creative campaign Soma orchestrated literally shattered our sales records. We sold out 18,000 units within the first 48 hours of launch, dropping our customer acquisition cost by 44%.',
    testimonial:
      'The viral TikTok and Meta creative campaign Soma orchestrated literally shattered our sales records. We sold out 18,000 units within the first 48 hours of launch, dropping our customer acquisition cost by 44%.',
    result: '18,000 Units Sold & -44% CAC Reduction',
    date: 'December 2024',
    featured: true,
    published: true,
    displayOrder: 3,
  },
  {
    id: 't4',
    clientName: 'Marcus Vance',
    clientPosition: 'Head of Growth',
    role: 'Head of Growth',
    company: 'Aura Direct Commerce',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    rating: 5,
    quote:
      'Soma’s email lifecycle retention flows generated over $1.2M in incremental revenue without spending an additional dollar on ads. Her Klaviyo customer segmentations and automated funnel workflows are unparalleled.',
    testimonial:
      'Soma’s email lifecycle retention flows generated over $1.2M in incremental revenue without spending an additional dollar on ads. Her Klaviyo customer segmentations and automated funnel workflows are unparalleled.',
    result: '$1.2M+ Incremental Retention Revenue',
    date: 'November 2025',
    featured: true,
    published: true,
    displayOrder: 4,
  },
  {
    id: 't5',
    clientName: 'Amara Okonjo',
    clientPosition: 'Managing Director',
    role: 'Managing Director',
    company: 'Vanguard Fintech Labs',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80',
    profileImage: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80',
    rating: 5,
    quote:
      'In the heavily regulated fintech space, finding an acquisition strategist who grasps both compliance and high-velocity conversion is rare. Soma cut our cost-per-qualified-lead from $185 to $64 in under two quarters.',
    testimonial:
      'In the heavily regulated fintech space, finding an acquisition strategist who grasps both compliance and high-velocity conversion is rare. Soma cut our cost-per-qualified-lead from $185 to $64 in under two quarters.',
    result: '-65% Cost Per Qualified Lead (CPQL)',
    date: 'September 2025',
    featured: true,
    published: true,
    displayOrder: 5,
  },
  {
    id: 't6',
    clientName: 'Julian Mercer',
    clientPosition: 'VP of Ecommerce',
    role: 'VP of Ecommerce',
    company: 'Apex Performance Optics',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    profileImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    rating: 5,
    quote:
      'From full-funnel GA4 telemetry implementation to multivariate landing page split tests, Soma’s CRO optimizations increased our store checkout conversion rate by +38%. She is an indispensable growth weapon.',
    testimonial:
      'From full-funnel GA4 telemetry implementation to multivariate landing page split tests, Soma’s CRO optimizations increased our store checkout conversion rate by +38%. She is an indispensable growth weapon.',
    result: '+38% Checkout Funnel Conversion Rate',
    date: 'January 2026',
    featured: true,
    published: true,
    displayOrder: 6,
  },
];

export const DEFAULT_SOCIAL_LINKS: SocialLink[] = [
  { id: 'soc1', platform: 'LinkedIn', url: 'https://linkedin.com/in/soma-growth-marketer', label: 'LinkedIn', enabled: true, displayOrder: 1 },
  { id: 'soc2', platform: 'Instagram', url: 'https://instagram.com/soma.growth', label: 'Instagram', enabled: true, displayOrder: 2 },
  { id: 'soc3', platform: 'Twitter', url: 'https://x.com/somagrowth', label: 'X / Twitter', enabled: true, displayOrder: 3 },
  { id: 'soc4', platform: 'YouTube', url: 'https://youtube.com/@somagrowth', label: 'YouTube', enabled: true, displayOrder: 4 },
  { id: 'soc5', platform: 'WhatsApp', url: 'https://wa.me/15557823901', label: 'WhatsApp', enabled: true, displayOrder: 5 },
  { id: 'soc6', platform: 'Email', url: 'mailto:soma.marketing@gmail.com', label: 'Email', enabled: true, displayOrder: 6 },
];

export const DEFAULT_NAVIGATION_LINKS: NavigationLink[] = [
  { id: 'nav1', label: 'Home', url: '#home', isExternal: false, visible: true, displayOrder: 1 },
  { id: 'nav2', label: 'About', url: '#about', isExternal: false, visible: true, displayOrder: 2 },
  { id: 'nav3', label: 'Services', url: '#services', isExternal: false, visible: true, displayOrder: 3 },
  { id: 'nav4', label: 'Process', url: '#process', isExternal: false, visible: true, displayOrder: 4 },
  { id: 'nav5', label: 'Skills', url: '#skills', isExternal: false, visible: true, displayOrder: 5 },
  { id: 'nav6', label: 'Experience', url: '#experience', isExternal: false, visible: true, displayOrder: 6 },
  { id: 'nav7', label: 'Projects', url: '#projects', isExternal: false, visible: true, displayOrder: 7 },
  { id: 'nav8', label: 'Results', url: '#results', isExternal: false, visible: true, displayOrder: 8 },
  { id: 'nav9', label: 'Testimonials', url: '#testimonials', isExternal: false, visible: true, displayOrder: 9 },
  { id: 'nav10', label: 'Contact', url: '#contact', isExternal: false, visible: true, displayOrder: 10 },
];

export const DEFAULT_PAGE_SECTIONS: PageSectionConfig[] = [
  { id: 'sec1', name: 'hero', title: 'Hero Section', enabled: true, displayOrder: 1 },
  { id: 'sec2', name: 'about', title: 'About Me', enabled: true, displayOrder: 2 },
  { id: 'sec3', name: 'services', title: 'Services', enabled: true, displayOrder: 3 },
  { id: 'sec4', name: 'process', title: 'Process', enabled: true, displayOrder: 4 },
  { id: 'sec5', name: 'skills', title: 'Skills & Tools', enabled: true, displayOrder: 5 },
  { id: 'sec6', name: 'experience', title: 'Experience & Timeline', enabled: true, displayOrder: 6 },
  { id: 'sec7', name: 'education', title: 'Education & Certifications', enabled: true, displayOrder: 7 },
  { id: 'sec8', name: 'projects', title: 'Portfolio / Case Studies', enabled: true, displayOrder: 8 },
  { id: 'sec9', name: 'results', title: 'Key Results & Metrics', enabled: true, displayOrder: 9 },
  { id: 'sec10', name: 'testimonials', title: 'Client Testimonials', enabled: true, displayOrder: 10 },
  { id: 'sec11', name: 'cta', title: 'Call To Action Banner', enabled: true, displayOrder: 11 },
  { id: 'sec12', name: 'contact', title: 'Contact Form', enabled: true, displayOrder: 12 },
];

export const DEFAULT_SEO: SeoSettings = {
  metaTitle: 'Soma — Senior Digital Marketer & Growth Strategist',
  metaDescription:
    'Official portfolio of Soma, Senior Digital Marketer & Growth Strategist. Scaling businesses through high-ROAS Meta & Google Ads, data-driven SEO, conversion rate optimization, and omnichannel growth architecture.',
  keywords:
    'somadigitalmarketer, somadigitalmarketer.com, Soma digital marketer, digital marketing expert, growth strategist, performance marketing, SEO specialist, meta ads, google ads, conversion rate optimization, digital marketing consultant',
  ogTitle: 'Soma — Senior Digital Marketer & Growth Strategist',
  ogDescription:
    'Scaling high-growth brands with data-driven Meta & Google Ads, full-funnel SEO, conversion rate optimization, and predictable growth architecture.',
  ogImage: 'https://somadigitalmarketer.com/favicon-512x512.png',
  twitterTitle: 'Soma — Senior Digital Marketer & Growth Strategist',
  twitterDescription:
    'Scaling high-growth brands with data-driven Meta & Google Ads, full-funnel SEO, conversion rate optimization, and predictable growth architecture.',
  canonicalUrl: 'https://somadigitalmarketer.com/',
  robots: 'index, follow',
};
