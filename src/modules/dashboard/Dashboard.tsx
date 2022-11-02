import React from "react"
import { API_ENDPOINT } from "../../config"

import { Todos } from "../../App"
import { Plus } from "../../components/Icon"
import TodoItem from "../../components/TodoItem"
import EmptyDashboard from "./EmptyDashboard"

const Dashboard: React.FunctionComponent = () => {
  const [todos, setTodos] = React.useState<Todos[]>([])
  const [isRequested, setIsRequested] = React.useState<boolean>(true)

  React.useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch(`${API_ENDPOINT}/activity-groups?email=0arcetros@gmail.com`)
      const todos = await response.json()
      return todos
    }
    fetchTodos()
      .then(({ data }) => setTodos(data))
      .finally(() => setIsRequested(false))
  }, [])

  const onAddActivity = () => {
    const addActivity = async () => {
      const response = await fetch(`${API_ENDPOINT}/activity-groups/`, {
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ title: "New Activity", email: "0arcetros@gmail.com" })
      })
      const todos = await response.json()
      return todos
    }
    addActivity().then((res) => setTodos([...todos, res]))
  }

  const onDelete = (id: number) => {
    const response = async () =>
      await fetch(`https://todo.api.devcode.gethired.id/activity-groups/${id}`, {
        method: "DELETE"
      })
    response().then((response) => {
      if (response.ok) {
        return setTodos(todos.filter((todo) => todo.id !== id))
      }
    })
  }

  if (isRequested) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="w-16 h-16 border-b-2 border-[#16ABF8] rounded-full animate-spin"></div>
      </div>
    )
  }

  if (todos.length > 0) {
    return (
      <div>
        <header className="flex items-center justify-between mt-[43px] pb-[55px]">
          <h2 className="text-4xl font-bold">Activity</h2>
          <button
            onClick={() => onAddActivity()}
            className="bg-[#16ABF8] w-[159px] h-[54px] rounded-[45px] flex items-center text-white justify-center cursor-pointer"
          >
            <span className="flex items-center gap-x-1 font-medium text-lg">
              <Plus /> Tambah
            </span>
          </button>
        </header>
        {todos.length > 0 && (
          <ul className="pb-[43px] grid grid-cols-4 gap-5">
            {todos.map((item) => (
              <TodoItem key={item.id} todo={item} onDelete={onDelete} />
            ))}
          </ul>
        )}
      </div>
    )
  }
  return (
    <>
      <header className="flex items-center justify-between mt-[43px] pb-[55px]">
        <h2 className="text-4xl font-bold">Activity</h2>
        <button
          onClick={() => onAddActivity()}
          className="bg-[#16ABF8] w-[159px] h-[54px] rounded-[45px] flex items-center text-white justify-center cursor-pointer"
        >
          <span className="flex items-center gap-x-1 font-medium text-lg">
            <Plus /> Tambah
          </span>
        </button>
      </header>
      <EmptyDashboard />
    </>
  )
}

export default Dashboard
