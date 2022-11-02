import React from "react"
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route
} from "react-router-dom"
import Dashboard from "./modules/dashboard/Dashboard"
import Detail from "./modules/detail/Detail"

export type Todos = {
  id: number
  title: string
  created_at: string
}

const url = "https://todo.api.devcode.gethired.id"

const App: React.FunctionComponent = () => {
  const [todos, setTodos] = React.useState<Todos[]>([])

  React.useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch(`${url}/activity-groups?email=0arcetros@gmail.com`)
      const todos = await response.json()
      return todos
    }
    fetchTodos().then(({ data }) => setTodos(data))
  }, [])

  const onAddActivity = () => {
    const addActivity = async () => {
      const response = await fetch(`${url}/activity-groups/`, {
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

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={<Dashboard todos={todos} onDelete={onDelete} onAddActivity={onAddActivity} />}
        />
        <Route path="/details/:id" element={<Detail />} />
      </>
    )
  )

  return (
    <main className="max-w-[1000px] mx-auto flex flex-col">
      <RouterProvider router={router} />
    </main>
  )
}

export default App
