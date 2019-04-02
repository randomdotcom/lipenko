import React from "react";
import Main from "../components/main";

const withMainLayout = Component => props => {
  console.log(Component);
  return (
    <div>
      <Main>
        <Component {...props} />
      </Main>
    </div>
  );
};

export default withMainLayout;
