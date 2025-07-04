export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <div>
      <h2>Blog Post: {params.slug}</h2>
      <p>This is a blog post about {params.slug}.</p>
    </div>
  )
}
