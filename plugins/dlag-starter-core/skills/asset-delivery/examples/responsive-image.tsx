// Illustrative public asset paths. Verify each file and intrinsic size first.
// Layout: max 72rem container with 1rem padding each side, two columns
// from 48rem, 1rem gap. Therefore max image width is 34.5rem.
export function ContentImage() {
  return (
    <img
      src="/images/workshop-960.webp"
      srcSet="/images/workshop-480.webp 480w, /images/workshop-960.webp 960w, /images/workshop-1440.webp 1440w"
      sizes="(min-width: 72rem) 34.5rem, (min-width: 48rem) calc((100vw - 3rem) / 2), calc(100vw - 2rem)"
      width={1440}
      height={960}
      alt="Participants comparing their project sketches around a table"
      loading="lazy"
      decoding="async"
      style={{ width: "100%", height: "auto" }}
    />
  );
}
// For an actual above-fold LCP hero, remove lazy loading and evaluate
// loading="eager" and fetchPriority="high" on that primary image only.
