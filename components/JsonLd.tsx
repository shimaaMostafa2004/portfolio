/**
 * Server component that injects a JSON-LD <script> tag into the page head.
 * Must be rendered inside a Server Component (page.tsx / layout.tsx).
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
