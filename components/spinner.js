import loaderSt from "@components/stripe/loader.module.scss";

export default () => <div className={loaderSt.loader}>
  <svg className={loaderSt.circular} viewBox="25 25 50 50">
    <circle className={loaderSt.path} cx="50" cy="50" r="20" fill="none" stroke-width="4"
            stroke-miterlimit="10"/>
  </svg>
</div>