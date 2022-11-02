import React from "react"
import Dashboard from "./modules/dashboard/Dashboard"

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
        "https://todo.api.devcode.gethired.id/activity-groups?email=arnold_ds@proton.me"
      )
      const todos = await response.json()
      return todos
    }
    fetchTodos().then(({ data }) => setTodos(data))
  }, [])

  return (
    <main className="max-w-[1000px] mx-auto flex flex-col">
      <Dashboard todos={todos} />
    </main>
  )
}

export default App
