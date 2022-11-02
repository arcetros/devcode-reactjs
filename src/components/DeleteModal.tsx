/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"
import { Dialog, Transition } from "@headlessui/react"
import { TodoItem } from "../modules/detail/Detail"
import { ExclamationMark } from "./Icon"

type ModalProps = {
  isOpen: boolean
  setIsOpen: any
  label: string
  type: "activity" | "List Item"
  fetchTodos: () => Promise<any>
  url: string
  id: string
}

const DeleteModal: React.FunctionComponent<ModalProps> = ({
  isOpen,
  setIsOpen,
  fetchTodos,
  type,
  label,
  url,
  id
}) => {
  const closeModal = () => {
    setIsOpen(false)
  }

  const handleDelete = async (url: string) => {
    await fetch(url, { method: "DELETE" })
  }

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full relative items-center justify-center p-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="flex flex-col w-full max-w-[32rem] transform rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                <div className="flex flex-col items-center justify-center py-[3.125rem] px-[1.875rem] gap-x-[0.625rem] gap-y-[2.25rem]">
                  <ExclamationMark />
                  <div className="text-center">
                    <p className="font-medium">Apakah yakin ingin menghapus {type}</p>
                    <b>&quot;{label}&quot;</b> ?
                  </div>
                  <div className="flex space-x-4 font-bold">
                    <button
                      className="bg-[#F4F4F4] text-[#4a4a4a] w-[150px] h-[54px] rounded-[45px] flex items-center justify-center cursor-pointer"
                      onClick={closeModal}
                    >
                      <span className="flex items-center gap-x-1 font-medium text-lg">Batal</span>
                    </button>
                    <button
                      onClick={() => handleDelete(url).then(() => fetchTodos())}
                      className="bg-[#ED4C5C] w-[150px] h-[54px] rounded-[45px] flex items-center text-white justify-center cursor-pointer"
                    >
                      <span className="flex items-center gap-x-1 font-medium text-lg">Hapus</span>
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default DeleteModal