"use client";

import Image from "next/image";
import { useEffect, useState, type MouseEvent } from "react";
import styles from "../home.module.css";

const navigationItems = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "direction", label: "Direction" },
  { id: "contact", label: "Contact" },
] as const;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function HomeAnchorNav() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const sections = navigationItems
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              Math.abs(first.boundingClientRect.top) -
              Math.abs(second.boundingClientRect.top),
          )[0];

        if (current) {
          setActiveSection(current.target.id);
        }
      },
      {
        rootMargin: "-24% 0px -62% 0px",
        threshold: [0, 0.25, 0.5],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  function handleAnchorClick(
    event: MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) {
    if (prefersReducedMotion()) {
      return;
    }

    const section = document.getElementById(sectionId);
    if (!section) {
      return;
    }

    event.preventDefault();
    window.history.pushState(null, "", `#${sectionId}`);
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <nav className={styles.navigation} aria-label="Primary navigation">
      {navigationItems.map(({ id, label }) => (
        <a
          className={styles.navigationLink}
          href={`#${id}`}
          key={id}
          aria-current={activeSection === id ? "location" : undefined}
          onClick={(event) => handleAnchorClick(event, id)}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}

export function HomeProjectPreview() {
  const [imageUnavailable, setImageUnavailable] = useState(false);

  return (
    <div className={styles.projectMediaFrame}>
      {!imageUnavailable ? (
        <Image
          className={styles.projectImage}
          src="/images/lab/smb-reachable-kali.png"
          alt="Kali terminal showing TCP port 445 reported open during the controlled firewall test."
          fill
          sizes="(max-width: 900px) 100vw, 50vw"
          onError={() => setImageUnavailable(true)}
        />
      ) : (
        <div
          className={styles.projectImageFallback}
          role="img"
          aria-label="Evidence-led case study preview."
        >
          <span>CASE STUDY 01 / EVIDENCE</span>
          <strong>Network view</strong>
          <i aria-hidden="true">↕</i>
          <strong>Host view</strong>
          <small>Every conclusion tied to the result shown.</small>
        </div>
      )}
      <div className={styles.mediaIndex} aria-hidden="true">
        01 / 01
      </div>
    </div>
  );
}
