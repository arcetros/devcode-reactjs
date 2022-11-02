import React from "react"
import { useParams, Link } from "react-router-dom"
import { EditText } from "react-edit-text"
import "react-edit-text/dist/index.css"

import { Todos } from "../../App"
import { ChevronLeft, Edit, Plus, Sort } from "../../components/Icon"
import ActivityItem from "../../components/ActivityItem"
import EmptyDetail from "./EmptyDetail"
import { API_ENDPOINT } from "../../config"
import Modal from "./Modal"
import Toast from "../../components/Toast"

export type TodoItems = {
  id: number
  title: string
  activity_group_id?: number
  is_active: number
  priority?: "very-low" | "low" | "normal" | "high" | "very-high" | string
}

export interface TodoItem extends Todos {
  todo_items: TodoItems[]
}

const Detail = () => {
  const { id } = useParams()
  const [todos, setTodos] = React.useState<TodoItem>()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [openModal, setOpenModal] = React.useState<boolean>(false)
  const [showInfo, setShowInfo] = React.useState<boolean>(false)

  const onSaveActivityTitle = () => {
    const saveTitle = async () => {
      const response = await fetch(`${API_ENDPOINT}/activity-groups/${id}`, {
        method: "PATCH",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ title: todos?.title })
      })
      const newTitle = await response.json()
      return newTitle
    }
    saveTitle()
  }

  const fetchTodos = async (activityId: string) => {
    setIsLoading(true)
    const response = await fetch(`${API_ENDPOINT}/activity-groups/${activityId}`)
    const todos = await response.json()
    return todos
  }

  React.useEffect(() => {
    if (!id) {
      return
    }
    fetchTodos(id).then((data) => {
      setTodos(data)
    })
  }, [])

  if (!todos?.id && isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="w-16 h-16 border-b-2 border-[#16ABF8] rounded-full animate-spin"></div>
      </div>
    )
  }

  if (id && todos) {
    return (
      <>
        <header className="flex items-center justify-between mt-[43px] pb-[55px]">
          <div className="flex items-center">
            <Link to="/" className="mr-5">
              <ChevronLeft />
            </Link>
            <EditText
              className="text-4xl text-neutral-800 font-bold ml-4"
              name="activity_title"
              type="text"
              value={todos?.title}
              style={{
                backgroundColor: "transparent",
                border: "none",
                fontSize: "2.25rem",
                fontWeight: 700,
                padding: 0,
                outline: "none",
                color: "#262626"
              }}
              onChange={(event) => setTodos({ ...todos, title: event.currentTarget.value })}
              onSave={onSaveActivityTitle}
            />
            <span className="ml-4">
              <Edit />
            </span>
          </div>
          <div className="flex gap-x-4">
            {todos?.todo_items.length > 0 && <Sort />}
            <button
              onClick={() => setOpenModal(true)}
              className="bg-[#16ABF8] w-[159px] h-[54px] rounded-[45px] flex items-center text-white justify-center cursor-pointer"
            >
              <span className="flex items-center gap-x-1 font-medium text-lg">
                <Plus /> Tambah
              </span>
            </button>
          </div>
        </header>
        {todos?.todo_items.length < 1 && <EmptyDetail />}
        {todos?.todo_items.length > 0 && (
          <ul className="flex flex-col gap-y-[10px] pb-[43px]">
            {todos.todo_items.map((item) => {
              console.log(item)
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
      </>
    )
  }

  return null
}

export default Detail
