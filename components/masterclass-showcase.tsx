import styles from "@/styles/masterclass.module.css"

export function MasterclassShowcase() {
  return (
    <section className={styles.stage} aria-label="Masterclass Visual Style" role="region">
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.ring} aria-hidden="true" />
      <div className={styles.grid} aria-hidden="true" />

      <div className={styles.content}>
        <p className={styles.eyebrow}>FUBON GUARDIANS</p>
        <h1 className={styles.title}>
          starting
          <span>lineup</span>
        </h1>
        <p className={styles.subtitle}>2025 • Art direction, motion, and brand identity</p>
        <div className={styles.buttons}>
          <button className={styles.primary}>Explore the Build</button>
          <button className={styles.secondary}>View Case Studies</button>
        </div>
      </div>
    </section>
  )
}
