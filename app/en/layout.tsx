/**
 * Nested layout for all /en/* routes.
 * Overrides the root <html> lang/dir so SSR delivers the correct
 * language attribute — fixes the "detected language does not match
 * HTML lang" SEO warning on English pages.
 */
export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
