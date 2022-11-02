import React from "react"
import { useNavigate } from "react-router-dom"

import { Trash } from "./Icon"
import type { Todos } from "../App"
import DeleteModal from "./DeleteModal"
import { API_ENDPOINT } from "../config"

type Props = {
  todo: Todos
  fetchTodos: () => Promise<any>
  setShowInfo: React.Dispatch<React.SetStateAction<boolean>>
}

const TodoItem: React.FunctionComponent<Props> = ({ todo, fetchTodos, setShowInfo }) => {
  const nav = useNavigate()

  const [isOnDelete, setIsOnDelete] = React.useState<boolean>(false)

  const handleRoute = (evt: React.MouseEvent) => {
    nav(`details/${todo.id}`)
    evt.stopPropagation()
  }

  const convertDate = new Date(todo.created_at)

  return (
    <li
      data-cy="activity-item"
      className="p-[1.75rem] flex flex-col h-full w-full rounded-xl bg-white shadow-lg aspect-square cursor-pointer"
      key={todo.id}
      onClick={handleRoute}
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
        <button
          data-cy="activity-item-delete-button"
          onClick={(event) => {
            event.stopPropagation()
            setIsOnDelete(true)
          }}
        >
          <Trash />
        </button>
        <DeleteModal
          id={String(todo.id)}
          isOpen={isOnDelete}
          setIsOpen={setIsOnDelete}
          setShowInfo={setShowInfo}
          fetchTodos={fetchTodos}
          type="activity"
          url={`${API_ENDPOINT}/activity-groups/${todo.id}`}
          label={todo.title}
        />
      </div>
    </li>
  )
}

export default TodoItem
