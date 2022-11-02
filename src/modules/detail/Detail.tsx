import React from "react"
import { useParams, Link } from "react-router-dom"
import { Todos } from "../../App"
import { ChevronLeft, Edit, Plus, Sort } from "../../components/Icon"
import ActivityItem from "../../components/ActivityItem"
import EmptyDetail from "./EmptyDetail"

export type TodoItems = {
  id?: number
  title?: string
  activity_group_id?: number
  isActive?: number
  priority?: "very-low" | "low" | "normal" | "high" | "very-high"
}

export interface TodoItem extends Todos {
  todo_items: TodoItems[]
}

const Detail = () => {
  const { id } = useParams()
  const [todos, setTodos] = React.useState<TodoItem>()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  React.useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true)
      const response = await fetch(`https://todo.api.devcode.gethired.id/activity-groups/${id}`)
      const todos = await response.json()
      return todos
    }
    fetchTodos().then((data) => {
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

  if (todos) {
    return (
      <>
        <header className="flex items-center justify-between mt-[43px] pb-[55px]">
          <div className="flex items-center">
            <Link to="/">
              <ChevronLeft />
            </Link>
            <h2 className="text-4xl font-bold ml-4 flex items-center">
              {todos?.title}{" "}
              <span className="ml-4">
                <Edit />
              </span>
            </h2>
          </div>
          <div className="flex gap-x-4">
            {todos?.todo_items.length > 0 && <Sort />}
            <div className="bg-[#16ABF8] w-[159px] h-[54px] rounded-[45px] flex items-center text-white justify-center cursor-pointer">
              <span className="flex items-center gap-x-1 font-medium text-lg">
                <Plus /> Tambah
              </span>
            </div>
          </div>
        </header>
        {todos?.todo_items.length < 1 && <EmptyDetail />}
        {todos?.todo_items.length > 0 && (
          <ul className="flex flex-col gap-y-[10px] pb-[43px]">
            {todos.todo_items.map((item) => {
              return <ActivityItem key={item.title} title={item.title} priority={item.priority} />
            })}
          </ul>
        )}
      </>
    )
  }

  return null
}

export default Detail
