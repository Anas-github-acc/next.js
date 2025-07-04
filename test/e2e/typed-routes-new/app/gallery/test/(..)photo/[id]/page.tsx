export default function InterceptedPhotoPage({
  params,
}: {
  params: { id: string }
}) {
  return (
    <div>
      <h2>Intercepted Photo {params.id}</h2>
      <p>This is an intercepted view of photo: {params.id}</p>
    </div>
  )
}
