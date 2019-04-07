import React from "react";
import Main from "../components/main";

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
