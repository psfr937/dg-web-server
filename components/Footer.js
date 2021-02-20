import st from './footer.module.scss'

export default function Footer() {
  return (
    <>
      <footer className={st.footer}>
        <div className={st.socialMediaList}>
          <a href={"https://facebook.com"}>
            <img src="/facebook.png" alt="facebook icon" className="logo" />
          </a>
          <a href={"https://twitter.com"}>
            <img src="/twitter.png" alt="twitter icon" className="logo" />
          </a>
          <a href={"https://instagram.com"}>
            <img src="/instagram.png" alt="instagram icon" className="logo" />
          </a>
          <a href={"https://instagram.com"}>
            <img src="/email.png" alt="email icon" className="logo" />
          </a>
        </div>
        <div className={st.footerInfo}>
          <h6>DRESS GREEN</h6>
          <h6>Copyright @ 2021</h6>
        </div>
      </footer>
    </>
  )
}
