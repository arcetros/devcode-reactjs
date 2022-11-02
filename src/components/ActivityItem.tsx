import React from "react"
import clsx from "clsx"
import Modal from "../modules/detail/ModalEdit"

import "react-edit-text/dist/index.css"

import { priorityBadge } from "../modules/detail/PriorityBadge"
import { Edit, Trash } from "./Icon"

import type { TodoItem, TodoItems } from "../modules/detail/Detail"
import { API_ENDPOINT } from "../config"
import DeleteModal from "./DeleteModal"

interface ActivityItem extends TodoItems {
  activityId: string
  fetchTodos: (activityId: string) => Promise<any>
  todos: TodoItem
  setTodos: React.Dispatch<React.SetStateAction<TodoItem | undefined>>
}

const ActivityItem: React.FunctionComponent<ActivityItem> = ({
  activityId,
  priority,
  title,
  id,
  fetchTodos,
  setTodos
}) => {
  const [edit, setEdit] = React.useState<boolean>(false)
  const [isDelete, setIsDelete] = React.useState<boolean>(false)

  const rootBadge = clsx("rounded-full w-3 h-3", {
    [priorityBadge["very-low"]]: priority === "very-low",
    [priorityBadge.low]: priority === "low",
    [priorityBadge.normal]: priority === "normal",
    [priorityBadge.high]: priority === "high",
    [priorityBadge["very-high"]]: priority === "very-high"
  })

  const onDelete = () => {
    fetchTodos(activityId).then((res) => setTodos(res))
  }

  return (
    <>
      <div className="flex justify-between bg-white rounded-xl shadow p-7">
        <div className="flex items-center space-x-3">
          <input
            className="h-6 w-6 flex items-center justify-center mr-5 border border-gray-100"
            type="checkbox"
          />
          <span aria-label={priority} className={rootBadge}></span>
          <h1 className="text-lg">{title}</h1>
          <span onClick={() => setEdit(true)}>
            <Edit />
          </span>
        </div>
        <span className="cursor-pointer" onClick={() => setIsDelete(true)}>
          <Trash />
        </span>
      </div>
      <Modal
        setTodo={setTodos}
        fetchTodos={fetchTodos}
        activityId={activityId}
        id={`${id}`}
        isOpen={edit}
        setIsOpen={setEdit}
      />
      <DeleteModal
        isOpen={isDelete}
        setIsOpen={setIsDelete}
        label={title}
        type="List Item"
        url={`${API_ENDPOINT}/todo-items/${id}`}
        fetchActivity={onDelete}
      />
    </>
  )
}

export default ActivityItem
