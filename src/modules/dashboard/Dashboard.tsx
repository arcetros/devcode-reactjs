import React from "react"
import { Todos } from "../../App"
import { Plus } from "../../components/Icon"
import TodoItem from "../../components/TodoItem"

type Props = {
  todos: Todos[]
}

const Dashboard: React.FunctionComponent<Props> = ({ todos }) => {
  return (
    <div>
      <header className="flex items-center justify-between mt-[43px] pb-[55px]">
        <h2 className="text-4xl font-bold">Activity</h2>
        <div className="bg-[#16ABF8] w-[159px] h-[54px] rounded-[45px] flex items-center text-white justify-center cursor-pointer">
          <span className="flex items-center gap-x-1 font-medium text-lg">
            <Plus /> Tambah
          </span>
        </div>
      </header>
      <ul className="pb-8 grid grid-cols-4 gap-x-5">
        {/* <EmptyDashboard /> */}
        {todos.map((item) => (
          <TodoItem key={item.id} todo={item} />
        ))}
      </ul>
    </div>
  )
}

export default Dashboard
