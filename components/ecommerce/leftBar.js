import st from "../pages/console.module.scss";

export default () =>  <div className={st.leftBar}>
  <div className={st.leftBarMenuContainer}>
    <h1 className={st.leftBarMenuContainerTitle}>Project</h1>
    <h1 className={st.leftBarMenu}>
      <h5>Sample Chatbot</h5>
      <h5>Sample RPA</h5>
    </h1>
  </div>
  <div className={st.leftBarMenuContainer}>
    <h1 className={st.leftBarMenuContainerTitle}>Knowledge</h1>
    <h1 className={st.leftBarMenu}>
      <h5>Common Sense</h5>
      <h5>Project Data</h5>
      <h5>Graph Visualization</h5>
    </h1>
  </div>
  <div className={st.leftBarMenuContainer}>
    <h1 className={st.leftBarMenuContainerTitle}>Learning</h1>
    <h1 className={st.leftBarMenu}>
      <h5>Training</h5>
      <h5>Testing</h5>
      <h5>Evaluation</h5>
    </h1>
  </div>
  <div className={st.leftBarMenuContainer}>
    <h1 className={st.leftBarMenu}>
      <h5>Billing</h5>
      <h5>Export</h5>
      <h5>Setting</h5>
    </h1>
  </div>
</div>