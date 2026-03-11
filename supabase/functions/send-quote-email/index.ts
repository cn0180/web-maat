import { serve } from "https://deno.land/std@0.203.0/http/server.ts";

type QuotePayload = {
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
  projectType?: string;
  requestFor?: string;
  websiteType?: string;
  services?: string[];
  websiteFeatures?: string[];
  webshopFeatures?: string[];
  contentSupport?: string;
  domainAndHosting?: string;
  maintenanceAfterDelivery?: string;
  pageCount?: string;
  desiredUrl?: string;
  deadline?: string;
  projectDescription?: string;
  uploadedFiles?: { name: string; size: number; type: string }[];
  language?: "nl" | "en";
  source?: string;
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const TO_EMAIL = Deno.env.get("QUOTE_NOTIFICATION_EMAIL") ?? "masrorkamal08@gmail.com";
const FROM_EMAIL = Deno.env.get("RESEND_FROM_EMAIL") ?? "Web-Maat <no-reply@web-maat.nl>";

const label = (value?: string | null) => (value && value.trim().length > 0 ? value.trim() : "-");

const formatList = (items?: string[]) => {
  if (!items || items.length === 0) return "-";
  return items.join(", ");
};

const formatFiles = (files?: QuotePayload["uploadedFiles"]) => {
  if (!files || files.length === 0) return "-";
  return files
    .map((file) => `${file.name} (${Math.round(file.size / 1024)} KB, ${file.type || "file"})`)
    .join("\n");
};

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  if (!RESEND_API_KEY) {
    return new Response("Missing RESEND_API_KEY", { status: 500 });
  }

  let payload: QuotePayload;
  try {
    payload = (await req.json()) as QuotePayload;
  } catch (error) {
    return new Response(`Invalid JSON: ${String(error)}`, { status: 400 });
  }

  const subjectName = payload?.name ? payload.name : "Nieuwe aanvraag";
  const subject = `Nieuwe offerteaanvraag — ${subjectName}`;

  const text = `
Nieuwe offerteaanvraag

Naam: ${label(payload.name)}
E-mail: ${label(payload.email)}
Telefoon: ${label(payload.phone)}
Plaats: ${label(payload.city)}

Type aanvraag: ${label(payload.projectType)}
Voor wie: ${label(payload.requestFor)}
Website type: ${label(payload.websiteType)}
Deadline: ${label(payload.deadline)}

Diensten: ${formatList(payload.services)}
Website functies: ${formatList(payload.websiteFeatures)}
Webshop functies: ${formatList(payload.webshopFeatures)}

Content ondersteuning: ${label(payload.contentSupport)}
Domein & hosting: ${label(payload.domainAndHosting)}
Onderhoud: ${label(payload.maintenanceAfterDelivery)}
Aantal pagina's: ${label(payload.pageCount)}
Gewenste URL: ${label(payload.desiredUrl)}

Omschrijving:
${label(payload.projectDescription)}

Bestanden:
${formatFiles(payload.uploadedFiles)}

Taal: ${label(payload.language)}
Bron: ${label(payload.source)}
`.trim();

  const html = `
    <h2>Nieuwe offerteaanvraag</h2>
    <p><strong>Naam:</strong> ${label(payload.name)}</p>
    <p><strong>E-mail:</strong> ${label(payload.email)}</p>
    <p><strong>Telefoon:</strong> ${label(payload.phone)}</p>
    <p><strong>Plaats:</strong> ${label(payload.city)}</p>
    <hr />
    <p><strong>Type aanvraag:</strong> ${label(payload.projectType)}</p>
    <p><strong>Voor wie:</strong> ${label(payload.requestFor)}</p>
    <p><strong>Website type:</strong> ${label(payload.websiteType)}</p>
    <p><strong>Deadline:</strong> ${label(payload.deadline)}</p>
    <p><strong>Diensten:</strong> ${formatList(payload.services)}</p>
    <p><strong>Website functies:</strong> ${formatList(payload.websiteFeatures)}</p>
    <p><strong>Webshop functies:</strong> ${formatList(payload.webshopFeatures)}</p>
    <hr />
    <p><strong>Content ondersteuning:</strong> ${label(payload.contentSupport)}</p>
    <p><strong>Domein & hosting:</strong> ${label(payload.domainAndHosting)}</p>
    <p><strong>Onderhoud:</strong> ${label(payload.maintenanceAfterDelivery)}</p>
    <p><strong>Aantal pagina's:</strong> ${label(payload.pageCount)}</p>
    <p><strong>Gewenste URL:</strong> ${label(payload.desiredUrl)}</p>
    <p><strong>Omschrijving:</strong><br/>${label(payload.projectDescription)}</p>
    <p><strong>Bestanden:</strong><br/>${formatFiles(payload.uploadedFiles).replace(/\n/g, "<br/>")}</p>
    <hr />
    <p><strong>Taal:</strong> ${label(payload.language)}</p>
    <p><strong>Bron:</strong> ${label(payload.source)}</p>
  `;

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      subject,
      text,
      html,
      reply_to: payload.email,
    }),
  });

  if (!resendResponse.ok) {
    const errorText = await resendResponse.text();
    return new Response(`Resend error: ${errorText}`, { status: 500 });
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" },
  });
});
