import React from "react";
import Main from "../containers/HeaderContainer";

const withMainLayout = Component => props => {
  return (
    <div>
      <Main>
        <Component {...props} />
      </Main>
    </div>
  );
};

export default withMainLayout;
