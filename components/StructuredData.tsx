import { site, about, journey } from "@/content";

// schema.org data so search engines understand who the site is about.
export default function StructuredData() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: `${site.firstName} ${site.lastName}`,
    url: site.url,
    email: `mailto:${site.email}`,
    jobTitle: "Sports Data & Performance Analyst",
    description: about,
    image: `${site.url}/icon.png`,
    address: { "@type": "PostalAddress", addressLocality: "Newcastle upon Tyne", addressCountry: "GB" },
    affiliation: { "@type": "CollegeOrUniversity", name: "Newcastle University" },
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "Newcastle University" },
      { "@type": "CollegeOrUniversity", name: "Mahatma Gandhi University" },
    ],
    knowsAbout: ["Data science", "Football analytics", "Performance analysis", "Data validation", "SQL", "Python"],
    sameAs: [site.linkedin],
  };
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${site.firstName} ${site.lastName}`,
    url: site.url,
    description: journey.title,
    inLanguage: "en-GB",
  };
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify([person, website]).replace(/</g, "\\u003c") }}
    />
  );
}
