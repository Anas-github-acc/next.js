export default function BlogDocsPage({
  params,
}: {
  params: { slug?: string[] }
}) {
  return (
    <div>
      <h2>Blog Documentation</h2>
      <p>Docs path: {params.slug ? params.slug.join(' > ') : 'Root docs'}</p>
    </div>
  )
}
