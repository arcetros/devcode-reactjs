import React from "react"
import { API_ENDPOINT } from "../../config"

import { Todos } from "../../App"
import { Plus } from "../../components/Icon"
import TodoItem from "../../components/TodoItem"
import EmptyDashboard from "./EmptyDashboard"
import Toast from "../../components/Toast"

const Dashboard: React.FunctionComponent = () => {
  const [todos, setTodos] = React.useState<Todos[]>([])
  const [isRequested, setIsRequested] = React.useState<boolean>(true)
  const [showInfo, setShowInfo] = React.useState<boolean>(false)
  const [indicator, setIndicator] = React.useState<boolean>(false)

  const getActivities = async () => {
    const response = await fetch(`${API_ENDPOINT}/activity-groups?email=0arcetros@gmail.com`)
    const { data } = await response.json()
    setTodos(data)
    setIsRequested(false)
  }

  const addActivity = async () => {
    await fetch(`${API_ENDPOINT}/activity-groups/`, {
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ title: "New Activity", email: "0arcetros@gmail.com" })
    })
    setIndicator(!indicator)
  }

  React.useEffect(() => {
    getActivities()
  }, [indicator])

  if (isRequested) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="w-16 h-16 border-b-2 border-[#16ABF8] rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div>
      <header className="flex items-center justify-between mt-[43px] pb-[55px]">
        <h2
          data-cy="activity-title"
          onClick={() => setShowInfo(true)}
          className="text-4xl font-bold"
        >
          Activity
        </h2>
        <button
          data-cy="activity-add-button"
          onClick={addActivity}
          className="bg-[#16ABF8] w-[159px] h-[54px] rounded-[45px] flex items-center text-white justify-center cursor-pointer"
        >
          <span className="flex items-center gap-x-1 font-medium text-lg">
            <Plus /> Tambah
          </span>
        </button>
      </header>
      {todos.length > 0 ? (
        <ul className="pb-[43px] grid grid-cols-4 gap-5">
          {todos.map((item) => (
            <TodoItem
              key={item.id}
              todo={item}
              setShowInfo={setShowInfo}
              fetchTodos={getActivities}
            />
          ))}
        </ul>
      ) : (
        <EmptyDashboard />
      )}
      <Toast isOpen={showInfo} setIsOpen={setShowInfo} />
    </div>
  )
}

export default Dashboard
