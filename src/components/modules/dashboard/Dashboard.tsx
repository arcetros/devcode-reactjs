import React from "react"
import EmptyDashboard from "./EmptyDashboard"

const Dashboard: React.FunctionComponent = () => {
  return (
    <div>
      <header className="flex items-center justify-between mt-[43px] pb-16">
        <h2 className="text-4xl font-bold">Activity</h2>
        <div className="bg-[#16ABF8] w-[159px] h-[54px] rounded-[45px] flex items-center text-white justify-center cursor-pointer">
          <span className="font-medium text-lg">+ Tambah</span>
        </div>
      </header>
      <EmptyDashboard />
    </div>
  )
}

export default Dashboard
