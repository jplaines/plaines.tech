"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import styles from "./case-study.module.css";

export type EvidenceItem = {
  src: string;
  width: number;
  height: number;
  alt: string;
  title: string;
  caption: string;
};

type EvidenceContextValue = {
  images: EvidenceItem[];
  open: (index: number, trigger: HTMLButtonElement) => void;
};

const EvidenceContext = createContext<EvidenceContextValue | null>(null);

export function EvidenceProvider({
  images,
  children,
}: {
  images: EvidenceItem[];
  children: ReactNode;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const close = useCallback(() => setIsOpen(false), []);

  const open = useCallback((index: number, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setActiveIndex(index);
    setIsOpen(true);
  }, []);

  const previous = useCallback(() => {
    setActiveIndex((current) => (current - 1 + images.length) % images.length);
  }, [images.length]);

  const next = useCallback(() => {
    setActiveIndex((current) => (current + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!isOpen) return;

    const priorOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        previous();
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        next();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
        ),
      );

      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = priorOverflow;
      triggerRef.current?.focus();
    };
  }, [close, isOpen, next, previous]);

  const activeImage = images[activeIndex];

  return (
    <EvidenceContext.Provider value={{ images, open }}>
      {children}
      {isOpen && activeImage ? (
        <div className={styles.lightboxBackdrop} role="presentation">
          <div
            aria-describedby="evidence-lightbox-caption"
            aria-labelledby="evidence-lightbox-title"
            aria-modal="true"
            className={styles.lightboxDialog}
            ref={dialogRef}
            role="dialog"
          >
            <div className={styles.lightboxHeader}>
              <div>
                <p className={styles.lightboxCount}>
                  Evidence {activeIndex + 1} of {images.length}
                </p>
                <h2 id="evidence-lightbox-title">{activeImage.title}</h2>
              </div>
              <button
                aria-label="Close screenshot viewer"
                className={styles.lightboxClose}
                onClick={close}
                ref={closeRef}
                type="button"
              >
                Close <span aria-hidden="true">×</span>
              </button>
            </div>

            <div className={styles.lightboxImageFrame}>
              <Image
                alt={activeImage.alt}
                className={styles.lightboxImage}
                height={activeImage.height}
                priority
                sizes="100vw"
                src={activeImage.src}
                width={activeImage.width}
              />
            </div>

            <div className={styles.lightboxFooter}>
              <button
                aria-label="View previous screenshot"
                className={styles.lightboxNavButton}
                onClick={previous}
                type="button"
              >
                <span aria-hidden="true">←</span> Previous
              </button>
              <p id="evidence-lightbox-caption">{activeImage.caption}</p>
              <button
                aria-label="View next screenshot"
                className={styles.lightboxNavButton}
                onClick={next}
                type="button"
              >
                Next <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </EvidenceContext.Provider>
  );
}

export function EvidenceTrigger({ index }: { index: number }) {
  const context = useContext(EvidenceContext);

  if (!context) {
    throw new Error("EvidenceTrigger must be used inside EvidenceProvider.");
  }

  const image = context.images[index];

  return (
    <button
      aria-label={`Open full-size screenshot: ${image.title}`}
      className={styles.evidenceTrigger}
      onClick={(event) => context.open(index, event.currentTarget)}
      type="button"
    >
      <Image
        alt={image.alt}
        className={styles.evidenceImage}
        height={image.height}
        loading="lazy"
        sizes="(max-width: 780px) calc(100vw - 54px), (max-width: 1200px) 42vw, 660px"
        src={image.src}
        width={image.width}
      />
      <span className={styles.zoomHint}>
        View full size <span aria-hidden="true">↗</span>
      </span>
    </button>
  );
}
