import React from "react"
import { useParams } from "react-router-dom"
import "react-edit-text/dist/index.css"

import { Todos } from "../App"
import ActivityItem from "../components/ActivityItem"
import NoResult from "../components/No-result"
import { API_ENDPOINT } from "../config"
import Modal from "./detail/Modal"
import Toast from "../components/Toast"
import Spinner from "../components/Spinner"
import Navigation from "../components/Navigation"

export type TodoItems = {
  id: number
  title: string
  activity_group_id?: number
  is_active: number
  priority?: "very-low" | "low" | "normal" | "high" | "very-high" | string
}

export type Filter = "Terbaru" | "Terlama" | "A - Z" | "Z - A" | "Belum selesai"

export interface TodoItem extends Todos {
  todo_items: TodoItems[]
}

const Detail = () => {
  const { id } = useParams()
  const [todos, setTodos] = React.useState<TodoItem>()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [openModal, setOpenModal] = React.useState<boolean>(false)
  const [showInfo, setShowInfo] = React.useState<boolean>(false)
  const [filter, setFilter] = React.useState<Filter>("Terbaru")

  const fetchTodos = async () => {
    setIsLoading(true)
    await fetch(`${API_ENDPOINT}/activity-groups/${id}`)
      .then((res) => res.json())
      .then((data) => setTodos(data))
  }

  const filteredTodos = React.useMemo(() => {
    let _todos = todos?.todo_items

    if (filter === "Terbaru") {
      _todos = _todos?.sort((a, b) => b.id - a.id)
    }
    if (filter === "Terlama") {
      _todos = _todos?.sort((a, b) => a.id - b.id)
    }
    if (filter === "A - Z") {
      _todos = _todos?.sort((a, b) => a.title.localeCompare(b.title))
    }
    if (filter === "Z - A") {
      _todos = _todos?.sort((a, b) => b.title.localeCompare(a.title))
    }
    if (filter === "Belum selesai") {
      _todos = _todos?.sort((a, b) => b.is_active - a.is_active)
    }

    return _todos
  }, [filter, todos])

  React.useEffect(() => {
    fetchTodos()
  }, [])

  if (!todos?.id && isLoading) {
    return <Spinner />
  }

  if (id && todos) {
    return (
      <React.Fragment>
        <Navigation
          isActivity
          fetchTodos={fetchTodos}
          filter={filter}
          setFilter={setFilter}
          item={todos}
          setOpenModal={setOpenModal}
        />
        {todos?.todo_items.length < 1 && <NoResult dashboard={false} tag="todo-empty-state" />}
        {todos?.todo_items.length > 0 && (
          <ul className="flex flex-col gap-y-[10px] pb-[43px]">
            {filteredTodos?.map((item) => {
              return (
                <ActivityItem
                  setShowInfo={setShowInfo}
                  is_active={item.is_active}
                  activityId={id}
                  fetchTodos={fetchTodos}
                  todos={todos}
                  setTodos={setTodos}
                  id={item.id}
                  key={item.title}
                  title={item.title}
                  priority={item.priority}
                />
              )
            })}
          </ul>
        )}
        <Modal
          isOpen={openModal}
          setIsOpen={setOpenModal}
          setTodo={setTodos}
          fetchTodos={fetchTodos}
          id={id}
        />
        <Toast isOpen={showInfo} setIsOpen={setShowInfo} />
      </React.Fragment>
    )
  }

  return null
}

export default Detail
