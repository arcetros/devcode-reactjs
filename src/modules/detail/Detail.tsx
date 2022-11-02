import React, { Fragment } from "react"
import { useParams, Link } from "react-router-dom"
import { EditText } from "react-edit-text"
import { Transition, Listbox } from "@headlessui/react"
import "react-edit-text/dist/index.css"

import { Todos } from "../../App"
import {
  AZ,
  Check,
  ChevronLeft,
  Edit,
  Newest,
  Oldest,
  Plus,
  Sort,
  Unfinished,
  ZA
} from "../../components/Icon"
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
  const [filter, setFilter] = React.useState<string>("")

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
    const filters = [
      {
        label: "Terbaru",
        icon: <Newest />,
        function: () =>
          setTodos({ ...todos, todo_items: todos.todo_items.sort((a, b) => b.id - a.id) })
      },
      {
        label: "Terlama",
        icon: <Oldest />,
        function: () =>
          setTodos({ ...todos, todo_items: todos.todo_items.sort((a, b) => a.id - b.id) })
      },
      {
        label: "A - Z",
        icon: <AZ />,
        function: () =>
          setTodos({
            ...todos,
            todo_items: todos.todo_items.sort((a, b) => a.title.localeCompare(b.title))
          })
      },
      {
        label: "Z - A",
        icon: <ZA />,
        function: () =>
          setTodos({
            ...todos,
            todo_items: todos.todo_items.sort((a, b) => b.title.localeCompare(a.title))
          })
      },
      {
        label: "Belum selesai",
        icon: <Unfinished />,
        function: () =>
          setTodos({
            ...todos,
            todo_items: todos.todo_items.sort((a, b) => b.is_active - a.is_active)
          })
      }
    ]
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
            <button className="ml-4">
              <Edit />
            </button>
          </div>
          <div className="flex gap-x-4">
            {todos?.todo_items.length > 0 && (
              <Listbox value={filter} onChange={(event) => setFilter(event)}>
                <div className="relative max-w-[205px] mt-1 z-10">
                  <Listbox.Button>
                    <Sort />
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute w-[15rem] flex flex-col right-0 mt-1 rounded-md bg-white divide-y text-base shadow-lg ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
                      {filters.map((item) => {
                        return (
                          <Listbox.Option
                            value={item.label}
                            onClick={item.function}
                            key={item.label}
                          >
                            {({ selected }) => (
                              <div className="flex justify-between gap-x-4 items-center p-[0.875rem] hover:bg-slate-50 cursor-pointer">
                                <div className="flex gap-x-4 items-center">
                                  {item.icon} <span className="text-base">{item.label}</span>
                                </div>

                                {selected && <Check />}
                              </div>
                            )}
                          </Listbox.Option>
                        )
                      })}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            )}
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
