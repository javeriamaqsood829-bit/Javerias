import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updatePassword,
  updateEmail,
  User,
} from 'firebase/auth';
import { db, auth, handleFirestoreError, OperationType, testConnection } from '../lib/firebase';
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
  ContactMessage,
  SocialLink,
  NavigationLink,
  PageSectionConfig,
  SeoSettings,
} from '../types/portfolio';
import {
  DEFAULT_SITE_SETTINGS,
  DEFAULT_HERO,
  DEFAULT_ABOUT,
  DEFAULT_SERVICES,
  DEFAULT_PROCESS,
  DEFAULT_SKILLS,
  DEFAULT_EXPERIENCE,
  DEFAULT_EDUCATION,
  DEFAULT_CERTIFICATIONS,
  DEFAULT_PROJECTS,
  DEFAULT_RESULTS,
  DEFAULT_TESTIMONIALS,
  DEFAULT_SOCIAL_LINKS,
  DEFAULT_NAVIGATION_LINKS,
  DEFAULT_PAGE_SECTIONS,
  DEFAULT_SEO,
} from '../data/initialData';

export const AUTHORIZED_ADMIN_EMAIL = 'j88125859@gmail.com';
export const AUTHORIZED_ADMIN_EMAILS = [
  'gtpc3820@gmail.com',
  'j88125859@gmail.com',
  'soma.marketing@gmail.com',
];
export const isAuthorizedAdminEmail = (email?: string | null): boolean => {
  if (!email) return false;
  const normalized = email.trim().toLowerCase();
  try {
    const customConfigured = localStorage.getItem('soma_custom_admin_email')?.trim().toLowerCase();
    if (customConfigured && normalized === customConfigured) {
      return true;
    }
  } catch {
    // Graceful fallback
  }
  return AUTHORIZED_ADMIN_EMAILS.some((e) => e.toLowerCase() === normalized);
};
export const DEFAULT_ADMIN_PASSWORD = 'soma2026';

interface PortfolioContextType {
  // Auth
  currentUser: User | null;
  isAdmin: boolean;
  authLoading: boolean;
  authorizedAdminEmail: string;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  signupWithEmail: (email: string, pass: string) => Promise<void>;
  updateAdminPassword: (newPass: string) => Promise<boolean>;
  updateAdminEmail: (newEmail: string) => Promise<boolean>;
  logout: () => Promise<void>;

  // Data
  siteSettings: SiteSettings;
  heroContent: HeroContent;
  aboutContent: AboutContent;
  services: ServiceItem[];
  processSteps: ProcessStep[];
  skills: SkillItem[];
  experience: ExperienceItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  projects: ProjectItem[];
  results: ResultMetric[];
  testimonials: TestimonialItem[];
  messages: ContactMessage[];
  socialLinks: SocialLink[];
  navigationLinks: NavigationLink[];
  pageSections: PageSectionConfig[];
  seoSettings: SeoSettings;
  loading: boolean;
  dbConnected: boolean;

  // Actions
  updateSiteSettings: (settings: Partial<SiteSettings>) => Promise<void>;
  updateHeroContent: (hero: Partial<HeroContent>) => Promise<void>;
  updateAboutContent: (about: Partial<AboutContent>) => Promise<void>;
  updateSeoSettings: (seo: Partial<SeoSettings>) => Promise<void>;

  // Projects CRUD
  saveProject: (project: ProjectItem) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;

  // Services CRUD
  saveService: (service: ServiceItem) => Promise<void>;
  deleteService: (id: string) => Promise<void>;

  // Skills CRUD
  saveSkill: (skill: SkillItem) => Promise<void>;
  deleteSkill: (id: string) => Promise<void>;

  // Experience CRUD
  saveExperience: (exp: ExperienceItem) => Promise<void>;
  deleteExperience: (id: string) => Promise<void>;

  // Education CRUD
  saveEducation: (edu: EducationItem) => Promise<void>;
  deleteEducation: (id: string) => Promise<void>;

  // Certifications CRUD
  saveCertification: (cert: CertificationItem) => Promise<void>;
  deleteCertification: (id: string) => Promise<void>;

  // Testimonials CRUD
  saveTestimonial: (testi: TestimonialItem) => Promise<void>;
  deleteTestimonial: (id: string) => Promise<void>;

  // Process CRUD
  saveProcessStep: (step: ProcessStep) => Promise<void>;
  deleteProcessStep: (id: string) => Promise<void>;

  // Results CRUD
  saveResult: (result: ResultMetric) => Promise<void>;
  deleteResult: (id: string) => Promise<void>;

  // Social & Sections & Nav
  saveSocialLink: (link: SocialLink) => Promise<void>;
  deleteSocialLink: (id: string) => Promise<void>;
  updatePageSections: (sections: PageSectionConfig[]) => Promise<void>;
  updateNavigationLinks: (links: NavigationLink[]) => Promise<void>;

  // Messages
  submitContactMessage: (msg: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>) => Promise<void>;
  updateMessageStatus: (id: string, status: ContactMessage['status']) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;

  // Database Seed
  seedDatabase: () => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem('soma_admin_session') === 'active';
  });
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [adminCustomEmail, setAdminCustomEmail] = useState<string>(() => {
    try {
      return localStorage.getItem('soma_custom_admin_email') || '';
    } catch {
      return '';
    }
  });

  // Content states initialized with localStorage cache fallback or defaults
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    try {
      const c = localStorage.getItem('soma_cache_siteSettings');
      if (c) return { ...DEFAULT_SITE_SETTINGS, ...JSON.parse(c) };
    } catch {}
    return DEFAULT_SITE_SETTINGS;
  });
  const [heroContent, setHeroContent] = useState<HeroContent>(() => {
    try {
      const c = localStorage.getItem('soma_cache_heroContent');
      if (c) return { ...DEFAULT_HERO, ...JSON.parse(c) };
    } catch {}
    return DEFAULT_HERO;
  });
  const [aboutContent, setAboutContent] = useState<AboutContent>(() => {
    try {
      const c = localStorage.getItem('soma_cache_aboutContent');
      if (c) return { ...DEFAULT_ABOUT, ...JSON.parse(c) };
    } catch {}
    return DEFAULT_ABOUT;
  });
  const [services, setServices] = useState<ServiceItem[]>(() => {
    try {
      const c = localStorage.getItem('soma_cache_services');
      if (c) return JSON.parse(c);
    } catch {}
    return DEFAULT_SERVICES;
  });
  const [processSteps, setProcessSteps] = useState<ProcessStep[]>(DEFAULT_PROCESS);
  const [skills, setSkills] = useState<SkillItem[]>(() => {
    try {
      const c = localStorage.getItem('soma_cache_skills');
      if (c) return JSON.parse(c);
    } catch {}
    return DEFAULT_SKILLS;
  });
  const [experience, setExperience] = useState<ExperienceItem[]>(DEFAULT_EXPERIENCE);
  const [education, setEducation] = useState<EducationItem[]>(DEFAULT_EDUCATION);
  const [certifications, setCertifications] = useState<CertificationItem[]>(DEFAULT_CERTIFICATIONS);
  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    try {
      const c = localStorage.getItem('soma_cache_projects');
      if (c) return JSON.parse(c);
    } catch {}
    return DEFAULT_PROJECTS;
  });
  const [results, setResults] = useState<ResultMetric[]>(DEFAULT_RESULTS);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(DEFAULT_TESTIMONIALS);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(DEFAULT_SOCIAL_LINKS);
  const [navigationLinks, setNavigationLinks] = useState<NavigationLink[]>(DEFAULT_NAVIGATION_LINKS);
  const [pageSections, setPageSections] = useState<PageSectionConfig[]>(DEFAULT_PAGE_SECTIONS);
  const [seoSettings, setSeoSettings] = useState<SeoSettings>(DEFAULT_SEO);

  const [loading, setLoading] = useState<boolean>(true);
  const [dbConnected, setDbConnected] = useState<boolean>(false);

  // Boot connection check & auto-seeding
  useEffect(() => {
    testConnection().then((connected) => {
      setDbConnected(connected);
      if (connected) {
        getDoc(doc(db, 'siteSettings', 'current'))
          .then((snap) => {
            if (!snap.exists()) {
              seedDatabase();
            }
          })
          .catch((e) => {
            console.warn('Initial seed check note:', e);
          });
      }
    });
  }, []);

  // Synchronize dynamic SEO title, meta description & favicon to browser DOM
  useEffect(() => {
    if (typeof document === 'undefined') return;

    if (seoSettings?.metaTitle) {
      document.title = seoSettings.metaTitle;
    }

    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta && seoSettings?.metaDescription) {
      descMeta.setAttribute('content', seoSettings.metaDescription);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && (seoSettings?.ogTitle || seoSettings?.metaTitle)) {
      ogTitle.setAttribute('content', seoSettings.ogTitle || seoSettings.metaTitle);
    }

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc && (seoSettings?.ogDescription || seoSettings?.metaDescription)) {
      ogDesc.setAttribute('content', seoSettings.ogDescription || seoSettings.metaDescription);
    }

    if (siteSettings?.faviconUrl) {
      const favLinks = document.querySelectorAll<HTMLLinkElement>("link[rel*='icon']");
      favLinks.forEach((l) => {
        l.href = siteSettings.faviconUrl!;
      });
    }
  }, [seoSettings, siteSettings]);

  // Auth observer with strict authorized owner email verification
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        if (isAuthorizedAdminEmail(user.email)) {
          setIsAdmin(true);
          localStorage.setItem('soma_admin_session', 'active');
          localStorage.setItem('soma_admin_email', user.email || '');

          // Bootstrap or refresh admin record in Firestore
          try {
            await setDoc(
              doc(db, 'admins', user.uid),
              {
                email: user.email,
                role: 'admin',
                lastLoginAt: serverTimestamp(),
              },
              { merge: true }
            );
          } catch (e) {
            console.warn('Admin record write note (client-side verification active):', e);
          }
        } else {
          // If any other email signs in, reject admin rights
          setIsAdmin(false);
          localStorage.removeItem('soma_admin_session');
        }
      } else {
        // If not signed into Firebase Auth, check verified local session
        const session = localStorage.getItem('soma_admin_session');
        const email = localStorage.getItem('soma_admin_email');
        if (session === 'active' && isAuthorizedAdminEmail(email)) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Real-time Firestore Listeners
  useEffect(() => {
    const unsubscribers: (() => void)[] = [];

    // 1. Site Settings
    const unsubSettings = onSnapshot(doc(db, 'siteSettings', 'current'), (snapshot) => {
      if (snapshot.exists()) {
        setSiteSettings({ ...DEFAULT_SITE_SETTINGS, ...snapshot.data() } as SiteSettings);
      }
    }, (err) => {
      console.warn('Using default site settings:', err.message);
    });
    unsubscribers.push(unsubSettings);

    // 2. Hero
    const unsubHero = onSnapshot(doc(db, 'hero', 'current'), (snapshot) => {
      if (snapshot.exists()) {
        setHeroContent({ ...DEFAULT_HERO, ...snapshot.data() } as HeroContent);
      }
    }, (err) => {
      console.warn('Using default hero:', err.message);
    });
    unsubscribers.push(unsubHero);

    // 3. About
    const unsubAbout = onSnapshot(doc(db, 'about', 'current'), (snapshot) => {
      if (snapshot.exists()) {
        setAboutContent({ ...DEFAULT_ABOUT, ...snapshot.data() } as AboutContent);
      }
    }, (err) => {
      console.warn('Using default about:', err.message);
    });
    unsubscribers.push(unsubAbout);

    // 4. SEO
    const unsubSeo = onSnapshot(doc(db, 'seo', 'current'), (snapshot) => {
      if (snapshot.exists()) {
        setSeoSettings({ ...DEFAULT_SEO, ...snapshot.data() } as SeoSettings);
      }
    }, (err) => {
      console.warn('Using default seo:', err.message);
    });
    unsubscribers.push(unsubSeo);

    // 5. Projects
    const unsubProjects = onSnapshot(collection(db, 'projects'), (snapshot) => {
      if (!snapshot.empty) {
        const items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as ProjectItem));
        items.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
        setProjects(items);
      }
    }, (err) => {
      console.warn('Using default projects:', err.message);
    });
    unsubscribers.push(unsubProjects);

    // 6. Services
    const unsubServices = onSnapshot(collection(db, 'services'), (snapshot) => {
      if (!snapshot.empty) {
        const items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as ServiceItem));
        items.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
        setServices(items);
      }
    }, (err) => {
      console.warn('Using default services:', err.message);
    });
    unsubscribers.push(unsubServices);

    // 7. Process
    const unsubProcess = onSnapshot(collection(db, 'process'), (snapshot) => {
      if (!snapshot.empty) {
        const items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as ProcessStep));
        items.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
        setProcessSteps(items);
      }
    }, (err) => {
      console.warn('Using default process steps:', err.message);
    });
    unsubscribers.push(unsubProcess);

    // 8. Skills
    const unsubSkills = onSnapshot(collection(db, 'skills'), (snapshot) => {
      if (!snapshot.empty) {
        const items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as SkillItem));
        items.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
        setSkills(items);
      }
    }, (err) => {
      console.warn('Using default skills:', err.message);
    });
    unsubscribers.push(unsubSkills);

    // 9. Experience
    const unsubExp = onSnapshot(collection(db, 'experience'), (snapshot) => {
      if (!snapshot.empty) {
        const items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as ExperienceItem));
        items.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
        setExperience(items);
      }
    }, (err) => {
      console.warn('Using default experience:', err.message);
    });
    unsubscribers.push(unsubExp);

    // 10. Education
    const unsubEdu = onSnapshot(collection(db, 'education'), (snapshot) => {
      if (!snapshot.empty) {
        const items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as EducationItem));
        items.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
        setEducation(items);
      }
    }, (err) => {
      console.warn('Using default education:', err.message);
    });
    unsubscribers.push(unsubEdu);

    // 11. Certifications
    const unsubCert = onSnapshot(collection(db, 'certifications'), (snapshot) => {
      if (!snapshot.empty) {
        const items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as CertificationItem));
        items.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
        setCertifications(items);
      }
    }, (err) => {
      console.warn('Using default certifications:', err.message);
    });
    unsubscribers.push(unsubCert);

    // 12. Results
    const unsubResults = onSnapshot(collection(db, 'results'), (snapshot) => {
      if (!snapshot.empty) {
        const items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as ResultMetric));
        items.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
        setResults(items);
      }
    }, (err) => {
      console.warn('Using default results:', err.message);
    });
    unsubscribers.push(unsubResults);

    // 13. Testimonials
    const unsubTesti = onSnapshot(collection(db, 'testimonials'), (snapshot) => {
      if (!snapshot.empty) {
        const items = snapshot.docs.map((d) => {
          const data = d.data() as TestimonialItem;
          const defaultMatch = DEFAULT_TESTIMONIALS.find(
            (dt) => dt.id === d.id || dt.clientName?.toLowerCase() === data.clientName?.toLowerCase()
          );
          const rawQuote = data.quote?.trim() || data.testimonial?.trim();
          const quote = rawQuote && rawQuote.length > 3
            ? rawQuote
            : defaultMatch?.quote || defaultMatch?.testimonial || 'Strategic marketing execution delivering measurable, high-margin client growth across all primary channels.';
          const avatar = data.avatar || data.profileImage || defaultMatch?.avatar || defaultMatch?.profileImage || '';
          const role = data.role || data.clientPosition || defaultMatch?.role || defaultMatch?.clientPosition || 'Executive Client';
          const result = data.result || defaultMatch?.result || '';

          return {
            id: d.id,
            ...data,
            quote,
            testimonial: quote,
            avatar,
            profileImage: avatar,
            role,
            clientPosition: role,
            result,
          } as TestimonialItem;
        });
        items.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
        setTestimonials(items);
      }
    }, (err) => {
      console.warn('Using default testimonials:', err.message);
    });
    unsubscribers.push(unsubTesti);

    // 14. Social Links
    const unsubSocial = onSnapshot(collection(db, 'socialLinks'), (snapshot) => {
      if (!snapshot.empty) {
        const items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as SocialLink));
        items.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
        setSocialLinks(items);
      }
    }, (err) => {
      console.warn('Using default social links:', err.message);
    });
    unsubscribers.push(unsubSocial);

    // 15. Page Sections
    const unsubSections = onSnapshot(collection(db, 'pageSections'), (snapshot) => {
      if (!snapshot.empty) {
        const items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as PageSectionConfig));
        items.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
        setPageSections(items);
      }
    }, (err) => {
      console.warn('Using default page sections:', err.message);
    });
    unsubscribers.push(unsubSections);

    setLoading(false);

    return () => {
      unsubscribers.forEach((unsub) => unsub());
    };
  }, []);

  // Messages listener (only active when admin is logged in)
  useEffect(() => {
    if (!isAdmin) {
      setMessages([]);
      return;
    }
    const unsubMessages = onSnapshot(
      collection(db, 'messages'),
      (snapshot) => {
        const msgs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as ContactMessage));
        // Sort newest first
        msgs.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
        setMessages(msgs);
      },
      (err) => {
        console.warn('Error fetching messages:', err.message);
      }
    );

    return () => unsubMessages();
  }, [isAdmin]);

  // Auth methods
  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const loginWithEmail = async (email: string, pass: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    if (!isAuthorizedAdminEmail(normalizedEmail)) {
      throw new Error('Ghalat Email ya Password! Barah-e-karam apna durust admin credentials enter karein.');
    }

    const currentSavedPass = localStorage.getItem('soma_admin_password');
    // If owner has configured a secret password, strictly check against it
    // If not yet customized, accept default password so initial setup is possible
    const isPasswordMatch = currentSavedPass
      ? pass === currentSavedPass
      : (pass === DEFAULT_ADMIN_PASSWORD || pass === 'SomaAdmin#2026' || pass === 'soma@2026');

    // Attempt Firebase Auth in parallel
    let fbSuccess = false;
    try {
      await signInWithEmailAndPassword(auth, normalizedEmail, pass);
      fbSuccess = true;
    } catch (fbErr: any) {
      if (fbErr.code === 'auth/user-not-found' || fbErr.code === 'auth/invalid-credential') {
        try {
          await createUserWithEmailAndPassword(auth, normalizedEmail, pass);
          fbSuccess = true;
        } catch {
          // If error, continue to internal check
        }
      }
    }

    if (fbSuccess || isPasswordMatch) {
      setIsAdmin(true);
      localStorage.setItem('soma_admin_session', 'active');
      localStorage.setItem('soma_admin_email', normalizedEmail);
      return;
    }

    throw new Error('Ghalat Email ya Password! Barah-e-karam apna durust admin credentials enter karein.');
  };

  const signupWithEmail = async (email: string, pass: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    if (!isAuthorizedAdminEmail(normalizedEmail)) {
      throw new Error('Access Denied: Sirf authorized owner hi admin access hasil kar sakta hai.');
    }
    localStorage.setItem('soma_admin_password', pass);
    try {
      await createUserWithEmailAndPassword(auth, normalizedEmail, pass);
    } catch (error) {
      console.warn('Firebase signup note:', error);
    }
    setIsAdmin(true);
    localStorage.setItem('soma_admin_session', 'active');
    localStorage.setItem('soma_admin_email', normalizedEmail);
  };

  const updateAdminPassword = async (newPass: string): Promise<boolean> => {
    if (!newPass || newPass.length < 6) {
      throw new Error('Password kam az kam 6 characters ka hona chahiye.');
    }
    localStorage.setItem('soma_admin_password', newPass);

    if (auth.currentUser) {
      try {
        await updatePassword(auth.currentUser, newPass);
      } catch (err) {
        console.warn('Firebase password update note:', err);
      }
    }

    try {
      await setDoc(
        doc(db, 'admins', 'security_config'),
        {
          updatedAt: serverTimestamp(),
          hasCustomPassword: true,
        },
        { merge: true }
      );
    } catch (err) {
      console.warn('Firestore security config update note:', err);
    }
    return true;
  };

  const updateAdminEmail = async (newEmail: string): Promise<boolean> => {
    const trimmed = newEmail.trim().toLowerCase();
    if (!trimmed || !trimmed.includes('@')) {
      throw new Error('Barah-e-karam durust email address enter karein.');
    }
    setAdminCustomEmail(trimmed);
    localStorage.setItem('soma_custom_admin_email', trimmed);
    localStorage.setItem('soma_admin_email', trimmed);

    if (auth.currentUser) {
      try {
        await updateEmail(auth.currentUser, trimmed);
      } catch (err) {
        console.warn('Firebase email update note:', err);
      }
    }

    try {
      await setDoc(
        doc(db, 'admins', 'security_config'),
        {
          ownerEmail: trimmed,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
    } catch (err) {
      console.warn('Firestore security config update note:', err);
    }
    return true;
  };

  const logout = async () => {
    setIsAdmin(false);
    localStorage.removeItem('soma_admin_session');
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // CMS update methods with immediate state update, localStorage caching, and Firestore synchronization
  const updateSiteSettings = async (settings: Partial<SiteSettings>) => {
    const updated = { ...siteSettings, ...settings, updatedAt: new Date().toISOString() };
    setSiteSettings(updated);
    try {
      localStorage.setItem('soma_cache_siteSettings', JSON.stringify(updated));
      await setDoc(doc(db, 'siteSettings', 'current'), updated, { merge: true });
    } catch (error) {
      console.warn('Firestore sync siteSettings notice:', error);
    }
  };

  const updateHeroContent = async (hero: Partial<HeroContent>) => {
    const updated = { ...heroContent, ...hero };
    setHeroContent(updated);
    try {
      localStorage.setItem('soma_cache_heroContent', JSON.stringify(updated));
      await setDoc(doc(db, 'hero', 'current'), updated, { merge: true });
    } catch (error) {
      console.warn('Firestore sync hero notice:', error);
    }
  };

  const updateAboutContent = async (about: Partial<AboutContent>) => {
    const updated = { ...aboutContent, ...about };
    setAboutContent(updated);
    try {
      localStorage.setItem('soma_cache_aboutContent', JSON.stringify(updated));
      await setDoc(doc(db, 'about', 'current'), updated, { merge: true });
    } catch (error) {
      console.warn('Firestore sync about notice:', error);
    }
  };

  const updateSeoSettings = async (seo: Partial<SeoSettings>) => {
    const updated = { ...seoSettings, ...seo };
    setSeoSettings(updated);
    try {
      localStorage.setItem('soma_cache_seoSettings', JSON.stringify(updated));
      await setDoc(doc(db, 'seo', 'current'), updated, { merge: true });
    } catch (error) {
      console.warn('Firestore sync seo notice:', error);
    }
  };

  // Projects
  const saveProject = async (project: ProjectItem) => {
    const updatedList = [...projects];
    const index = updatedList.findIndex((p) => p.id === project.id);
    if (index >= 0) {
      updatedList[index] = project;
    } else {
      updatedList.push(project);
    }
    setProjects(updatedList);

    try {
      localStorage.setItem('soma_cache_projects', JSON.stringify(updatedList));
      await setDoc(doc(db, 'projects', project.id), {
        ...project,
        updatedAt: new Date().toISOString(),
      }, { merge: true });
    } catch (error) {
      console.warn('Firestore sync project notice:', error);
    }
  };

  const deleteProject = async (id: string) => {
    const updatedList = projects.filter((p) => p.id !== id);
    setProjects(updatedList);
    try {
      localStorage.setItem('soma_cache_projects', JSON.stringify(updatedList));
      await deleteDoc(doc(db, 'projects', id));
    } catch (error) {
      console.warn('Firestore delete project notice:', error);
    }
  };

  // Services
  const saveService = async (service: ServiceItem) => {
    const updatedList = [...services];
    const index = updatedList.findIndex((s) => s.id === service.id);
    if (index >= 0) {
      updatedList[index] = service;
    } else {
      updatedList.push(service);
    }
    setServices(updatedList);

    try {
      localStorage.setItem('soma_cache_services', JSON.stringify(updatedList));
      await setDoc(doc(db, 'services', service.id), service, { merge: true });
    } catch (error) {
      console.warn('Firestore sync service notice:', error);
    }
  };

  const deleteService = async (id: string) => {
    const updatedList = services.filter((s) => s.id !== id);
    setServices(updatedList);
    try {
      localStorage.setItem('soma_cache_services', JSON.stringify(updatedList));
      await deleteDoc(doc(db, 'services', id));
    } catch (error) {
      console.warn('Firestore delete service notice:', error);
    }
  };

  // Skills
  const saveSkill = async (skill: SkillItem) => {
    const updatedList = [...skills];
    const index = updatedList.findIndex((s) => s.id === skill.id);
    if (index >= 0) {
      updatedList[index] = skill;
    } else {
      updatedList.push(skill);
    }
    setSkills(updatedList);

    try {
      localStorage.setItem('soma_cache_skills', JSON.stringify(updatedList));
      await setDoc(doc(db, 'skills', skill.id), skill, { merge: true });
    } catch (error) {
      console.warn('Firestore sync skill notice:', error);
    }
  };

  const deleteSkill = async (id: string) => {
    const updatedList = skills.filter((s) => s.id !== id);
    setSkills(updatedList);
    try {
      localStorage.setItem('soma_cache_skills', JSON.stringify(updatedList));
      await deleteDoc(doc(db, 'skills', id));
    } catch (error) {
      console.warn('Firestore delete skill notice:', error);
    }
  };

  // Experience
  const saveExperience = async (exp: ExperienceItem) => {
    const updatedList = [...experience];
    const index = updatedList.findIndex((e) => e.id === exp.id);
    if (index >= 0) {
      updatedList[index] = exp;
    } else {
      updatedList.push(exp);
    }
    setExperience(updatedList);

    try {
      localStorage.setItem('soma_cache_experience', JSON.stringify(updatedList));
      await setDoc(doc(db, 'experience', exp.id), exp, { merge: true });
    } catch (error) {
      console.warn('Firestore sync experience notice:', error);
    }
  };

  const deleteExperience = async (id: string) => {
    const updatedList = experience.filter((e) => e.id !== id);
    setExperience(updatedList);
    try {
      localStorage.setItem('soma_cache_experience', JSON.stringify(updatedList));
      await deleteDoc(doc(db, 'experience', id));
    } catch (error) {
      console.warn('Firestore delete experience notice:', error);
    }
  };

  // Education
  const saveEducation = async (edu: EducationItem) => {
    const updatedList = [...education];
    const index = updatedList.findIndex((e) => e.id === edu.id);
    if (index >= 0) {
      updatedList[index] = edu;
    } else {
      updatedList.push(edu);
    }
    setEducation(updatedList);

    try {
      localStorage.setItem('soma_cache_education', JSON.stringify(updatedList));
      await setDoc(doc(db, 'education', edu.id), edu, { merge: true });
    } catch (error) {
      console.warn('Firestore sync education notice:', error);
    }
  };

  const deleteEducation = async (id: string) => {
    const updatedList = education.filter((e) => e.id !== id);
    setEducation(updatedList);
    try {
      localStorage.setItem('soma_cache_education', JSON.stringify(updatedList));
      await deleteDoc(doc(db, 'education', id));
    } catch (error) {
      console.warn('Firestore delete education notice:', error);
    }
  };

  // Certifications
  const saveCertification = async (cert: CertificationItem) => {
    const updatedList = [...certifications];
    const index = updatedList.findIndex((c) => c.id === cert.id);
    if (index >= 0) {
      updatedList[index] = cert;
    } else {
      updatedList.push(cert);
    }
    setCertifications(updatedList);

    try {
      localStorage.setItem('soma_cache_certifications', JSON.stringify(updatedList));
      await setDoc(doc(db, 'certifications', cert.id), cert, { merge: true });
    } catch (error) {
      console.warn('Firestore sync certification notice:', error);
    }
  };

  const deleteCertification = async (id: string) => {
    const updatedList = certifications.filter((c) => c.id !== id);
    setCertifications(updatedList);
    try {
      localStorage.setItem('soma_cache_certifications', JSON.stringify(updatedList));
      await deleteDoc(doc(db, 'certifications', id));
    } catch (error) {
      console.warn('Firestore delete certification notice:', error);
    }
  };

  // Testimonials
  const saveTestimonial = async (testi: TestimonialItem) => {
    const quote = testi.quote || testi.testimonial || '';
    const testimonial = testi.testimonial || testi.quote || '';
    const avatar = testi.avatar || testi.profileImage || '';
    const profileImage = testi.profileImage || testi.avatar || '';
    const role = testi.role || testi.clientPosition || 'Client';
    const clientPosition = testi.clientPosition || testi.role || 'Client';

    const cleanTesti: TestimonialItem = {
      ...testi,
      quote,
      testimonial,
      avatar,
      profileImage,
      role,
      clientPosition,
    };

    const updatedList = [...testimonials];
    const index = updatedList.findIndex((t) => t.id === cleanTesti.id);
    if (index >= 0) {
      updatedList[index] = cleanTesti;
    } else {
      updatedList.push(cleanTesti);
    }
    setTestimonials(updatedList);

    try {
      localStorage.setItem('soma_cache_testimonials', JSON.stringify(updatedList));
      await setDoc(doc(db, 'testimonials', cleanTesti.id), cleanTesti, { merge: true });
    } catch (error) {
      console.warn('Firestore sync testimonial notice:', error);
    }
  };

  const deleteTestimonial = async (id: string) => {
    const updatedList = testimonials.filter((t) => t.id !== id);
    setTestimonials(updatedList);
    try {
      localStorage.setItem('soma_cache_testimonials', JSON.stringify(updatedList));
      await deleteDoc(doc(db, 'testimonials', id));
    } catch (error) {
      console.warn('Firestore delete testimonial notice:', error);
    }
  };

  // Process
  const saveProcessStep = async (step: ProcessStep) => {
    const updatedList = [...processSteps];
    const index = updatedList.findIndex((p) => p.id === step.id);
    if (index >= 0) {
      updatedList[index] = step;
    } else {
      updatedList.push(step);
    }
    setProcessSteps(updatedList);

    try {
      localStorage.setItem('soma_cache_processSteps', JSON.stringify(updatedList));
      await setDoc(doc(db, 'process', step.id), step, { merge: true });
    } catch (error) {
      console.warn('Firestore sync process notice:', error);
    }
  };

  const deleteProcessStep = async (id: string) => {
    const updatedList = processSteps.filter((p) => p.id !== id);
    setProcessSteps(updatedList);
    try {
      localStorage.setItem('soma_cache_processSteps', JSON.stringify(updatedList));
      await deleteDoc(doc(db, 'process', id));
    } catch (error) {
      console.warn('Firestore delete process notice:', error);
    }
  };

  // Results
  const saveResult = async (result: ResultMetric) => {
    const updatedList = [...results];
    const index = updatedList.findIndex((r) => r.id === result.id);
    if (index >= 0) {
      updatedList[index] = result;
    } else {
      updatedList.push(result);
    }
    setResults(updatedList);

    try {
      localStorage.setItem('soma_cache_results', JSON.stringify(updatedList));
      await setDoc(doc(db, 'results', result.id), result, { merge: true });
    } catch (error) {
      console.warn('Firestore sync result notice:', error);
    }
  };

  const deleteResult = async (id: string) => {
    const updatedList = results.filter((r) => r.id !== id);
    setResults(updatedList);
    try {
      localStorage.setItem('soma_cache_results', JSON.stringify(updatedList));
      await deleteDoc(doc(db, 'results', id));
    } catch (error) {
      console.warn('Firestore delete result notice:', error);
    }
  };

  // Social & Sections
  const saveSocialLink = async (link: SocialLink) => {
    const updatedList = [...socialLinks];
    const index = updatedList.findIndex((l) => l.id === link.id);
    if (index >= 0) {
      updatedList[index] = link;
    } else {
      updatedList.push(link);
    }
    setSocialLinks(updatedList);

    try {
      localStorage.setItem('soma_cache_socialLinks', JSON.stringify(updatedList));
      await setDoc(doc(db, 'socialLinks', link.id), link, { merge: true });
    } catch (error) {
      console.warn('Firestore sync socialLink notice:', error);
    }
  };

  const deleteSocialLink = async (id: string) => {
    const updatedList = socialLinks.filter((l) => l.id !== id);
    setSocialLinks(updatedList);
    try {
      localStorage.setItem('soma_cache_socialLinks', JSON.stringify(updatedList));
      await deleteDoc(doc(db, 'socialLinks', id));
    } catch (error) {
      console.warn('Firestore delete socialLink notice:', error);
    }
  };

  const updatePageSections = async (sections: PageSectionConfig[]) => {
    setPageSections(sections);
    try {
      localStorage.setItem('soma_cache_pageSections', JSON.stringify(sections));
      for (const sec of sections) {
        await setDoc(doc(db, 'pageSections', sec.id), sec, { merge: true });
      }
    } catch (error) {
      console.warn('Firestore sync pageSections notice:', error);
    }
  };

  const updateNavigationLinks = async (links: NavigationLink[]) => {
    setNavigationLinks(links);
  };

  // Messages (Contact Inquiries)
  const submitContactMessage = async (msg: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>) => {
    try {
      const newDoc = {
        ...msg,
        status: 'unread',
        createdAt: new Date().toISOString(),
      };
      await addDoc(collection(db, 'messages'), newDoc);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'messages');
    }
  };

  const updateMessageStatus = async (id: string, status: ContactMessage['status']) => {
    setMessages(messages.map((m) => (m.id === id ? { ...m, status } : m)));
    try {
      await updateDoc(doc(db, 'messages', id), { status });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `messages/${id}`);
    }
  };

  const deleteMessage = async (id: string) => {
    setMessages(messages.filter((m) => m.id !== id));
    try {
      await deleteDoc(doc(db, 'messages', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `messages/${id}`);
    }
  };

  // One-click seed / reset to Firestore
  const seedDatabase = async () => {
    try {
      await setDoc(doc(db, 'siteSettings', 'current'), DEFAULT_SITE_SETTINGS, { merge: true });
      await setDoc(doc(db, 'hero', 'current'), DEFAULT_HERO, { merge: true });
      await setDoc(doc(db, 'about', 'current'), DEFAULT_ABOUT, { merge: true });
      await setDoc(doc(db, 'seo', 'current'), DEFAULT_SEO, { merge: true });

      for (const p of DEFAULT_PROJECTS) {
        await setDoc(doc(db, 'projects', p.id), p, { merge: true });
      }
      for (const s of DEFAULT_SERVICES) {
        await setDoc(doc(db, 'services', s.id), s, { merge: true });
      }
      for (const p of DEFAULT_PROCESS) {
        await setDoc(doc(db, 'process', p.id), p, { merge: true });
      }
      for (const sk of DEFAULT_SKILLS) {
        await setDoc(doc(db, 'skills', sk.id), sk, { merge: true });
      }
      for (const e of DEFAULT_EXPERIENCE) {
        await setDoc(doc(db, 'experience', e.id), e, { merge: true });
      }
      for (const ed of DEFAULT_EDUCATION) {
        await setDoc(doc(db, 'education', ed.id), ed, { merge: true });
      }
      for (const c of DEFAULT_CERTIFICATIONS) {
        await setDoc(doc(db, 'certifications', c.id), c, { merge: true });
      }
      for (const r of DEFAULT_RESULTS) {
        await setDoc(doc(db, 'results', r.id), r, { merge: true });
      }
      for (const t of DEFAULT_TESTIMONIALS) {
        await setDoc(doc(db, 'testimonials', t.id), t, { merge: true });
      }
      for (const sl of DEFAULT_SOCIAL_LINKS) {
        await setDoc(doc(db, 'socialLinks', sl.id), sl, { merge: true });
      }
      for (const sec of DEFAULT_PAGE_SECTIONS) {
        await setDoc(doc(db, 'pageSections', sec.id), sec, { merge: true });
      }
      console.log('Database seeded successfully to Firestore!');
    } catch (error) {
      console.warn('Firestore seedDatabase notice:', error);
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        currentUser,
        isAdmin,
        authLoading,
        authorizedAdminEmail:
          adminCustomEmail ||
          (typeof window !== 'undefined' && localStorage.getItem('soma_custom_admin_email')) ||
          currentUser?.email ||
          AUTHORIZED_ADMIN_EMAIL,
        loginWithGoogle,
        loginWithEmail,
        signupWithEmail,
        updateAdminPassword,
        updateAdminEmail,
        logout,
        siteSettings,
        heroContent,
        aboutContent,
        services,
        processSteps,
        skills,
        experience,
        education,
        certifications,
        projects,
        results,
        testimonials,
        messages,
        socialLinks,
        navigationLinks,
        pageSections,
        seoSettings,
        loading,
        dbConnected,
        updateSiteSettings,
        updateHeroContent,
        updateAboutContent,
        updateSeoSettings,
        saveProject,
        deleteProject,
        saveService,
        deleteService,
        saveSkill,
        deleteSkill,
        saveExperience,
        deleteExperience,
        saveEducation,
        deleteEducation,
        saveCertification,
        deleteCertification,
        saveTestimonial,
        deleteTestimonial,
        saveProcessStep,
        deleteProcessStep,
        saveResult,
        deleteResult,
        saveSocialLink,
        deleteSocialLink,
        updatePageSections,
        updateNavigationLinks,
        submitContactMessage,
        updateMessageStatus,
        deleteMessage,
        seedDatabase,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = (): PortfolioContextType => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
