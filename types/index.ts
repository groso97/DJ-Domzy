// Contact Form Types
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  eventType: string;
  eventDate?: string;
  message?: string;
}

export interface ContactResponse {
  success: boolean;
  message?: string;
  error?: string;
}

// Service Types
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

// Testimonial Types
export type ServiceCategory =
  | "vjencanje"
  | "korporativni"
  | "rodendan"
  | "djevojacka-momacka";

export interface Testimonial {
  id: number;
  category: ServiceCategory;
  name: string;
  role: string;
  location?: string;
  date?: string;
  content: string;
  rating: number;
}

// Navigation Types
export interface NavLink {
  href: string;
  label: string;
}

// Landing page Types
export interface LandingPageData {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  benefitsTitle: string;
  benefits: string[];
  steps: { title: string; description: string }[];
  faq: { question: string; answer: string }[];
  testimonialCategory: ServiceCategory;
  defaultEventType: ServiceCategory;
  /** Subset of galleryImages (matched by `src`) shown on the page */
  gallerySrcs: string[];
}

// Site Config Types
export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  links: {
    instagram: string;
    facebook: string;
    youtube: string;
    soundcloud: string;
  };
  contact: {
    email: string;
    phone: string;
  };
}
