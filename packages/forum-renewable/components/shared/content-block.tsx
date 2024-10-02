type ContentProps = {
  content: string
}

export default function ContentBlock({
  content = '',
}: ContentProps): JSX.Element | null {
  if (typeof content !== 'string' || !content.trim()) {
    return null
  }

  const modified_string = content.replace(/\n/g, '<br />')

  return (
    <div
      dangerouslySetInnerHTML={{ __html: modified_string }}
      className="shared-content-block"
    />
  )
}
