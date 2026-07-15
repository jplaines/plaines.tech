import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main id="main-content" className={styles.page}>
      <div className={styles.card}>
        <p className={styles.code}>404 / NOT FOUND</p>
        <h1>That path ends here.</h1>
        <p>
          The page may have moved, but the portfolio and selected work are still
          available from the homepage.
        </p>
        <Link href="/">Return home <span aria-hidden="true">→</span></Link>
      </div>
    </main>
  );
}
