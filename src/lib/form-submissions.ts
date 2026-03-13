import { getSupabaseClient, isSupabaseConfigured } from '@/integrations/supabase/client';

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

export interface QuoteSubmissionResult {
  stored: boolean;
  emailed: boolean;
  storageError?: string;
  emailError?: string;
}

const assertSupabaseConfiguration = () => {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is niet geconfigureerd.');
  }
};

export const submitContactSubmission = async (input: ContactSubmissionInput) => {
  assertSupabaseConfiguration();
  const supabase = getSupabaseClient();

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

export const submitQuoteSubmission = async (input: QuoteSubmissionInput): Promise<QuoteSubmissionResult> => {
  if (!isSupabaseConfigured) {
    return {
      stored: false,
      emailed: false,
      storageError: 'Supabase is niet geconfigureerd.',
      emailError: 'Supabase is niet geconfigureerd.',
    };
  }
  try {
    const supabase = getSupabaseClient();

    const { error: insertError } = await supabase.from('quote_submissions').insert({
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

    const { error: emailError } = await supabase.functions.invoke('send-quote-email', {
      body: {
        name: input.name.trim(),
        email: input.email.trim(),
        phone: input.phone.trim(),
        city: input.city?.trim() || null,
        projectType: input.projectType?.trim() || null,
        requestFor: input.requestFor?.trim() || null,
        websiteType: input.websiteType?.trim() || null,
        services: input.services,
        websiteFeatures: input.websiteFeatures,
        webshopFeatures: input.webshopFeatures,
        contentSupport: input.contentSupport?.trim() || null,
        domainAndHosting: input.domainAndHosting?.trim() || null,
        maintenanceAfterDelivery: input.maintenanceAfterDelivery?.trim() || null,
        pageCount: input.pageCount?.trim() || null,
        desiredUrl: input.desiredUrl?.trim() || null,
        deadline: input.deadline.trim(),
        projectDescription: input.projectDescription?.trim() || null,
        uploadedFiles: input.uploadedFiles,
        language: input.language,
        source: input.source ?? 'quote-page',
      },
    });

    if (insertError) {
      console.warn('Quote submission storage failed:', insertError.message);
    }

    if (emailError) {
      console.warn('Quote email notification failed:', emailError.message);
    }

    return {
      stored: !insertError,
      emailed: !emailError,
      storageError: insertError?.message,
      emailError: emailError?.message,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Onbekende fout.';
    return {
      stored: false,
      emailed: false,
      storageError: message,
      emailError: message,
    };
  }
};
