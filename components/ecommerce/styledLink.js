import React from "react";

const StyledLink = React.forwardRef(({ onClick, href, children }, ref) => {
  return (
    <a href={href}
      onClick={onClick}
      ref={ref}>
      {children}
    </a>
  );
});

export default StyledLink;