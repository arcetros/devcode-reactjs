import React from "react"
import dashboardEmpty from "../assets/dashboard-empty.svg"
import activityEmpty from "../assets/activity-empty.svg"

const NoResult: React.FunctionComponent<{ dashboard?: boolean; tag: string }> = ({
  dashboard = false,
  tag
}) => {
  return (
    <div className="pb-[43px] flex mx-auto" data-cy={tag}>
      {dashboard ? <img src={dashboardEmpty} /> : <img src={activityEmpty} />}
    </div>
  )
}

export default NoResult
