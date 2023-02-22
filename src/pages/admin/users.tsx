import axios from 'axios'

import AppLayout from 'core/layouts/AppLayout'
import { ROLE } from 'core/types'
import { ReactElement, useEffect, useState } from 'react'

const UsersPage = () => {
  const [users, setUsers] = useState([])

  async function getUsers() {
    const response = await axios.get('/api/users/pendingRoleChangeRequests')
    console.log(response)
    setUsers(response.data['payload'] ?? [])
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <>
      <div>
        <h4 className="text-xl text-slate-800 dark:text-white">Users</h4>
      </div>
      <section>
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="mt-4 mb-10 overflow-hidden shadow-normal sm:rounded-md">
                <table className="min-w-full ">
                  <thead className="bg-gray-50 dark:bg-slate-900">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Name
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                      >
                        Role
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-slate-700">
                    {users.map((user) => (
                      <tr key={user.email} className="border-b border-slate-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 w-10 h-10">
                              <img
                                className="w-10 h-10 rounded-full"
                                src={
                                  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60'
                                }
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {user.name}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-50">
                                {user.email}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 text-xs leading-5 text-green-800 bg-green-100 rounded-full">
                            Active
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {user.roles[0].split('_')[1]}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                          <div className="flex justify-end space-x-3">
                            <a
                              href="#"
                              className="text-sm font-normal text-primary-blue dark:text-primary-blue hover:text-indigo-900"
                            >
                              Approve
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

UsersPage.getLayout = function getLayout(page: ReactElement, role: ROLE) {
  return <AppLayout role={role}>{page}</AppLayout>
}

export default UsersPage
