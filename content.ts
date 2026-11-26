// All site copy lives here.
// Sources: Manuel's CV, plus items marked PLACEHOLDER or ADDED.
//   PLACEHOLDER = invented example, replace with the real thing.
//   ADDED       = a data science skill not on the CV yet; confirm with Manuel.

export const site = {
  firstName: "Manuel",
  lastName: "Cherian",
  title: "Manuel Cherian | Data Science & Sport",
  description:
    "Manuel Cherian, MSc Data Science and Sport student at Newcastle University. Applied sports data and performance analysis, built on four years of data validation and QA.",
  email: "manuelcherian03@gmail.com",
  linkedin: "https://www.linkedin.com/in/manuel-cherian-7b716b15a/",
  github: "https://github.com/", // PLACEHOLDER: add Manuel's GitHub URL
  githubHandle: "GitHub", // PLACEHOLDER
  location: "Newcastle upon Tyne, UK",
  url: "https://www.manuelcherian.com",
  keywords: [
    "Manuel Cherian",
    "sports data analyst",
    "football analytics",
    "performance analysis",
    "data science and sport",
    "Newcastle University",
    "sports data science",
    "football data",
    "data validation",
  ],
  year: "2026",
};

export const hero = {
  lines: ["Data you can trust,", "decisions that win games."],
};

// Tools strip under the hero.
export const stack = [
  "Python", // ADDED
  "Pandas", // ADDED
  "NumPy", // ADDED
  "scikit-learn", // ADDED
  "Jupyter", // ADDED
  "Matplotlib", // ADDED
  "Power BI", // ADDED
  "MS SQL Server",
  "Oracle SQL Developer",
  "Postman",
  "JIRA",
];

export const about =
  "MSc Data Science and Sport student at Newcastle University, with four years of professional experience in data validation and quality assurance. I use reliable data and clear insight to support player performance and evidence-based decisions in football.";

export const skills = {
  title: "Data science toolkit.",
  body: "Four years of validating complex datasets taught me to trust nothing until it's checked. Now I'm pointing that discipline at sport: cleaning event and tracking data, modelling performance, and explaining what the numbers mean to coaches and analysts.",
  items: [
    "Python", // ADDED
    "Pandas / NumPy", // ADDED
    "scikit-learn", // ADDED
    "Statistics & modelling", // ADDED
    "Data visualisation", // ADDED
    "Football analytics", // ADDED (from MSc focus)
    "SQL databases", // CV: Oracle SQL Developer, MS SQL Server
    "Data validation & QA", // CV
  ],
};

export const journey = {
  title: "From data quality to performance analysis.",
  note: "A decade of data, now pointed at sport.",
  steps: [
    {
      when: "2015",
      title: "BCA, Mahatma Gandhi University",
      body: "Bachelor of Computer Applications, Kottayam. The foundation in programming and databases.",
    },
    {
      when: "2015 – 2017",
      title: "Junior Software Engineer, Tech Mahindra",
      body: "Tested complex telecom systems and used SQL to validate large datasets and find inconsistencies across systems.",
    },
    {
      when: "2017 – 2020",
      title: "Test Engineer, Mobiz Innovations",
      body: "Led end-to-end testing, validated backend data with SQL, automated regression with Selenium and mentored junior testers.",
    },
    {
      when: "2024",
      title: "Football coaching & talent ID",
      body: "AIFF 'D' Coaching Certificate, AIFF Blue Cubs Leaders Course, and Introduction to Talent Identification in Football.",
    },
    {
      when: "2026 – 2027",
      title: "MSc Data Science and Sport, Newcastle",
      body: "Specialising in applied sports data and performance analysis, with a focus on football.",
    },
  ],
};

export const work = {
  title: ["Selected work.", "Sport, through data."],
  body: [
    "Projects from my MSc and my own analysis of football data, from shot models to player profiles.",
    "Open to part-time roles in applied sports data and performance analysis alongside my studies.",
  ],
  // PLACEHOLDER projects: replace with Manuel's real ones.
  projects: [
    {
      name: "Expected goals model.",
      status: "Placeholder",
      body: "A shot-based xG model trained on open event data, comparing logistic regression and gradient boosting, with calibration checks.",
      tools: ["Python", "scikit-learn", "Event data"],
      href: "https://github.com/",
    },
    {
      name: "Player scouting radar.",
      status: "Placeholder",
      body: "Per-90 performance profiles and similarity search to find comparable players across leagues, presented as interactive radars.",
      tools: ["Pandas", "Statistics", "Visualisation"],
      href: "https://github.com/",
    },
    {
      name: "Match load dashboard.",
      status: "Placeholder",
      body: "A dashboard tracking training and match load for a squad, flagging outliers and data-quality issues before they reach staff.",
      tools: ["SQL", "Power BI", "Data QA"],
      href: "https://github.com/",
    },
  ],
  // Credentials from the CV, shown as floating cards.
  focus: [
    {
      name: "AIFF 'D' licence.",
      body: "Coaching certificate from the All India Football Federation, 2024. I understand the game from the touchline, not just the spreadsheet.",
    },
    {
      name: "Talent ID.",
      body: "Introduction to Talent Identification in Football, England Football Learning, 2024. Plus SafeSport trained.",
    },
    {
      name: "Data integrity.",
      body: "Tricentis Data Integrity Fundamentals for end-to-end data warehouse testing, and a Bravo Award for best tester in the team.",
    },
  ],
};

export const process = {
  title: "How I work",
  body: "QA taught me that insight is only as good as the data under it. Every analysis runs through the same four steps.",
  phases: [
    {
      name: "Collect",
      body: "Pull event, tracking and match data from the right sources, and write down exactly where every number came from.",
    },
    {
      name: "Validate",
      body: "Check accuracy, integrity and consistency before anything else. Find the anomalies, missing values and mismatches early.",
    },
    {
      name: "Model",
      body: "Build the simplest model that answers the question, then test it honestly against data it hasn't seen.",
    },
    {
      name: "Communicate",
      body: "Turn the result into something a coach can act on, explained clearly to technical and non-technical people alike.",
    },
  ],
};

export const principles = [
  "Validate before you analyse.",
  "Know where every number came from.",
  "Context beats raw counts.",
  "Watch the match, then the data.",
  "Simple models, honest tests.",
  "Per 90 is a start, not an answer.",
  "Find the anomaly, then ask why.",
  "Explain it to the coach, not the model.",
  "Small samples lie loudly.",
  "Visualise to understand, then to persuade.",
  "Document every assumption.",
  "Decisions over dashboards.",
];

export const curiosity = {
  title: "What actually wins a match?",
  body: "Years spent hunting for errors in data made me curious about the questions data can answer. Football is where I want to answer them.",
};

export const contact = {
  title: ["Let's connect.", "I'm listening."],
  faq: [
    {
      q: "What do you work on?",
      a: "Applied sports data and performance analysis, mainly football: data validation, modelling and clear reporting.",
    },
    {
      q: "Where are you based?",
      a: "Newcastle upon Tyne, UK, studying at Newcastle University.",
    },
    {
      q: "Open to opportunities?",
      a: "Yes. I'm looking for part-time roles in applied sports data and performance analysis alongside my MSc.",
    },
    {
      q: "Best way to reach you?",
      a: "Email works best, or find me on LinkedIn.",
    },
  ],
};
