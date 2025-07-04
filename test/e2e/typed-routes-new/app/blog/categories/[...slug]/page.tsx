export default function BlogCategoriesPage({
  params,
}: {
  params: { slug: string[] }
}) {
  return (
    <div>
      <h2>Blog Categories</h2>
      <p>Category path: {params.slug.join(' > ')}</p>
    </div>
  )
}
