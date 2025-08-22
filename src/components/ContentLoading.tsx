interface ContentLoadingProps {
  content: string
}

const ContentLoading = (props: ContentLoadingProps) => {
  return (
    <div className="flex-center vh90">
      <div>...loading {props.content}</div>
    </div>
  )
}

export default ContentLoading
