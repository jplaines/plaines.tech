import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(new URL(pathname, "https://jplaines.com"), {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the finished homepage", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Jorden Plaines \| IT, Cybersecurity &amp; AI Security<\/title>/i);
  assert.match(html, /IT professional\./i);
  assert.match(html, /Building toward cybersecurity \+ AI security\./i);
  assert.match(html, /Windows Network Exposure &amp; SMB Hardening Lab/i);
  assert.match(html, /href="\/work\/windows-network-exposure-smb-hardening"/i);
  assert.match(html, /linkedin\.com\/in\/jorden-plaines/i);
  assert.match(html, /github\.com\/jplaines/i);
  assert.match(html, /property="og:image" content="https:\/\/jplaines\.com\/og\.png"/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
  assert.doesNotMatch(
    html,
    /\benterprise\b|jorden@plaines\.tech|Tiny Thinkers|Plaines Tech/i,
  );
});

test("server-renders the complete evidence-led case study", async () => {
  const response = await render(
    "/work/windows-network-exposure-smb-hardening",
  );
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(
    html,
    /<title>Windows Network Exposure &amp; SMB Hardening Lab \| Jorden Plaines<\/title>/i,
  );
  assert.match(html, /Objective and boundaries/i);
  assert.match(html, /Remote exposure vs\. local listeners/i);
  assert.match(html, /A post-deletion network scan was not retained/i);
  assert.match(html, /No valid network-side post-hardening capture was retained/i);
  assert.match(html, /security conclusions must match the evidence/i);

  const imageNames = [
    "network-verification-kali.png",
    "filtered-port-scan-kali.png",
    "local-listeners-windows.png",
    "temporary-smb-allow-rule-windows.png",
    "smb-reachable-kali.png",
    "temporary-smb-rule-deleted-windows.png",
    "service-scan-kali.png",
    "pid-map-windows.png",
    "smbv1-disabled-windows.png",
    "smb-signing-client-windows.png",
    "smb-settings-verified-windows.png",
    "firewall-block-rule-created-windows.png",
  ];

  for (const imageName of imageNames) {
    assert.match(html, new RegExp(imageName.replaceAll(".", "\\."), "i"));
  }

  assert.doesNotMatch(
    html,
    /\benterprise\b|jorden@plaines\.tech|Plaines Tech|Nessus|external attacker/i,
  );
});

test("ships only the approved evidence set and final brand assets", async () => {
  const imageDirectory = new URL("../public/images/lab/", import.meta.url);
  const evidenceFiles = (await readdir(imageDirectory))
    .filter((file) => file.endsWith(".png"))
    .sort();

  assert.equal(evidenceFiles.length, 12);
  await Promise.all([
    access(new URL("../public/og.png", import.meta.url)),
    access(new URL("../public/favicon.png", import.meta.url)),
    access(new URL("../public/apple-touch-icon.png", import.meta.url)),
    access(new URL("../public/icon-512.png", import.meta.url)),
  ]);
});

test("removes the disposable starter surface", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /HomePage/);
  assert.match(layout, /Jorden Plaines/);
  assert.doesNotMatch(page, /SkeletonPreview|codex-preview/);
  assert.doesNotMatch(layout, /Starter Project|codex-preview/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  await assert.rejects(access(new URL("../app/_sites-preview", import.meta.url)));
});
