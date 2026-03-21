// Server component — no 'use client' needed
// Renders JSON-LD structured data as an inline <script> tag

interface JsonLdProps {
  /** Pre-serialised JSON string from combineSchemas() or a single schema object */
  schema: string | Record<string, unknown>
  id?: string
}

export function JsonLd({ schema, id }: JsonLdProps) {
  const json = typeof schema === 'string' ? schema : JSON.stringify(schema)

  return (
    <script
      id={id}
      type="application/ld+json"
      // Use dangerouslySetInnerHTML — this is the correct pattern for JSON-LD.
      // The content is fully controlled server-side and never user-supplied.
      dangerouslySetInnerHTML={{ __html: json }}
    />
  )
}

// ─── Convenience wrappers ──────────────────────────────────────────────────────

interface MultiJsonLdProps {
  schemas: Record<string, unknown>[]
}

/**
 * Renders multiple independent JSON-LD blocks.
 * Use when schemas are logically separate (e.g. breadcrumb + product + faq).
 */
export function MultiJsonLd({ schemas }: MultiJsonLdProps) {
  return (
    <>
      {schemas.map((schema, i) => (
        <JsonLd
          key={i}
          id={`ld-json-${i}`}
          schema={schema}
        />
      ))}
    </>
  )
}
