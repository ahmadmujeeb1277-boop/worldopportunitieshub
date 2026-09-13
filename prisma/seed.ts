import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import slugify from "slugify";

const prisma = new PrismaClient();

function slug(input: string) {
  return slugify(input, { lower: true, strict: true });
}

async function upsertTags(names: string[]) {
  const tags = [];
  for (const name of names) {
    const tag = await prisma.tag.upsert({
      where: { name },
      update: {},
      create: { name, slug: slug(name) },
    });
    tags.push(tag);
  }
  return tags;
}

const opportunities = [
  {
    title: "Gates Cambridge Scholarship 2027 — Fully Funded Postgraduate Study in the UK",
    type: "scholarship",
    summary:
      "A fully funded scholarship for outstanding applicants from outside the UK to pursue postgraduate study at the University of Cambridge.",
    organization: "Bill & Melinda Gates Foundation / University of Cambridge",
    officialUrl: "https://www.gatescambridge.org/",
    country: "United Kingdom",
    region: "europe",
    level: "masters",
    fundingType: "fully-funded",
    deadline: "2027-01-05",
    tags: ["Fully Funded", "Masters", "PhD", "UK"],
  },
  {
    title: "Mastercard Foundation Scholars Program 2027 at University of Cambridge",
    type: "scholarship",
    summary:
      "Full scholarships for academically talented yet economically disadvantaged young people, with a focus on African leadership.",
    organization: "Mastercard Foundation",
    officialUrl: "https://mastercardfdn.org/all/scholars/",
    country: "United Kingdom",
    region: "europe",
    level: "masters",
    fundingType: "fully-funded",
    deadline: "2027-02-15",
    tags: ["Fully Funded", "Masters", "Africa"],
  },
  {
    title: "UNICEF Internship Programme 2026 — Multiple Duty Stations",
    type: "internship",
    summary:
      "A hands-on internship with UNICEF for graduate students and recent graduates working on child-focused development programs.",
    organization: "UNICEF",
    officialUrl: "https://www.unicef.org/careers/internships",
    country: "Global",
    region: "global",
    level: "undergraduate",
    fundingType: "paid",
    deadline: "2026-11-30",
    tags: ["Internship", "United Nations", "Global"],
  },
  {
    title: "DAAD Development-Related Postgraduate Courses 2027 (Germany)",
    type: "scholarship",
    summary:
      "Fully funded master's scholarships in Germany for professionals from developing countries in development-related fields.",
    organization: "German Academic Exchange Service (DAAD)",
    officialUrl: "https://www.daad.de/en/",
    country: "Germany",
    region: "europe",
    level: "masters",
    fundingType: "fully-funded",
    deadline: "2026-10-31",
    tags: ["Fully Funded", "Masters", "Germany"],
  },
  {
    title: "African Development Bank Young Professionals Program 2026",
    type: "job",
    summary:
      "A career-launching program for young African professionals to work on development finance projects across the continent.",
    organization: "African Development Bank Group",
    officialUrl: "https://www.afdb.org/en/about-us/careers",
    country: "Multiple — Africa",
    region: "africa",
    level: "professional",
    fundingType: "paid",
    deadline: "2026-12-10",
    tags: ["Jobs", "Africa", "Finance"],
  },
  {
    title: "Chevening Scholarships 2027/2028 — Fully Funded UK Master's Degrees",
    type: "scholarship",
    summary:
      "The UK government's global scholarship programme funding one-year master's degrees for future leaders worldwide.",
    organization: "UK Foreign, Commonwealth & Development Office",
    officialUrl: "https://www.chevening.org/",
    country: "United Kingdom",
    region: "europe",
    level: "masters",
    fundingType: "fully-funded",
    deadline: "2026-11-03",
    tags: ["Fully Funded", "Masters", "UK"],
  },
  {
    title: "Global Undergraduate Exchange Program (Global UGRAD) 2027",
    type: "exchange",
    summary:
      "A fully funded one-semester exchange in the United States for undergraduate students from eligible countries.",
    organization: "U.S. Department of State",
    officialUrl: "https://www.worldlearning.org/program/global-ugrad/",
    country: "United States",
    region: "north-america",
    level: "undergraduate",
    fundingType: "fully-funded",
    deadline: "2027-03-01",
    tags: ["Exchange", "Undergraduate", "USA"],
  },
  {
    title: "Google Cybersecurity Professional Certificate — Free Online Course",
    type: "training",
    summary:
      "A free, self-paced professional certificate course covering the fundamentals of cybersecurity, hosted on Coursera.",
    organization: "Google Career Certificates",
    officialUrl: "https://grow.google/certificates/cybersecurity/",
    country: "Online",
    region: "global",
    level: "any",
    fundingType: "unpaid",
    deadline: null,
    tags: ["Free Course", "Online", "Global"],
  },
  {
    title: "Green Climate Fund Readiness Grant 2026 — For Developing Nations",
    type: "grant",
    summary:
      "Grant funding for national institutions in developing countries to build capacity for climate change adaptation projects.",
    organization: "Green Climate Fund",
    officialUrl: "https://www.greenclimate.fund/readiness",
    country: "Multiple",
    region: "global",
    level: "any",
    fundingType: "unspecified",
    deadline: "2026-12-20",
    tags: ["Grants", "Climate", "Global"],
  },
  {
    title: "Commonwealth PhD Fellowship 2027 for Developing Countries",
    type: "fellowship",
    summary:
      "A fully funded PhD fellowship supporting talented individuals from Commonwealth developing countries to study in the UK.",
    organization: "Commonwealth Scholarship Commission",
    officialUrl: "https://cscuk.fcdo.gov.uk/",
    country: "United Kingdom",
    region: "europe",
    level: "phd",
    fundingType: "fully-funded",
    deadline: "2027-01-18",
    tags: ["Fully Funded", "PhD", "UK"],
  },
];

const articles = [
  {
    title: "How to Write a Winning Scholarship Motivation Letter",
    excerpt:
      "A step-by-step guide to structuring a motivation letter that stands out to scholarship selection committees.",
    body: `## Start with a hook\n\nOpen with a specific moment or realization that led you toward your field — not a generic statement about your passion.\n\n## Show, don't tell\n\nBack every claim with a concrete example: a project you led, a problem you solved, a result you can measure.\n\n## Connect your story to the program\n\nExplain precisely why this scholarship, at this institution, is the next right step — reviewers can tell a templated letter from a genuine one.\n\n## Close with a clear vision\n\nEnd by stating what you plan to do with the opportunity, and how it connects to your longer-term goals.`,
    author: "WorldOpportunitiesHub Team",
    tags: ["Scholarships", "Tips"],
  },
  {
    title: "5 Common Mistakes That Get Job Applications Rejected",
    excerpt:
      "Avoid these frequent, easily-fixed mistakes that cause otherwise strong applications to be screened out early.",
    body: `## 1. Generic cover letters\n\nA cover letter that could be sent to any employer signals low effort. Reference the organization's actual work.\n\n## 2. Ignoring the job description's keywords\n\nMany organizations screen applications for specific terms from the posting — mirror the language where it's genuinely true of your experience.\n\n## 3. Unclear formatting\n\nRecruiters skim. Use clear headings and bullet points so your key qualifications are easy to find.\n\n## 4. No quantified achievements\n\n"Managed a team" says less than "Managed a 5-person team that shipped 3 releases on schedule."\n\n## 5. Missing the deadline window\n\nApply as early as possible — many organizations review applications on a rolling basis before the stated deadline.`,
    author: "WorldOpportunitiesHub Team",
    tags: ["Jobs", "Tips"],
  },
  {
    title: "Fully Funded vs. Partially Funded: What the Terms Actually Mean",
    excerpt:
      "A quick reference so you know exactly what's covered before you invest time into an application.",
    body: `## Fully funded\n\nTypically covers tuition, a living stipend, travel, and health insurance. Always verify the specific breakdown on the official page — "fully funded" is used loosely across different programs.\n\n## Partially funded\n\nUsually covers tuition only, or a partial stipend. Budget for the remaining costs before committing.\n\n## Paid vs. unpaid (for jobs/internships)\n\n"Paid" means a salary or stipend is provided. Always confirm currency, amount, and whether it covers your expected cost of living in that location.\n\n## Always verify on the official source\n\nWorldOpportunitiesHub summarizes funding terms as accurately as possible, but the official provider page is the definitive source before you apply.`,
    author: "WorldOpportunitiesHub Team",
    tags: ["Guides"],
  },
];

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (adminEmail && adminPassword) {
    const passwordHash = await bcrypt.hash(adminPassword, 12);
    await prisma.adminUser.upsert({
      where: { email: adminEmail },
      update: { passwordHash },
      create: { email: adminEmail, passwordHash, name: "Admin" },
    });
    console.log(`Admin user ready: ${adminEmail}`);
  } else {
    console.warn("ADMIN_EMAIL / ADMIN_PASSWORD not set — skipping admin user creation.");
  }

  for (const opp of opportunities) {
    const { tags: tagNames, deadline, ...data } = opp;
    const tags = await upsertTags(tagNames);
    await prisma.opportunity.upsert({
      where: { slug: slug(data.title) },
      update: {},
      create: {
        ...data,
        deadline: deadline ? new Date(deadline) : null,
        slug: slug(data.title),
        body: `## Overview\n\n${data.summary}\n\n## Eligibility\n\nCheck the official page for full eligibility criteria — requirements vary by applicant nationality, academic level, and field of study.\n\n## How to Apply\n\nApplications are submitted directly through the official website. Use the Apply button on this page to go there.`,
        status: "published",
        publishedAt: new Date(),
        isFeatured: Math.random() > 0.5,
        tags: { create: tags.map((t) => ({ tagId: t.id })) },
      },
    });
  }

  for (const article of articles) {
    const { tags: tagNames, ...data } = article;
    const tags = await upsertTags(tagNames);
    await prisma.article.upsert({
      where: { slug: slug(data.title) },
      update: {},
      create: {
        ...data,
        slug: slug(data.title),
        status: "published",
        publishedAt: new Date(),
        tags: { create: tags.map((t) => ({ tagId: t.id })) },
      },
    });
  }

  console.log(`Seeded ${opportunities.length} opportunities and ${articles.length} articles.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
