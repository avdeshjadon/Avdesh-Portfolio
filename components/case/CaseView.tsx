"use client";

/* Client half of the case study. The route stays a server component so
   generateStaticParams / generateMetadata keep working; everything the
   reader sees lives here. */

import Link from "next/link";
import { PROJECTS } from "@/content/projects";
import { useLang, L } from "@/lib/i18n";
import styles from "./case.module.css";

export default function CaseView({ slug }: { slug: string }) {
  const { t } = useLang();

  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return null; /* the server component already called notFound() */

  const study = project.study;
  const tags = project.tags;

  const idx = PROJECTS.indexOf(project);
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  return (
    <main className={styles.page}>
      <div className={styles.bar}>
        <Link href="/#work" className={styles.back}>
          {t("case.back")}
        </Link>
        <div className={styles.barRight}>
          <Link href="/" className={styles.logo}>
            AVDESH<i>.</i>
          </Link>
        </div>
      </div>

      <div className={styles.wrap}>
        {/* ---- hero ---- */}
        <header className={styles.hero}>
          <p className={styles.kicker}>
            {t("case.kicker")} · {project.year}
            {project.award ? ` · ${project.award}` : ""}
          </p>
          <h1 className={styles.title}>{L("en", project, "title")}</h1>
          <p className={styles.oneLiner}>{L("en", project, "oneLiner")}</p>
          <div className={styles.meta}>
            <div>
              <b>{t("case.role")}</b>
              <span>{study.role}</span>
            </div>
            <div>
              <b>{t("case.timeline")}</b>
              <span>{study.timeline}</span>
            </div>
            <div>
              <b>{t("case.focus")}</b>
              <span>{tags.join(" · ")}</span>
            </div>
            {/* verified official destinations only — never a guessed URL */}
            {project.site && (
              <div>
                <b>{t("case.site")}</b>
                <span>
                  <a
                    className={styles.siteLink}
                    href={project.site.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {project.site.label} ↗
                  </a>
                </span>
              </div>
            )}
            {project.repo && (
              <div>
                <b>{t("case.repo")}</b>
                <span>
                  <a
                    className={styles.siteLink}
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub ↗
                  </a>
                </span>
              </div>
            )}
          </div>
          {project.cover ? (
            <div
              className={styles.cover}
              style={{
                background: project.cover.bg,
                color: project.cover.ink === "light" ? "#fff" : "var(--ink)",
              }}
            >
              {project.cover.src && project.cover.variant === "photo" ? (
                <img
                  className={styles.coverPhoto}
                  src={project.cover.src}
                  alt={project.coverLabel}
                  style={
                    project.cover.focus ? { objectPosition: project.cover.focus } : undefined
                  }
                />
              ) : project.cover.src ? (
                <img
                  className={styles.coverBrand}
                  src={project.cover.src}
                  alt={project.coverLabel}
                  style={{ aspectRatio: project.cover.aspect ?? 1 }}
                />
              ) : (
                <span className={styles.coverMark}>{project.cover.mark}</span>
              )}
            </div>
          ) : (
            <div className={styles.cover}>
              ▢&nbsp;&nbsp;{project.coverLabel} — {t("case.cover")}
            </div>
          )}
        </header>

        {/* ---- context ---- */}
        <section className={styles.section}>
          <p className={styles.secLabel}>{t("case.context")}</p>
          <p className={styles.body}>{study.context}</p>
        </section>

        {/* ---- problem ---- */}
        <section className={styles.section}>
          <p className={styles.secLabel}>{t("case.problem")}</p>
          <p className={styles.problem}>{study.problem}</p>
        </section>

        {/* ---- process ---- */}
        <section className={styles.section}>
          <p className={styles.secLabel}>{t("case.process")}</p>
          <div className={styles.steps}>
            {/* index keys on purpose: these lists are static and never
                reorder, so switching language re-labels rows in place
                instead of remounting them */}
            {study.process.map((s, i) => (
              <div className={styles.step} key={i}>
                <span className={styles.stepN}>0{i + 1}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---- decisions ---- */}
        <section className={styles.section}>
          <p className={styles.secLabel}>{t("case.decisions")}</p>
          <div className={styles.decisions}>
            {study.decisions.map((d, i) => (
              <div className={styles.decision} key={i}>
                <h3>{d.title}</h3>
                <p>{d.why}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---- outcome ---- */}
        <section className={styles.section}>
          <p className={styles.secLabel}>{t("case.outcome")}</p>
          <div className={styles.outcomes}>
            {study.outcomes.map((o, i) => (
              <p className={styles.outcome} key={i}>
                <span>✦</span> {o}
              </p>
            ))}
          </div>
          {study.note && <p className={styles.note}>{study.note}</p>}
        </section>

        {/* ---- reflection ---- */}
        <section className={styles.section}>
          <p className={styles.secLabel}>{t("case.reflection")}</p>
          <p className={styles.reflection}>&ldquo;{study.reflection}&rdquo;</p>
        </section>

        {/* ---- next ---- */}
        <nav className={styles.footNav}>
          <Link href="/#work" className={styles.back}>
            {t("case.all")}
          </Link>
          <Link href={`/work/${next.slug}`} className={styles.nextLink}>
            <small>{t("case.next")}</small>
            <span>
              {L("en", next, "title")} <i>→</i>
            </span>
          </Link>
        </nav>
      </div>
    </main>
  );
}
