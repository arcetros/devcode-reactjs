import React from "react"
import clsx from "clsx"

import { priorityBadge } from "./PriorityBadge"
import { Edit, Trash } from "../../components/Icon"

import type { TodoItems } from "./Detail"

const ActivityItem: React.FunctionComponent<TodoItems> = ({ priority, title }) => {
  const rootBadge = clsx("rounded-full w-3 h-3", {
    [priorityBadge["very-low"]]: priority === "very-low",
    [priorityBadge.low]: priority === "low",
    [priorityBadge.normal]: priority === "normal",
    [priorityBadge.high]: priority === "high",
    [priorityBadge["very-high"]]: priority === "very-high"
  })

  return (
    <div className="flex justify-between bg-white rounded-xl shadow p-7">
      <div className="flex items-center space-x-3">
        <input
          className="h-6 w-6 flex items-center justify-center mr-5 border border-gray-100"
          type="checkbox"
        />
        <span aria-label={priority} className={rootBadge}></span>
        <h1 className="text-lg">{title}</h1>
        <Edit />
      </div>
      <Trash />
    </div>
  )
}

export default ActivityItem
