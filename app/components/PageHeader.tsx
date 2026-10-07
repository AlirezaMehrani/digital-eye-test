import styles from "./PageHeader.module.css";

type PageHeaderProps = {
  label: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
};

/** Dark editorial band used at the top of every subpage. */
export default function PageHeader({ label, title, description, children }: PageHeaderProps) {
  return (
    <section className={styles.header}>
      <div className="container">
        <span className="label labelOnDark">{label}</span>
        <h1 className={styles.title}>{title}</h1>
        {description && <p className={styles.text}>{description}</p>}
        {children}
      </div>
    </section>
  );
}
