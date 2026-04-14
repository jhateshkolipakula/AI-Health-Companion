'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';

type TabKey = 'transparency' | 'grants' | 'engagements' | 'risk';
type ResourceType = 'all' | 'article' | 'webinar' | 'guide';

const tabContent: Record<TabKey, { title: string; body: string }> = {
  transparency: {
    title: 'Transparency Reporting',
    body: 'Aggregate, validate, and disclose transfer-of-value data with configurable rules and submission-ready exports.'
  },
  grants: {
    title: 'Grants & Sponsorships',
    body: 'Standardize intake, committee review, milestone checks, and payment traceability for compliant program execution.'
  },
  engagements: {
    title: 'HCP Engagements',
    body: 'Control speaker programs and advisory workflows with eligibility checks, FMV alignment, and post-event reconciliation.'
  },
  risk: {
    title: 'Due Diligence',
    body: 'Automate third-party onboarding with risk scoring, sanctions checks, and periodic reassessment workflows.'
  }
};

const resources = [
  { type: 'article', title: 'State Transparency Enforcement Checklist' },
  { type: 'webinar', title: 'Building a Global Spend Program' },
  { type: 'guide', title: 'HCP Engagement Controls Playbook' },
  { type: 'article', title: 'Third-Party Due Diligence Essentials' }
] as const;

const quotes = [
  {
    quote: 'The platform reduced manual disclosure prep by over 50% in our first reporting cycle.',
    author: 'Director, Global Compliance Operations'
  },
  {
    quote: 'We now manage grants and engagements through one governance model across regions.',
    author: 'VP, Medical Affairs'
  },
  {
    quote: 'Exception tracking and audit trails improved internal and external audit readiness.',
    author: 'Head of Compliance Technology'
  }
];

export default function HomePage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>('transparency');
  const [resourceType, setResourceType] = useState<ResourceType>('all');
  const [query, setQuery] = useState('');
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [cookieVisible, setCookieVisible] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'error' | 'success'; text: string } | null>(null);
  const [kpis, setKpis] = useState({ org: 0, countries: 0, sla: 0 });

  useEffect(() => {
    if (window.localStorage.getItem('cookieAccepted') !== 'true') {
      setCookieVisible(true);
    }

    const animate = (target: number, key: 'org' | 'countries' | 'sla', suffix: '' | '%' = '') => {
      let value = 0;
      const step = Math.max(1, Math.floor(target / 40));
      const timer = window.setInterval(() => {
        value += step;
        if (value >= target) {
          value = target;
          window.clearInterval(timer);
        }
        setKpis((prev) => ({ ...prev, [key]: value }));
      }, 30);
      return `${target}${suffix}`;
    };

    animate(400, 'org');
    animate(100, 'countries');
    animate(99, 'sla', '%');
  }, []);

  const filteredResources = useMemo(
    () =>
      resources.filter((resource) => {
        const typeMatch = resourceType === 'all' || resource.type === resourceType;
        const queryMatch = resource.title.toLowerCase().includes(query.toLowerCase());
        return typeMatch && queryMatch;
      }),
    [resourceType, query]
  );

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const firstName = String(formData.get('firstName') || '').trim();
    const lastName = String(formData.get('lastName') || '').trim();
    const company = String(formData.get('company') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const message = String(formData.get('message') || '').trim();

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!firstName || !lastName || !company || !message || !isEmailValid) {
      setFeedback({ type: 'error', text: 'Please complete all fields with a valid business email.' });
      return;
    }

    setFeedback({ type: 'success', text: 'Thank you! Your request has been submitted.' });
    event.currentTarget.reset();
  };

  return (
    <>
      <header className="site-header" id="top">
        <div className="container nav-wrap">
          <a className="brand" href="#top">medispend</a>

          <button className="menu-toggle" onClick={() => setMobileOpen((v) => !v)} aria-expanded={mobileOpen}>
            <span />
            <span />
            <span />
          </button>

          <nav className={`site-nav ${mobileOpen ? 'open' : ''}`}>
            <div className={`nav-item ${dropdownOpen ? 'open' : ''}`}>
              <button className="nav-btn" onClick={() => setDropdownOpen((v) => !v)} aria-expanded={dropdownOpen}>
                Platform
              </button>
              <div className="dropdown">
                <a href="#platform">Overview</a>
                <a href="#capabilities">Capabilities</a>
                <a href="#stories">Stories</a>
              </div>
            </div>
            <a href="#solutions">Solutions</a>
            <a href="#resources">Resources</a>
            <a href="#faq">FAQ</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="section hero">
          <div className="container hero-grid">
            <div>
              <p className="eyebrow">Compliance & Transparency Platform</p>
              <h1>Modernize Life Sciences Compliance With One Unified Platform</h1>
              <p className="lead">
                Next.js + TypeScript implementation with module-level UX for transparency reporting, grants, engagements,
                due diligence, and controls.
              </p>
              <div className="hero-actions">
                <a className="btn" href="#contact">Request Consultation</a>
                <a className="btn btn-light" href="#platform">Explore Platform</a>
              </div>
            </div>

            <aside className="hero-panel">
              <h2>At a Glance</h2>
              <div className="metric">
                <span className="number">{kpis.org}+</span>
                <span>organizations supported</span>
              </div>
              <div className="metric">
                <span className="number">{kpis.countries}+</span>
                <span>country reporting frameworks</span>
              </div>
              <div className="metric">
                <span className="number">{kpis.sla}%</span>
                <span>SLA confidence</span>
              </div>
            </aside>
          </div>
        </section>

        <section id="platform" className="section section-muted">
          <div className="container">
            <h2>Platform Suite</h2>
            <div className="tabs">
              {(Object.keys(tabContent) as TabKey[]).map((key) => (
                <button key={key} className={`tab ${activeTab === key ? 'active' : ''}`} onClick={() => setActiveTab(key)}>
                  {key === 'risk' ? 'Third-Party Risk' : key[0].toUpperCase() + key.slice(1)}
                </button>
              ))}
            </div>
            <article className="tab-panel active">
              <h3>{tabContent[activeTab].title}</h3>
              <p>{tabContent[activeTab].body}</p>
            </article>
          </div>
        </section>

        <section id="capabilities" className="section">
          <div className="container cards cards-4">
            <article className="card"><h3>Workflow Automation</h3><p>Approval paths, reminders, and exception handling.</p></article>
            <article className="card"><h3>Policy Controls</h3><p>Country and program-level controls with audit logs.</p></article>
            <article className="card"><h3>Unified Reporting</h3><p>Dashboards and exports across teams and geographies.</p></article>
            <article className="card"><h3>Case Management</h3><p>Issue routing, ownership, and corrective actions.</p></article>
          </div>
        </section>

        <section id="solutions" className="section section-dark">
          <div className="container split">
            <div>
              <h2>Solutions by Team</h2>
              <p>Workflows tailored for compliance, legal, medical affairs, finance, and commercial operations.</p>
            </div>
            <ul className="checklist">
              <li>Commercial compliance monitoring</li>
              <li>Medical affairs governance</li>
              <li>Field activity transparency</li>
              <li>Event and travel spend oversight</li>
            </ul>
          </div>
        </section>

        <section id="resources" className="section">
          <div className="container">
            <h2>Resources</h2>
            <div className="resource-controls">
              <input placeholder="Search resources..." value={query} onChange={(e) => setQuery(e.target.value)} />
              <select value={resourceType} onChange={(e) => setResourceType(e.target.value as ResourceType)}>
                <option value="all">All Types</option>
                <option value="article">Article</option>
                <option value="webinar">Webinar</option>
                <option value="guide">Guide</option>
              </select>
            </div>
            <div className="cards">
              {filteredResources.map((resource) => (
                <article className="card" key={resource.title}>
                  <p className="tag">{resource.type}</p>
                  <h3>{resource.title}</h3>
                </article>
              ))}
            </div>
            {filteredResources.length === 0 && <p>No matching resources found.</p>}
          </div>
        </section>

        <section id="stories" className="section section-muted">
          <div className="container testimonial">
            <blockquote>“{quotes[quoteIndex].quote}”</blockquote>
            <p>— {quotes[quoteIndex].author}</p>
            <div className="hero-actions">
              <button className="btn btn-light" onClick={() => setQuoteIndex((v) => (v - 1 + quotes.length) % quotes.length)}>Previous</button>
              <button className="btn btn-light" onClick={() => setQuoteIndex((v) => (v + 1) % quotes.length)}>Next</button>
            </div>
          </div>
        </section>

        <section id="faq" className="section">
          <div className="container">
            <h2>Frequently Asked Questions</h2>
            {[
              'How long does implementation take?',
              'Do you support global regulations?',
              'Can we integrate with ERP/CRM tools?'
            ].map((question, index) => (
              <article className={`faq-item ${faqOpen === index ? 'open' : ''}`} key={question}>
                <button className="faq-question" onClick={() => setFaqOpen((v) => (v === index ? null : index))}>{question}</button>
                <div className="faq-answer">
                  <p>Yes. This clone demonstrates expected UX behavior and can be connected to APIs in next steps.</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="section section-muted">
          <div className="container split split-contact">
            <div>
              <h2>Request a Live Demo</h2>
              <p>Submit details for a tailored walkthrough.</p>
            </div>
            <form className="contact-form" onSubmit={submitForm}>
              <input type="text" name="firstName" placeholder="First name" />
              <input type="text" name="lastName" placeholder="Last name" />
              <input type="text" name="company" placeholder="Company" />
              <input type="email" name="email" placeholder="Business email" />
              <textarea name="message" rows={4} placeholder="What would you like to improve?" />
              <button className="btn" type="submit">Submit</button>
              {feedback && <p className={`form-feedback ${feedback.type}`}>{feedback.text}</p>}
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <p>© {new Date().getFullYear()} MediSpend Clone Experience</p>
          <a href="#top" className="back-to-top">Back to top ↑</a>
        </div>
      </footer>

      {cookieVisible && (
        <div className="cookie-banner">
          <p>This site uses cookies to improve your experience.</p>
          <button
            className="btn btn-light"
            onClick={() => {
              window.localStorage.setItem('cookieAccepted', 'true');
              setCookieVisible(false);
            }}
          >
            Accept
          </button>
        </div>
      )}
    </>
  );
}
