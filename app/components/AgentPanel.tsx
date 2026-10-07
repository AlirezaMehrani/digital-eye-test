"use client";

import { useState } from "react";
import type { Agent, Property } from "../data/site";
import { formatPrice } from "../lib/properties";
import { ArrowRight, Mail, Phone } from "./Icons";
import InquiryDialog, { type InquiryMode } from "./InquiryDialog";
import SmartImage from "./SmartImage";
import styles from "./AgentPanel.module.css";

type AgentPanelProps = {
  agent: Agent;
  property: Property;
};

export default function AgentPanel({ agent, property }: AgentPanelProps) {
  const [mode, setMode] = useState<InquiryMode | null>(null);

  return (
    <>
      <aside className={styles.panel} aria-label="Listing agent">
        <div className={styles.head}>
          <SmartImage
            id={agent.photo}
            alt={`Portrait of ${agent.name}`}
            sizes="76px"
            className={styles.portrait}
          />
          <div>
            <p className={styles.name}>{agent.name}</p>
            <p className={styles.role}>{agent.role}</p>
          </div>
        </div>

        <ul className={styles.contact}>
          <li>
            <a href={`tel:${agent.phone.replace(/[^\d+]/g, "")}`}>
              <Phone size={16} />
              <span>{agent.phone}</span>
            </a>
          </li>
          <li>
            <a href={`mailto:${agent.email}`}>
              <Mail size={16} />
              <span>{agent.email}</span>
            </a>
          </li>
        </ul>

        <div className={styles.actions}>
          <button type="button" className={`btn btnDark ${styles.button}`} onClick={() => setMode("contact")}>
            Contact Agent
          </button>
          <button type="button" className={`btn btnLight ${styles.button}`} onClick={() => setMode("viewing")}>
            Schedule a Viewing
            <ArrowRight size={16} />
          </button>
        </div>

        <p className={styles.note}>Private viewings are arranged within 48 hours.</p>
      </aside>

      <div className={styles.mobileBar}>
        <div className={styles.mobileInfo}>
          <span className={styles.mobileName}>{property.name}</span>
          <span className={styles.mobilePrice}>{formatPrice(property.price)}</span>
        </div>
        <div className={styles.mobileActions}>
          <button type="button" className="btn btnLight btnSm" onClick={() => setMode("contact")}>
            Contact
          </button>
          <button type="button" className="btn btnDark btnSm" onClick={() => setMode("viewing")}>
            Viewing
          </button>
        </div>
      </div>

      <InquiryDialog
        open={mode !== null}
        mode={mode ?? "contact"}
        propertyName={property.name}
        agentName={agent.name}
        onClose={() => setMode(null)}
      />
    </>
  );
}
