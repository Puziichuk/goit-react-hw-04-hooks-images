import PropTypes from "prop-types";
import s from "./ErrorView.module.css";

function ErrorView({ texterror }) {
  return (
    <div role="alert" className={s.wrapper}>
      <p text={texterror} className={s.text}>
        {texterror}
      </p>
    </div>
  );
}

ErrorView.propTypes = {
  texterror: PropTypes.string.isRequired,
};

export default ErrorView;
