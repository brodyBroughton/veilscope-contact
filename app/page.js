'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [msg, setMsg] = useState({ type: '', text: '' });
  const [submitting, setSubmitting] = useState(false);
  const year = new Date().getFullYear();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    // Validate required fields before submitting to the API
    if (!data.name || !data.name.trim()) {
      setMsg({ type: 'error', text: 'Please enter your name.' });
      return;
    }
    if (!data.email || !emailPattern.test(data.email)) {
      setMsg({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }
    if (!data.topic || !data.topic.trim()) {
      setMsg({ type: 'error', text: 'Please select a topic.' });
      return;
    }
    if (!data.message || !data.message.trim()) {
      setMsg({ type: 'error', text: 'Please enter your message.' });
      return;
    }

    setSubmitting(true);
    setMsg({ type: '', text: '' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name.trim(),
          email: data.email.trim(),
          topic: data.topic.trim(),
          message: data.message.trim(),
        }),
      });

      if (res.ok) {
        setMsg({ type: 'success', text: 'Thanks — your message was sent!' });
        form.reset();
      } else {
        const err = await res.json();
        const errMsg = err?.error || 'Sorry, sending failed. Please try again.';
        setMsg({ type: 'error', text: errMsg });
      }
    } catch (error) {
      console.error('Submission error:', error);
      setMsg({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>
      <input id="nav-toggle" className="nav-toggle" type="checkbox" aria-hidden="true" />

      <header className="site-header">
        <div className="nav-wrap">
          <a className="brand" href="https://veilscope.com/">
            <img className="brand-logo" src="/assets/img/logos/veilscope-logo-dark.svg" alt="Veilscope Logo" />
          </a>

          <nav className="primary-nav" aria-label="Primary">
            <ul className="nav-list">
              <li><a href="https://veilscope.com/learn-more.html">Learn More</a></li>
              <li><a href="https://veilscope.com/about.html">About Us</a></li>
              <li><a href="https://veilscope.com/updates.html">Project Updates</a></li>
            </ul>
          </nav>

          <div className="nav-actions">
            <a className="btn btn-login" href="https://veilscope.com/webapp.html">Log In</a>
            <a className="btn btn-get-started" href="https://veilscope.com/webapp.html">Get Started</a>
          </div>

          <label className="hamburger" htmlFor="nav-toggle" aria-controls="mobile-menu" aria-expanded="false">
            <span className="bar"></span><span className="bar"></span><span className="bar"></span>
          </label>
        </div>
      </header>

      <aside id="mobile-menu" className="mobile-drawer" aria-label="Mobile navigation">
        <nav className="drawer-nav">
          <a className="drawer-link" href="https://veilscope.com/learn-more.html">Learn More</a>
          <a className="drawer-link" href="https://veilscope.com/about.html">About Us</a>
          <a className="drawer-link" href="https://veilscope.com/updates.html">Project Updates</a>
        </nav>
        <div className="drawer-actions">
          <a className="btn btn-get-started" href="https://veilscope.com/webapp.html">Get Started</a>
          <a className="btn btn-login" href="https://veilscope.com/webapp.html">Log In</a>
        </div>
      </aside>

      <main id="main">
        <section className="page-hero">
          <div className="container">
            <h1>Contact Us</h1>
            <p>Questions, partnerships, or press — we’d love to hear from you.</p>
          </div>
        </section>

        <section className="content-section">
          <div className="container contact-layout">
            <form id="contact-form" className="form-card" onSubmit={onSubmit} noValidate>
              <div className="form-row">
                <label htmlFor="name">Full name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  disabled={submitting}
                />
              </div>

              <div className="form-row">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  disabled={submitting}
                />
              </div>

              <div className="form-row">
                <label htmlFor="topic">Topic</label>
                <select
                  id="topic"
                  name="topic"
                  required
                  disabled={submitting}
                >
                  <option value="">Choose a topic…</option>
                  <option>General</option>
                  <option>Partnership</option>
                  <option>Press</option>
                  <option>Support</option>
                </select>
              </div>

              <div className="form-row">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  disabled={submitting}
                ></textarea>
              </div>

              <button className="btn btn-get-started" type="submit" disabled={submitting}>
                {submitting ? 'Sending...' : 'Send message'}
              </button>
              <p
                id="contact-msg"
                className={`form-msg ${msg.type ? msg.type : ''}`}
                aria-live="polite"
              >
                {msg.text}
              </p>
            </form>
          </div>
        </section>
      </main>

      <div className="footer-leadin" aria-hidden="true"></div>
      <footer className="site-footer" role="contentinfo">
        <div className="footer-wrap">
          <section className="footer-brand">
            <a className="brand brand--footer" href="https://veilscope.com/" aria-label="Veilscope Home">
              <img className="brand-logo" src="/assets/img/logos/veilscope-logo-light.svg" alt="Veilscope" />
            </a>
            <p className="footer-tagline">AI insights from public financial filings.</p>

            <div className="newsletter">
              <p className="newsletter-label">
                Occasional updates on product progress, new features, and research notes.
              </p>
              <a className="btn btn-get-started newsletter-cta" href="https://veilscope.com/updates.html">
                View Updates
              </a>
            </div>
          </section>

          <nav className="footer-col" aria-label="Explore">
            <h3 className="footer-title">Explore</h3>
            <ul className="footer-links">
              <li><a href="https://veilscope.com/about.html">About Us</a></li>
              <li><a href="https://veilscope.com/learn-more.html">About the Project</a></li>
              <li><a href="https://veilscope.com/updates.html">Project Updates</a></li>
              <li><a href="https://contact.veilscope.com/">Contact Us</a></li>
              <li><a href="https://veilscope.com/learn-more.html#faq">Help &amp; FAQ</a></li>
            </ul>
          </nav>

          <nav className="footer-col" aria-label="Connect">
            <h3 className="footer-title">Connect</h3>
            <ul className="footer-links">
              <li><a href="#">Resources and References</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </nav>

          <nav className="footer-col" aria-label="Socials">
            <h3 className="footer-title">Socials</h3>
            <ul className="footer-links">
              <li><a href="#">Newsletter</a></li>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">TikTok</a></li>
              <li><a href="#">Facebook</a></li>
            </ul>
          </nav>
        </div>

        <div className="footer-bottom">
          <p className="copyright">© {year} Veilscope. All rights reserved.</p>
          <ul className="legal-links">
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Terms</a></li>
            <li><a href="#">Status</a></li>
            <li><a href="https://contact.veilscope.com/">Contact</a></li>
          </ul>
        </div>
      </footer>
    </>
  );
}
