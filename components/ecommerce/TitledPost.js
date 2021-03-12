import st from "./post.module.scss";

function Post({ date, image, title }) {
  let { file, description } = image

  return (
    <div className={st.post}>
      <img alt={description} src={`https:${file.url}`} />
      <div className={st.description}>
        <h4>{description}
        </h4>
      </div>
    </div>
  )
}

export default Post
