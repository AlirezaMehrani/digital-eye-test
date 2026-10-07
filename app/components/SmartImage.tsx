const WIDTHS = [480, 800, 1200, 1600, 2000];

export function unsplash(id: string, width: number, quality = 72) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&q=${quality}&w=${width}`;
}

type SmartImageProps = {
  /** Unsplash photo id, e.g. "photo-1600585154340-be6161a56a0c" */
  id: string;
  alt: string;
  className?: string;
  sizes?: string;
  /** Hero/above-the-fold images only — skips lazy loading. */
  priority?: boolean;
  quality?: number;
  width?: number;
  height?: number;
};

/**
 * Responsive, lazy-loaded image. Renders a plain <img> with a width-based
 * srcSet so the browser downloads only the resolution it needs — no image
 * optimizer, no extra dependency, and no layout shift.
 */
export default function SmartImage({
  id,
  alt,
  className,
  sizes = "100vw",
  priority = false,
  quality = 72,
  width,
  height,
}: SmartImageProps) {
  return (
    <img
      src={unsplash(id, 1200, quality)}
      srcSet={WIDTHS.map((w) => `${unsplash(id, w, quality)} ${w}w`).join(", ")}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
    />
  );
}
