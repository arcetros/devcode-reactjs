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
  setShowInfo: React.Dispatch<React.SetStateAction<boolean>>
  is_active: number
}

const ActivityItem: React.FunctionComponent<ActivityItem> = ({
  activityId,
  priority,
  title,
  id,
  fetchTodos,
  setTodos,
  is_active,
  setShowInfo
}) => {
  const [edit, setEdit] = React.useState<boolean>(false)
  const [isDelete, setIsDelete] = React.useState<boolean>(false)
  const [checked, setChecked] = React.useState<boolean>(is_active === 1 ? false : true)

  const rootBadge = clsx("rounded-full w-3 h-3", {
    [priorityBadge["very-low"]]: priority === "very-low",
    [priorityBadge.low]: priority === "low",
    [priorityBadge.normal]: priority === "normal",
    [priorityBadge.high]: priority === "high",
    [priorityBadge["very-high"]]: priority === "very-high"
  })

  const onDelete = () => {
    fetchTodos(activityId).then((res) => {
      setTodos(res)
      setShowInfo(true)
    })
  }

  return (
    <>
      <div className="flex justify-between bg-white rounded-xl shadow p-7">
        <div className="flex items-center space-x-3">
          <input
            className="h-6 w-6 flex items-center justify-center mr-5 border border-gray-100"
            type="checkbox"
            defaultChecked={checked}
            value={id}
            data-cy="todo-item-checkbox"
            onChange={async (event) => {
              setChecked(!checked)
              await fetch(`${API_ENDPOINT}/todo-items/${event.target.value}`, {
                method: "PATCH",
                headers: { Accept: "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({
                  is_active: is_active === 1 ? false : true
                })
              })
            }}
          />
          <span aria-label={priority} className={rootBadge}></span>
          <h1 className={clsx(checked && "line-through", "text-lg")}>{title}</h1>
          <span onClick={() => setEdit(true)}>
            <Edit />
          </span>
        </div>
        <span
          data-cy="todo-item-delete-button"
          className="cursor-pointer"
          onClick={() => setIsDelete(true)}
        >
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
