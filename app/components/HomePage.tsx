import { HomeAnchorNav, HomeProjectPreview } from "./HomeInteractive";
import styles from "../home.module.css";

const foundationGroups = [
  {
    index: "01",
    title: "Identity & access",
    items: "Microsoft Entra ID · Identity and access management",
  },
  {
    index: "02",
    title: "Endpoints & devices",
    items: "Microsoft Intune · Apple Business Manager · Device administration",
  },
  {
    index: "03",
    title: "Platforms & support",
    items: "Microsoft 365 · User support · Business-system support",
  },
] as const;

const approaches = [
  {
    index: "01",
    title: "Understand the context.",
    copy: "Start with the user impact, environment, and constraints before changing the system.",
  },
  {
    index: "02",
    title: "Test the change.",
    copy: "Use observable results to confirm what happened, and state clearly what the evidence cannot support.",
  },
  {
    index: "03",
    title: "Document the path.",
    copy: "Record decisions, commands, and outcomes so the work can be reviewed and repeated.",
  },
] as const;

const directionStages = [
  {
    marker: "NOW / IT",
    copy: "Supporting users, identities, endpoints, Microsoft platforms, and business systems while studying for CompTIA Security+.",
  },
  {
    marker: "NEXT / CYBERSECURITY",
    copy: "Move into a SOC or Security Analyst role and build direct experience with monitoring, investigation, vulnerability management, and incident response.",
  },
  {
    marker: "LONG TERM / AI SECURITY",
    copy: "Apply a strong security foundation to the risks, controls, and operational challenges around AI-enabled systems.",
  },
] as const;

function SectionLabel({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <p className={styles.sectionLabel}>
      <span aria-hidden="true" />
      {children}
    </p>
  );
}

export function HomePage() {
  return (
    <div className={styles.site} id="top">
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a className={styles.wordmark} href="#top" aria-label="Jorden Plaines, home">
            <span>Jorden</span> <span>Plaines</span>
          </a>
          <HomeAnchorNav />
        </div>
      </header>

      <main id="main-content">
        <section className={`${styles.hero} ${styles.shell}`} aria-labelledby="hero-title">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>IT / CYBERSECURITY / AI SECURITY</p>
            <h1 className={styles.heroTitle} id="hero-title">
              <span>IT professional.</span>
              <span className={styles.signalText}>
                Building toward cybersecurity + AI security.
              </span>
            </h1>
            <p className={styles.heroIntroduction}>
              I’m Jorden Plaines. My foundation is hands-on IT support across
              identity, endpoints, Microsoft platforms, business systems, and
              the people who rely on them. I’m building from that work toward
              security operations, with AI security as the long-term direction.
            </p>

            <div className={styles.heroStatus} aria-label="Current career status">
              <p>
                <span>CompTIA Security+</span>
                <strong>In progress</strong>
              </p>
              <p>
                <span>Next target</span>
                <strong>SOC / Security Analyst</strong>
              </p>
            </div>

            <div className={styles.heroActions}>
              <a className={styles.primaryAction} href="#work">
                View selected work <span aria-hidden="true">↓</span>
              </a>
              <a className={styles.textAction} href="#contact">
                Get in touch <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <aside className={styles.foundation} aria-labelledby="foundation-title">
            <div className={styles.foundationHeader}>
              <h2 id="foundation-title">Current foundation</h2>
              <span aria-hidden="true">03 AREAS</span>
            </div>
            <ol className={styles.foundationList}>
              {foundationGroups.map((group) => (
                <li key={group.index}>
                  <span className={styles.foundationIndex} aria-hidden="true">
                    {group.index}
                  </span>
                  <div>
                    <h3>{group.title}</h3>
                    <p>{group.items}</p>
                  </div>
                </li>
              ))}
            </ol>
          </aside>
        </section>

        <section className={styles.section} id="work" aria-labelledby="work-title">
          <div className={styles.shell}>
            <SectionLabel>01 / SELECTED WORK</SectionLabel>
            <div className={styles.sectionHeadingRow}>
              <h2 className={styles.sectionTitle} id="work-title">
                Evidence over abstraction.
              </h2>
            </div>

            <article className={styles.projectCard}>
              <div className={styles.projectContent}>
                <p className={styles.projectMeta}>CASE STUDY 01 · CONTROLLED LAB</p>
                <h3>Windows Network Exposure &amp; SMB Hardening Lab</h3>
                <p className={styles.projectSummary}>
                  A controlled two-host lab using Nmap, PowerShell, and Windows
                  Firewall to compare local listeners with network reachability,
                  test TCP 445 safely, and verify SMB security settings.
                </p>
                <p className={styles.projectSupport}>
                  The case study follows target verification, exposure mapping, a
                  temporary SMB reachability test, host-side correlation,
                  configuration changes, and validation. Each conclusion is tied
                  to the evidence shown, with limitations stated where the
                  retained captures cannot support a stronger claim.
                </p>

                <dl className={styles.projectDetails}>
                  <div>
                    <dt>Environment</dt>
                    <dd>Windows 11 · Kali Linux · Same private LAN</dd>
                  </div>
                  <div>
                    <dt>Tools</dt>
                    <dd>Nmap · PowerShell · netstat · Windows Firewall</dd>
                  </div>
                  <div>
                    <dt>Format</dt>
                    <dd>Full walkthrough · Screenshots · Technical captions</dd>
                  </div>
                </dl>

                <a
                  className={styles.projectAction}
                  href="/work/windows-network-exposure-smb-hardening"
                >
                  Read the full case study <span aria-hidden="true">→</span>
                </a>
              </div>

              <figure className={styles.projectFigure}>
                <HomeProjectPreview />
                <figcaption>
                  Controlled evidence: TCP 445 reported open during the temporary
                  firewall test.
                </figcaption>
              </figure>
            </article>
          </div>
        </section>

        <section className={styles.section} id="about" aria-labelledby="about-title">
          <div className={styles.shell}>
            <SectionLabel>02 / ABOUT + APPROACH</SectionLabel>
            <div className={styles.aboutIntroduction}>
              <h2 className={styles.sectionTitle} id="about-title">
                Good IT work makes complexity manageable.
              </h2>
              <p>
                I work where technical systems meet real user needs. A fix is not
                complete just because the immediate issue disappears; it should be
                understood, verified, and documented so the environment is easier
                to support afterward.
              </p>
            </div>

            <ol className={styles.approachGrid}>
              {approaches.map((approach) => (
                <li key={approach.index}>
                  <span className={styles.approachIndex} aria-hidden="true">
                    {approach.index}
                  </span>
                  <h3>{approach.title}</h3>
                  <p>{approach.copy}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          className={`${styles.section} ${styles.directionSection}`}
          id="direction"
          aria-labelledby="direction-title"
        >
          <div className={styles.shell}>
            <SectionLabel>03 / DIRECTION</SectionLabel>
            <h2 className={styles.sectionTitle} id="direction-title">
              From IT operations to security operations.
            </h2>

            <ol className={styles.timeline}>
              {directionStages.map((stage, index) => (
                <li key={stage.marker}>
                  <div className={styles.timelineMarker} aria-hidden="true">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className={styles.timelineLabel}>{stage.marker}</h3>
                  <p className={styles.timelineCopy}>{stage.copy}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={styles.contact} id="contact" aria-labelledby="contact-title">
          <div className={`${styles.shell} ${styles.contactGrid}`}>
            <div>
              <SectionLabel>04 / CONTACT</SectionLabel>
              <h2 className={styles.contactTitle} id="contact-title">
                Let’s talk about what comes next.
              </h2>
            </div>
            <div className={styles.contactContent}>
              <p>
                I’m working toward SOC and Security Analyst opportunities and
                welcome conversations about security operations, technical
                projects, and the future of AI security. If that overlaps with
                what you’re hiring for or building, I’d be glad to connect.
              </p>
              <div className={styles.contactLinks}>
                <a
                  href="https://www.linkedin.com/in/jorden-plaines/"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn <span aria-hidden="true">↗</span>
                </a>
                <a
                  href="https://github.com/jplaines"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={`${styles.shell} ${styles.footerInner}`}>
          <div>
            <strong>Jorden Plaines</strong>
            <span>IT · Cybersecurity · AI Security</span>
          </div>
          <p>© 2026 Jorden Plaines</p>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
