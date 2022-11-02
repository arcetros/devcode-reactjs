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

const App: React.FunctionComponent = () => {
  const [todos, setTodos] = React.useState<Todos[]>([])

  React.useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch(
        "https://todo.api.devcode.gethired.id/activity-groups?email=ivan@skyshi.com"
      )
      const todos = await response.json()
      return todos
    }
    fetchTodos().then(({ data }) => setTodos(data))
  }, [])

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Dashboard todos={todos} />} />
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
