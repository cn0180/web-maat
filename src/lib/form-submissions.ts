import { supabase } from '@/integrations/supabase/client';

export interface ContactSubmissionInput {
  name: string;
  email: string;
  message: string;
  language: 'nl' | 'en';
  source?: string;
}

export interface QuoteUploadedFileMeta {
  name: string;
  size: number;
  type: string;
}

export interface QuoteSubmissionInput {
  name: string;
  email: string;
  phone: string;
  city?: string;
  projectType?: string;
  requestFor?: string;
  websiteType?: string;
  services: string[];
  websiteFeatures: string[];
  webshopFeatures: string[];
  contentSupport?: string;
  domainAndHosting?: string;
  maintenanceAfterDelivery?: string;
  pageCount?: string;
  desiredUrl?: string;
  deadline: string;
  projectDescription?: string;
  uploadedFiles: QuoteUploadedFileMeta[];
  language: 'nl' | 'en';
  source?: string;
}

const assertSupabaseConfiguration = () => {
  if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY) {
    throw new Error('Supabase is niet geconfigureerd.');
  }
};

export const submitContactSubmission = async (input: ContactSubmissionInput) => {
  assertSupabaseConfiguration();

  const { error } = await supabase.from('contact_submissions').insert({
    name: input.name.trim(),
    email: input.email.trim(),
    message: input.message.trim(),
    language: input.language,
    source: input.source ?? 'contact-page',
  });

  if (error) {
    throw new Error(error.message);
  }
};

export const submitQuoteSubmission = async (input: QuoteSubmissionInput) => {
  assertSupabaseConfiguration();

  const { error } = await supabase.from('quote_submissions').insert({
    name: input.name.trim(),
    email: input.email.trim(),
    phone: input.phone.trim(),
    city: input.city?.trim() || null,
    project_type: input.projectType?.trim() || null,
    request_for: input.requestFor?.trim() || null,
    website_type: input.websiteType?.trim() || null,
    services: input.services,
    website_features: input.websiteFeatures,
    webshop_features: input.webshopFeatures,
    content_support: input.contentSupport?.trim() || null,
    domain_hosting: input.domainAndHosting?.trim() || null,
    maintenance: input.maintenanceAfterDelivery?.trim() || null,
    page_count: input.pageCount?.trim() || null,
    desired_url: input.desiredUrl?.trim() || null,
    deadline: input.deadline.trim(),
    project_description: input.projectDescription?.trim() || null,
    uploaded_files: input.uploadedFiles,
    language: input.language,
    source: input.source ?? 'quote-page',
  });

  if (error) {
    throw new Error(error.message);
  }
};
