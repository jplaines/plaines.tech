"use client";

import { useEffect, useState } from "react";
import styles from "./case-study.module.css";

export type TocItem = {
  id: string;
  label: string;
};

export function CaseStudyToc({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const sections = items
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]?.target.id) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-18% 0px -68%", threshold: [0, 0.1, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  const links = (
    <ol>
      {items.map((item, index) => (
        <li key={item.id}>
          <a
            aria-current={activeId === item.id ? "location" : undefined}
            className={activeId === item.id ? styles.tocActive : undefined}
            href={`#${item.id}`}
          >
            <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            {item.label}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <aside className={styles.toc}>
      <nav aria-label="Case study contents" className={styles.desktopToc}>
        <p>On this page</p>
        {links}
      </nav>
      <details className={styles.mobileToc}>
        <summary>On this page</summary>
        <nav aria-label="Case study contents">{links}</nav>
      </details>
    </aside>
  );
}
