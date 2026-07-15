import type { Metadata } from "next";
import Link from "next/link";
import { CaseStudyToc, type TocItem } from "./CaseStudyToc";
import {
  EvidenceProvider,
  EvidenceTrigger,
  type EvidenceItem,
} from "./EvidenceLightbox";
import styles from "./case-study.module.css";

const CASE_STUDY_PATH = "/work/windows-network-exposure-smb-hardening";

export const metadata: Metadata = {
  title: "Windows Network Exposure & SMB Hardening Lab",
  description:
    "A documented Windows 11 and Kali Linux lab comparing local listeners with network reachability, testing TCP 445, and verifying SMB and firewall controls.",
  alternates: {
    canonical: `https://jplaines.com${CASE_STUDY_PATH}`,
  },
  openGraph: {
    title: "Windows Network Exposure & SMB Hardening Lab",
    description:
      "A controlled, evidence-led lab comparing Windows listeners with same-LAN network reachability and verifying SMB controls.",
    type: "article",
    url: `https://jplaines.com${CASE_STUDY_PATH}`,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Jorden Plaines — IT professional building toward cybersecurity and AI security",
      },
    ],
  },
};

const EVIDENCE: EvidenceItem[] = [
  {
    src: "/images/lab/network-verification-kali.png",
    width: 595,
    height: 194,
    alt: "Kali terminal showing four successful ping replies from the Windows target at 192.168.68.71.",
    title: "Initial target reachability",
    caption:
      "Four ICMP echo replies from 192.168.68.71 with 0% packet loss established that the Windows target was reachable from the Kali host at the start of the lab.",
  },
  {
    src: "/images/lab/filtered-port-scan-kali.png",
    width: 1134,
    height: 360,
    alt: "Kali Nmap output reporting the selected Windows TCP ports as filtered.",
    title: "Remote view: selected ports filtered",
    caption:
      "A targeted TCP connect scan reported every selected port as filtered from the Kali peer’s vantage point. In Nmap, filtered means the scanner could not determine whether the ports were open or closed because a filter obstructed the probes.",
  },
  {
    src: "/images/lab/local-listeners-windows.png",
    width: 943,
    height: 466,
    alt: "Windows terminal showing netstat output with local listening ports and owning process IDs.",
    title: "Host view: local listeners",
    caption:
      "Windows netstat -ano showed local TCP listeners on 135, 445, 5040, 7680, and high-numbered ports, together with their owning PIDs. Local listening state does not establish network reachability.",
  },
  {
    src: "/images/lab/temporary-smb-allow-rule-windows.png",
    width: 1056,
    height: 73,
    alt: "Windows PowerShell showing creation of the temporary inbound Allow SMB Test firewall rule for TCP 445.",
    title: "Temporary TCP 445 allow rule",
    caption:
      "Windows accepted creation of the temporary inbound TCP 445 rule named Allow SMB Test.",
  },
  {
    src: "/images/lab/smb-reachable-kali.png",
    width: 687,
    height: 153,
    alt: "Cropped Kali Nmap output reporting TCP port 445 open on the Windows target.",
    title: "TCP 445 reachable during the test",
    caption:
      "After the temporary rule was created, a targeted scan from the same-LAN Kali host reported TCP 445 open. The microsoft-ds text is Nmap’s service label, not a version identification.",
  },
  {
    src: "/images/lab/temporary-smb-rule-deleted-windows.png",
    width: 750,
    height: 93,
    alt: "Windows PowerShell showing deletion of one firewall rule named Allow SMB Test.",
    title: "Temporary rule removed",
    caption:
      "Windows reported deletion of one rule named Allow SMB Test after the controlled check.",
  },
  {
    src: "/images/lab/service-scan-kali.png",
    width: 1025,
    height: 183,
    alt: "Cropped Kali Nmap service scan showing four filtered ports and TCP 7680 open with a tentative service label.",
    title: "Service scan from the network",
    caption:
      "A subsequent service/version scan reported 135, 139, 445, and 5040 filtered, with TCP 7680 open. The pando-pub? label is tentative and does not identify the underlying Windows service.",
  },
  {
    src: "/images/lab/pid-map-windows.png",
    width: 895,
    height: 196,
    alt: "Windows PowerShell mapping process IDs to System, svchost, services, and prl_tools_service processes.",
    title: "Process-owner correlation",
    caption:
      "Get-Process resolved the PIDs captured by netstat to System, svchost, services, and prl_tools_service. This maps process owners, not the specific Windows services hosted inside each svchost process.",
  },
  {
    src: "/images/lab/smbv1-disabled-windows.png",
    width: 1388,
    height: 619,
    alt: "Cropped Windows PowerShell output showing SMB1Protocol and SMB1Protocol-Server in a Disabled state.",
    title: "SMBv1 baseline verified",
    caption:
      "Before any disable action, Windows reported SMB1Protocol and SMB1Protocol-Server as disabled. This verifies the existing baseline; it is not evidence that the lab newly remediated SMBv1.",
  },
  {
    src: "/images/lab/smb-signing-client-windows.png",
    width: 742,
    height: 129,
    alt: "Windows PowerShell showing the client SMB signing configuration command completing without an error.",
    title: "Client SMB signing configured",
    caption:
      "PowerShell explicitly required SMB signatures for the client configuration. The retained capture shows the command being accepted; the resulting value is verified separately.",
  },
  {
    src: "/images/lab/smb-settings-verified-windows.png",
    width: 1794,
    height: 345,
    alt: "Cropped Windows PowerShell verification showing server and client RequireSecuritySignature set to True and server EnableSMB1Protocol set to False.",
    title: "Final SMB settings verified",
    caption:
      "Post-change queries show RequireSecuritySignature: True for both the server and client configurations and EnableSMB1Protocol: False on the server.",
  },
  {
    src: "/images/lab/firewall-block-rule-created-windows.png",
    width: 1559,
    height: 448,
    alt: "Cropped Windows PowerShell showing creation and returned properties of the Block SMB inbound Lab Harden firewall rule.",
    title: "Persistent inbound TCP 445 block rule",
    caption:
      "PowerShell created an enabled inbound block rule intended for TCP 445 across all profiles and placed it in the persistent policy store.",
  },
];

const TOC_ITEMS: TocItem[] = [
  { id: "objective", label: "Objective and boundaries" },
  { id: "target", label: "Establishing the target" },
  { id: "exposure", label: "Remote exposure vs. local listeners" },
  { id: "firewall-experiment", label: "Controlled TCP 445 experiment" },
  { id: "processes", label: "Correlating ports with processes" },
  { id: "controls", label: "Applying and verifying controls" },
  { id: "validation", label: "Validation, limitations, and lessons" },
];

function SectionLabel({ number, children }: { number: string; children: string }) {
  return (
    <p className={styles.sectionLabel}>
      <span>{number}</span> / {children}
    </p>
  );
}

function EvidenceFigure({
  index,
  label,
}: {
  index: number;
  label: string;
}) {
  const image = EVIDENCE[index];

  return (
    <figure className={styles.evidenceFigure}>
      <EvidenceTrigger index={index} />
      <figcaption>
        <span className={styles.figureLabel}>{label}</span>
        <strong>{image.title}</strong>
        <p>{image.caption}</p>
      </figcaption>
    </figure>
  );
}

export default function WindowsNetworkExposureCaseStudy() {
  return (
    <EvidenceProvider images={EVIDENCE}>
      <div className={styles.page}>
        <header className={styles.siteHeader}>
          <div className={styles.headerInner}>
            <Link aria-label="Jorden Plaines home" className={styles.wordmark} href="/">
              Jorden Plaines
            </Link>
            <Link className={styles.backLink} href="/#work">
              <span aria-hidden="true">←</span> Back to selected work
            </Link>
          </div>
        </header>

        <main id="main-content">
          <section className={styles.hero} aria-labelledby="case-study-title">
            <div className={styles.heroInner}>
              <div className={styles.heroCopy}>
                <p className={styles.eyebrow}>CASE STUDY 01 · CONTROLLED LAB</p>
                <h1 id="case-study-title">
                  Windows Network Exposure &amp; SMB Hardening Lab
                </h1>
                <p className={styles.deck}>
                  A controlled two-host lab using Nmap, PowerShell, and Windows Firewall
                  to compare local listeners with network reachability, test TCP 445
                  safely, and verify SMB security settings.
                </p>
              </div>

              <dl className={styles.heroFacts}>
                <div>
                  <dt>Role</dt>
                  <dd>Solo lab</dd>
                </div>
                <div>
                  <dt>Environment</dt>
                  <dd>Windows 11 + Kali Linux in Parallels</dd>
                </div>
                <div>
                  <dt>Vantage point</dt>
                  <dd>Same private LAN</dd>
                </div>
                <div>
                  <dt>Tools</dt>
                  <dd>Nmap · PowerShell · netstat · Windows Firewall</dd>
                </div>
                <div>
                  <dt>Date</dt>
                  <dd>October 2025</dd>
                </div>
              </dl>

              <p className={styles.scopeStatement}>
                The Windows 11 target and Kali Linux scanner ran in Parallels on the
                same private LAN. This was a controlled configuration lab—not an
                Internet-based penetration test, a full vulnerability assessment, or
                an authenticated vulnerability-management engagement.
              </p>
            </div>
          </section>

          <div className={styles.articleShell}>
            <CaseStudyToc items={TOC_ITEMS} />

            <article className={styles.article}>
              <section className={styles.articleSection} id="objective">
                <SectionLabel number="01">OBJECTIVE AND BOUNDARIES</SectionLabel>
                <h2>Start with a question the evidence can answer.</h2>
                <p className={styles.lead}>
                  I used a Kali Linux VM to examine a Windows 11 target from another
                  host on the same private LAN. The goal was to compare network-visible
                  exposure with host-side listeners, deliberately expose TCP 445 long
                  enough to observe firewall behavior, and verify several SMB security
                  settings.
                </p>
                <p>
                  The work was deliberately narrow. It was a controlled configuration
                  lab, not an external penetration test or complete vulnerability
                  assessment.
                </p>

                <div
                  aria-label="Lab topology: a Kali Linux peer connected through a private lab LAN to a Windows 11 target"
                  className={styles.topology}
                  role="img"
                >
                  <div>
                    <span>KALI LINUX</span>
                    <strong>Scanner peer</strong>
                  </div>
                  <span className={styles.topologyLink} aria-hidden="true">
                    <i />
                    <b>PRIVATE LAB LAN</b>
                    <i />
                  </span>
                  <div>
                    <span>WINDOWS 11</span>
                    <strong>Target host</strong>
                  </div>
                </div>
              </section>

              <section className={styles.articleSection} id="target">
                <SectionLabel number="02">ESTABLISHING THE TARGET</SectionLabel>
                <h2>Confirm the starting point.</h2>
                <p>
                  Before testing services, I confirmed that the selected address was
                  responding from the Kali peer. Keeping the check focused on one target
                  avoided publishing unrelated devices from the private network.
                </p>

                <EvidenceFigure index={0} label="EVIDENCE 01 · REACHABILITY" />

                <aside className={styles.interpretation} aria-label="Interpretation">
                  <span>What this establishes</span>
                  <p>
                    The target was reachable at that moment. ICMP replies alone do not
                    establish which application services were accessible.
                  </p>
                </aside>
              </section>

              <section className={styles.articleSection} id="exposure">
                <SectionLabel number="03">REMOTE EXPOSURE VS. LOCAL LISTENERS</SectionLabel>
                <h2>One host, two different views.</h2>
                <p>
                  A remote scan and a local listener check answer different questions.
                  I compared both views instead of treating either one as the entire
                  picture.
                </p>

                <div className={styles.evidencePair}>
                  <EvidenceFigure index={1} label="EVIDENCE 02 · NETWORK VIEW" />
                  <EvidenceFigure index={2} label="EVIDENCE 03 · HOST VIEW" />
                </div>

                <blockquote className={styles.insight}>
                  <span>Core insight</span>
                  <p>
                    The scanner saw the selected ports as filtered even though Windows
                    showed services listening locally. A local listener and a
                    network-reachable service are different facts, so both perspectives
                    were needed.
                  </p>
                </blockquote>

                <p className={styles.sourceNote}>
                  Nmap defines <em>filtered</em> as a state where packet filtering
                  prevents it from determining whether a port is open or closed. The
                  retained evidence does not isolate every possible filtering layer, so
                  this result is not attributed solely to Windows Firewall. See the{" "}
                  <a
                    href="https://nmap.org/book/man-port-scanning-basics.html"
                    rel="noreferrer"
                    target="_blank"
                  >
                    Nmap port-state definitions
                    <span className={styles.visuallyHidden}> (opens in a new tab)</span>
                  </a>
                  .
                </p>
              </section>

              <section className={styles.articleSection} id="firewall-experiment">
                <SectionLabel number="04">CONTROLLED TCP 445 FIREWALL EXPERIMENT</SectionLabel>
                <h2>Change one condition, then observe the result.</h2>
                <p>
                  To test reachability without leaving TCP 445 exposed, I created a
                  time-bounded temporary inbound allow rule for that port, repeated the
                  scan from the same peer, and deleted the named rule after the
                  observation.
                </p>

                <ol className={styles.stateStrip} aria-label="TCP 445 test sequence">
                  <li>
                    <span>01</span>
                    <strong>Filtered</strong>
                    <p>Selected ports were not classifiable from Kali.</p>
                  </li>
                  <li>
                    <span>02</span>
                    <strong>Allow rule</strong>
                    <p>A temporary inbound rule was created for TCP 445.</p>
                  </li>
                  <li>
                    <span>03</span>
                    <strong>Open</strong>
                    <p>The same-LAN scan reached TCP 445.</p>
                  </li>
                  <li>
                    <span>04</span>
                    <strong>Removed</strong>
                    <p>Windows deleted the named temporary rule.</p>
                  </li>
                </ol>

                <div className={styles.evidenceStack}>
                  <EvidenceFigure index={3} label="EVIDENCE 04 · TEMPORARY RULE" />
                  <EvidenceFigure index={4} label="EVIDENCE 05 · PEER-SIDE RESULT" />
                  <EvidenceFigure index={5} label="EVIDENCE 06 · CLEANUP" />
                </div>

                <aside className={styles.honestyNote} aria-label="Evidence boundary">
                  <span>Evidence boundary</span>
                  <p>
                    The captures confirm that TCP 445 became reachable after the
                    temporary rule was created and that Windows later deleted that rule.
                    A post-deletion network scan was not retained, so the resulting port
                    state is not asserted here.
                  </p>
                </aside>
              </section>

              <section className={styles.articleSection} id="processes">
                <SectionLabel number="05">CORRELATING PORTS WITH PROCESSES</SectionLabel>
                <h2>Connect the network result to the host—carefully.</h2>
                <p>
                  I followed the network view with host-side PID mapping. This added
                  context without overstating what a tentative service label or shared
                  process name could prove.
                </p>

                <div className={styles.evidencePair}>
                  <EvidenceFigure index={6} label="EVIDENCE 07 · SERVICE SCAN" />
                  <EvidenceFigure index={7} label="EVIDENCE 08 · PID MAP" />
                </div>

                <p>
                  The comparison connected remote observations to process owners while
                  preserving an important limit: a process name alone was not enough to
                  identify every Windows service behind a shared host process. TCP 7680
                  is therefore not assigned to a specific Windows feature from these
                  captures alone.
                </p>
              </section>

              <section className={styles.articleSection} id="controls">
                <SectionLabel number="06">APPLYING AND VERIFYING SMB CONTROLS</SectionLabel>
                <h2>Separate the baseline, the change, and the final state.</h2>
                <p>
                  The retained captures support three distinct findings. Keeping them
                  separate prevents an existing baseline from being presented as a new
                  remediation and keeps firewall behavior distinct from SMB protocol
                  configuration.
                </p>

                <div className={styles.controlBlock}>
                  <div className={styles.controlCopy}>
                    <p className={styles.controlNumber}>CONTROL 01</p>
                    <h3>SMBv1 was already disabled.</h3>
                    <p>
                      Before any disable action, Windows reported both SMBv1 optional
                      features as disabled. This is a verified starting state, not a
                      claim that the lab newly disabled the protocol.
                    </p>
                  </div>
                  <EvidenceFigure index={8} label="EVIDENCE 09 · EXISTING BASELINE" />
                </div>

                <div className={styles.controlBlock}>
                  <div className={styles.controlCopy}>
                    <p className={styles.controlNumber}>CONTROL 02</p>
                    <h3>SMB signing was explicitly required and verified.</h3>
                    <p>
                      PowerShell required signatures for the server and client
                      configurations. Final queries show RequireSecuritySignature set to
                      True for both. Because no retained baseline shows the previous
                      values, the evidence supports the configured final state—not a
                      claim that both values changed from false.
                    </p>
                    <p className={styles.sourceNote}>
                      SMB signing provides message integrity and helps protect against
                      tampering and relay attacks; it does not encrypt SMB traffic. See
                      Microsoft’s{" "}
                      <a
                        href="https://learn.microsoft.com/en-us/windows-server/storage/file-server/smb-signing-overview"
                        rel="noreferrer"
                        target="_blank"
                      >
                        SMB signing overview
                        <span className={styles.visuallyHidden}>
                          {" "}(opens in a new tab)
                        </span>
                      </a>
                      .
                    </p>
                  </div>
                  <div className={styles.evidenceStack}>
                    <EvidenceFigure index={9} label="EVIDENCE 10 · CLIENT COMMAND" />
                    <EvidenceFigure index={10} label="EVIDENCE 11 · FINAL STATE" />
                  </div>
                </div>

                <div className={styles.controlBlock}>
                  <div className={styles.controlCopy}>
                    <p className={styles.controlNumber}>CONTROL 03</p>
                    <h3>An inbound TCP 445 block rule was created.</h3>
                    <p>
                      The creation command and returned rule object show an enabled,
                      inbound, persistent block rule intended for TCP 445 across all
                      profiles. The claim is limited to TCP 445; the rule does not cover
                      every SMB path, including TCP 139.
                    </p>
                  </div>
                  <EvidenceFigure index={11} label="EVIDENCE 12 · FIREWALL CONTROL" />
                </div>
              </section>

              <section className={styles.articleSection} id="validation">
                <SectionLabel number="07">VALIDATION, LIMITATIONS, AND LESSONS</SectionLabel>
                <h2>End with what is known—and what still needs testing.</h2>

                <div className={styles.outcomeGrid}>
                  <div className={styles.outcomeCard}>
                    <p className={styles.outcomeLabel}>VERIFIED HOST-SIDE OUTCOMES</p>
                    <ul>
                      <li>SMBv1 optional features were disabled before hardening.</li>
                      <li>
                        The final server and client configurations required SMB signing.
                      </li>
                      <li>
                        The persistent inbound block rule was created and returned as
                        enabled with a Block action.
                      </li>
                    </ul>
                  </div>

                  <div className={styles.outcomeCard}>
                    <p className={styles.outcomeLabel}>EVIDENCE LIMITATIONS</p>
                    <ul>
                      <li>
                        The broad NSE run returned no target-specific finding while its
                        selected ports were closed. That is not a clean bill of health.
                      </li>
                      <li>
                        The final “host down” capture came from failed ARP discovery; it
                        is not evidence of successful firewall hardening.
                      </li>
                      <li>No valid network-side post-hardening capture was retained.</li>
                      <li>
                        Results describe one target, one peer, one private network, and
                        one point in time.
                      </li>
                      <li>
                        The Windows version and edition were not captured clearly enough
                        to infer whether signing values differed from system defaults.
                      </li>
                    </ul>
                  </div>
                </div>

                <blockquote className={styles.closingLesson}>
                  <p>
                    The most important lesson was not that one scan made the host
                    “secure.” It was that security conclusions must match the evidence:
                    listener state, firewall configuration, and network reachability
                    each answer a different question.
                  </p>
                </blockquote>

                <div className={styles.futureWork}>
                  <div>
                    <p className={styles.outcomeLabel}>NEXT ITERATION</p>
                    <h3>Close the remaining evidence gaps.</h3>
                  </div>
                  <ol>
                    <li>Capture the exact Windows product, edition, version, and build.</li>
                    <li>
                      Query the effective firewall rule and its associated protocol and
                      port filter.
                    </li>
                    <li>
                      Record immediate scans before the rule, during the temporary allow,
                      after deletion, and after the final block under unchanged conditions.
                    </li>
                    <li>
                      Resolve shared svchost PIDs to the specific hosted Windows services.
                    </li>
                  </ol>
                </div>

                <div className={styles.references}>
                  <h3>Primary technical references</h3>
                  <ul>
                    <li>
                      <a
                        href="https://nmap.org/book/man-port-scanning-basics.html"
                        rel="noreferrer"
                        target="_blank"
                      >
                        Nmap port-state definitions
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://nmap.org/book/vscan-examples.html"
                        rel="noreferrer"
                        target="_blank"
                      >
                        Nmap service/version detection examples
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://learn.microsoft.com/en-us/windows-server/storage/file-server/smb-signing-overview"
                        rel="noreferrer"
                        target="_blank"
                      >
                        Microsoft SMB signing overview
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://learn.microsoft.com/en-us/windows/security/operating-system-security/network-security/windows-firewall/rules"
                        rel="noreferrer"
                        target="_blank"
                      >
                        Microsoft Windows Firewall rule behavior
                      </a>
                    </li>
                  </ul>
                </div>
              </section>
            </article>
          </div>

          <section className={styles.nextProject} aria-label="End of case study">
            <div>
              <p>END OF CASE STUDY 01</p>
              <h2>Review the work. Follow the evidence.</h2>
            </div>
            <Link href="/#work">
              Back to selected work <span aria-hidden="true">↗</span>
            </Link>
          </section>
        </main>

        <footer className={styles.footer}>
          <Link href="/">Jorden Plaines</Link>
          <p>IT · Cybersecurity · AI Security</p>
          <p>© 2026 Jorden Plaines</p>
        </footer>
      </div>
    </EvidenceProvider>
  );
}
