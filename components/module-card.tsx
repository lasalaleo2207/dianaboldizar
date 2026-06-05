import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import type { Status } from "@/lib/data";
import { ProgressBar, StatusChip } from "@/components/status";

export function ModuleCard({
  name,
  description,
  status,
  progress,
  href,
  icon: Icon
}: {
  name: string;
  description: string;
  status: Status;
  progress: number;
  href: string;
  icon: LucideIcon;
}) {
  return (
    <Link className="card module-card" href={href}>
      <div className="module-top">
        <div className="module-icon">
          <Icon size={22} />
        </div>
        <StatusChip status={status} />
      </div>
      <div>
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
      <div className="grid">
        <ProgressBar value={progress} />
        <div className="module-top">
          <strong>{progress}%</strong>
          <span className="chip blue">
            Entrar <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
}
