import {
  Coins,
  ShieldCheck,
  Waves,
  BadgeCheck,
  CheckCircle2,
  LucideIcon,
} from "lucide-react";
import { Service } from "@/types/service";
import styles from "./css/ServiceCard.module.css";

const ICON_MAP: Record<string, LucideIcon> = {
  Coins,
  ShieldCheck,
  Waves,
  BadgeCheck,
};

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const Icon = ICON_MAP[service.icon] ?? Coins;

  return (
    <div className={styles.card}>
      <div className={styles.iconWrap}>
        <Icon size={26} strokeWidth={2} />
      </div>
      <h3 className={styles.title}>{service.title}</h3>
      <p className={styles.description}>{service.description}</p>
      <ul className={styles.featureList}>
        {service.features.map((feature) => (
          <li key={feature.id} className={styles.featureItem}>
            <CheckCircle2 size={16} className={styles.featureIcon} />
            {feature.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
