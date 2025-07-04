export default function PhotoPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h2>Photo {params.id}</h2>
      <p>Viewing photo with ID: {params.id}</p>
    </div>
  )
}
