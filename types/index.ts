// Contact Form Types
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  eventType: string;
  eventDate?: string;
  message: string;
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
export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
}

// Navigation Types
export interface NavLink {
  href: string;
  label: string;
}

// Site Config Types
export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
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
