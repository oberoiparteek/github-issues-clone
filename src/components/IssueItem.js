import React from "react";
import ReactTimeAgo from "react-time-ago";
import { ReactComponent as OpenIssue } from "../assets/OpenIssue.svg";
import { ReactComponent as ClosedIssue } from "../assets/ClosedIssue.svg";

function IssueItem({ issue }) {
  const issueStateIcon = (state)=>{
    const icons = {
      open: <OpenIssue/>,
      closed:<ClosedIssue/>,
    }
    return icons[state];
  }
  const hexToRgb = (hex) =>
    hex
      .replace(
        /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
        (m, r, g, b) => "#" + r + r + g + g + b + b
      )
      .substring(1)
      .match(/.{2}/g)
      .map((x) => parseInt(x, 16));

  const getTextColor = (hex) => {
    const [red, green, blue] = hexToRgb(hex);

    return red * 0.299 + green * 0.587 + blue * 0.114 > 186
      ? "#000000"
      : "#ffffff";
  };
  return (
    <div className="mt-2 border-top p-2 ">
      <div className="container-fluid">
        <div className="row">
        <div className="col-1 flex-shrink-0 p-1" style={{width:'5%'}}>{issueStateIcon(issue.state)}</div>
        <div className="col-10">
          <h5 className="text-break" >
            {issue.title}#{issue.number} opened{" "}
          </h5>

          {issue.labels && issue.labels.length
            ? issue.labels.map((label) => (
                <span
                  key={label.id}
                  className="badge border-none m-1"
                  style={{
                    background: `#${label.color}`,
                    color: getTextColor(`#${label.color}`),
                    fontWeight: "500",
                  }}
                >
                  {label.name}
                </span>
              ))
            : ""}
            <div>
        <span className="small">
          #{issue.number} opened{" "}
          <ReactTimeAgo date={new Date(issue.created_at)} locale="en-US" /> by{" "}
          {issue.user.login}
        </span>
      </div>
        </div>
        <div className="col-1 d-none d-sm-block flex-shrink-0 p-1">
          <svg
            aria-hidden="true"
            height="16"
            viewBox="0 0 16 16"
            version="1.1"
            width="16"
            className="octicon octicon-comment v-align-middle"
          >
            <path
              fillRule="evenodd"
              d="M2.75 2.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 01.75.75v2.19l2.72-2.72a.75.75 0 01.53-.22h4.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25H2.75zM1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0113.25 12H9.06l-2.573 2.573A1.457 1.457 0 014 13.543V12H2.75A1.75 1.75 0 011 10.25v-7.5z"
            ></path>
          </svg>
          <span> {issue.comments}</span>
        </div>
        </div>
      </div>
      
    </div>
  );
}

export default IssueItem;
