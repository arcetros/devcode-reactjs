import React from "react"
import { Link } from "react-router-dom"

import { Edit, Trash } from "./Icon"
import type { Todos } from "../App"

const TodoItem: React.FunctionComponent<{ todo: Todos }> = ({ todo }) => {
  const convertDate = new Date(todo.created_at)
  return (
    <Link to={`/details/${todo.id}`}>
      <li
        data-cy="activity-item"
        className="p-[1.75rem] flex flex-col h-full w-full rounded-xl bg-white shadow-lg aspect-square cursor-pointer"
        key={todo.id}
      >
        <h4 data-cy="activity-item-title" className="font-bold text-xl">
          {todo.title}
        </h4>
        <div className="mt-auto flex justify-between">
          <p
            data-cy="activity-item-date"
            className="text-sm text-[#888888]"
          >{`${convertDate.getDate()} ${convertDate.toLocaleString("default", {
            month: "long",
            year: "numeric"
          })}`}</p>
          <button data-cy="activity-item-delete-button">
            <Trash />
          </button>
        </div>
      </li>
    </Link>
  )
}

export default TodoItem
