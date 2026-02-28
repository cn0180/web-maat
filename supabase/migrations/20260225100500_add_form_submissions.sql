-- Contact form submissions
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  language text NOT NULL DEFAULT 'nl',
  source text NOT NULL DEFAULT 'contact-page',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Quote form submissions
CREATE TABLE IF NOT EXISTS public.quote_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  city text,
  project_type text,
  request_for text,
  website_type text,
  services text[] NOT NULL DEFAULT '{}'::text[],
  website_features text[] NOT NULL DEFAULT '{}'::text[],
  webshop_features text[] NOT NULL DEFAULT '{}'::text[],
  content_support text,
  domain_hosting text,
  maintenance text,
  page_count text,
  desired_url text,
  deadline text NOT NULL,
  project_description text,
  uploaded_files jsonb NOT NULL DEFAULT '[]'::jsonb,
  language text NOT NULL DEFAULT 'nl',
  source text NOT NULL DEFAULT 'quote-page',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS contact_submissions_created_at_idx ON public.contact_submissions (created_at DESC);
CREATE INDEX IF NOT EXISTS quote_submissions_created_at_idx ON public.quote_submissions (created_at DESC);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow anonymous insert contact submissions" ON public.contact_submissions;
CREATE POLICY "Allow anonymous insert contact submissions"
ON public.contact_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anonymous insert quote submissions" ON public.quote_submissions;
CREATE POLICY "Allow anonymous insert quote submissions"
ON public.quote_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

GRANT INSERT ON TABLE public.contact_submissions TO anon, authenticated;
GRANT INSERT ON TABLE public.quote_submissions TO anon, authenticated;
