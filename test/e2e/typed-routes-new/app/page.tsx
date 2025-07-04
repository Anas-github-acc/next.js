import type { PageProps } from '+types/routes'

export default function HomePage(props: PageProps<'/'>) {
  return (
    <div>
      <h2>Home Page</h2>
      <p>Welcome to the home page!</p>
    </div>
  )
}
