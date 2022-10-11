import React from "react";
import { ReactComponent as IssuesIcon } from "../assets/IssuesIcon.svg";
import IssueItem from "./IssueItem";
import { loadIssues } from "../services/IssuesService";

import useInfinteScrolling from "../hooks/useInfinteScrolling";
// https://api.github.com/repos/facebook/react/issues?per_page=25&page=1
function Issues() {
  const { setElement, loading, dataList,error } = useInfinteScrolling(
    loadIssues,
    1,
    25
  );

  return (
    <section className="container mt-2 border p-0 mb-5">
      <div>
        <div className="p-2">
        <IssuesIcon />  Open Issues
        </div>
        {dataList.map((issue, index) => {
          return <IssueItem key={index} issue={issue} />;
        })}
      </div>
      <div ref={setElement}>
        <span style={{ display: loading ? "block" : "none" }}>Loading...</span>
        {error &&<div><span>{error.toString()}</span></div>}
      </div>
    </section>
  );
}

export default Issues;
