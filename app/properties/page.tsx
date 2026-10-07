import type { Metadata } from "next";
import { Suspense } from "react";
import PageHeader from "../components/PageHeader";
import PropertyBrowser from "../components/PropertyBrowser";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Properties",
  description:
    "Browse the Horizon Properties portfolio of architect-designed homes, private estates and prime investment property. Filter by location, type, price, bedrooms and bathrooms.",
};

export default function PropertiesPage() {
  return (
    <>
      <PageHeader
        label="Portfolio"
        title="Properties"
        description="Every property we represent is visited, measured and documented by a senior advisor. Filter the portfolio below, or tell us what you are looking for and we will search off-market."
      />

      <section className={`section ${styles.body}`}>
        <div className="container">
          <Suspense fallback={<p className={styles.loading}>Loading the portfolio…</p>}>
            <PropertyBrowser />
          </Suspense>
        </div>
      </section>
    </>
  );
}
