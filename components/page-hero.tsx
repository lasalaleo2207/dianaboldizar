import Image from "next/image";
import { ProgressBar, StatusChip } from "@/components/status";

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageFit = "cover",
  variant = "split",
  status,
  progress,
  actions
}: {
  eyebrow: string;
  title: string;
  description: string;
  image?: string;
  imageFit?: "cover" | "contain";
  variant?: "split" | "banner";
  status?: string;
  progress?: number;
  actions?: React.ReactNode;
}) {
  if (variant === "banner" && image) {
    return (
      <section className="hero hero-banner">
        <Image className="hero-banner-image" src={image} alt="" width={1672} height={941} priority />
        <div className="hero-copy hero-banner-copy">
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{description}</p>
          {(status || typeof progress === "number") && (
            <div className="grid" style={{ maxWidth: 520 }}>
              <div className="actions">
                {status && <StatusChip status={status} />}
                {typeof progress === "number" && <span className="chip blue">{progress}% avance</span>}
              </div>
              {typeof progress === "number" && <ProgressBar value={progress} />}
            </div>
          )}
          {actions && <div className="actions">{actions}</div>}
        </div>
      </section>
    );
  }

  return (
    <section className="hero">
      <div className="hero-copy">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
        {(status || typeof progress === "number") && (
          <div className="grid" style={{ maxWidth: 520 }}>
            <div className="actions">
              {status && <StatusChip status={status} />}
              {typeof progress === "number" && <span className="chip blue">{progress}% avance</span>}
            </div>
            {typeof progress === "number" && <ProgressBar value={progress} />}
          </div>
        )}
        {actions && <div className="actions">{actions}</div>}
      </div>
      {image && (
        <div className={`hero-media ${imageFit === "contain" ? "contain" : ""}`}>
          <Image src={image} alt="" width={1100} height={620} priority />
        </div>
      )}
    </section>
  );
}
