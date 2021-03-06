import React from "react";
import Pagination from "rc-pagination";
import localeInfo from "rc-pagination/lib/locale/en_US";
import "./index.css";

function PagePicker(props) {
  const { limit, page, total, handleQueryChange } = props;
  return (
    <Pagination
      showQuickJumper
      hideOnSinglePage={true}
      pageSize={limit}
      showTitle={false}
      currrent={page}
      onChange={handleQueryChange}
      total={total}
      locale={localeInfo}
    />
  );
}

export default PagePicker;
