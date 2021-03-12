import st from "./post.module.scss";

function Post({ date, image, title }) {
  let { file, description } = image

  return (
    <div className={st.post}>
      <img alt={description} src={`https:${file.url}`} />


    </div>
  )
}

export default Post
