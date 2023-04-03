import Image from 'next/legacy/image'
import { FC, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Clock } from 'react-feather'
import { SpinnerCircular } from 'spinners-react'
import { LABEL_API } from 'data'
import toast from 'react-hot-toast'
import { Submission } from 'core/types'
import { NewSubmissionItem } from './NewSubmissionItem'

// interface NewSubmissionsProps {}

export const NewSubmissions: FC = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    LABEL_API.newSubmission(1, 10)
      .then((res) => {
        if (res.success) {
          setLoading(false)
          setSubmissions(res.payload)
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.message || 'Something went wrong!')
      })
  }, [])
  return (
    <div>
      <div className="min-w-full overflow-hidden scrollbar-hide overflow-x-auto align-middle shadow-light sm:rounded-lg">
        <table className="min-w-full divide-y divide-slate-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-slate-500 uppercase bg-slate-50"></th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-slate-500 uppercase bg-slate-50">
                Name
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-slate-500 uppercase bg-slate-50">
                <Clock />
              </th>
              <th className=" px-6 py-3 text-xs font-medium tracking-wider text-left text-slate-500 uppercase bg-slate-50">
                Artist
              </th>
              <th className=" px-6 py-3 text-xs font-medium tracking-wider text-left text-slate-500 uppercase bg-slate-50">
                Time Remaining
              </th>
              <th className=" px-6 py-3 text-xs font-medium tracking-wider text-left text-slate-500 uppercase bg-slate-50">
                Genres
              </th>

              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-slate-500 uppercase bg-slate-50">
                Song Type
              </th>

              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left  text-slate-500 uppercase bg-slate-50">
                Credits
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-right text-slate-500 uppercase bg-slate-50"></th>
            </tr>
          </thead>
          <tbody className="bg-white  divide-y divide-slate-200">
            {loading && (
              <tr className="px-6 py-4 text-sm text-slate-900 max-w-0 whitespace-nowrap">
                <td colSpan={9}>
                  <div className="flex w-full justify-center items-center h-[300px]">
                    <div className="flex space-x-4 items-center">
                      <SpinnerCircular
                        size={40}
                        secondaryColor={'transparent'}
                        color="#1980F5"
                      />
                      <span className="text-primary-blue">Loading...</span>
                    </div>
                  </div>
                </td>
              </tr>
            )}
            {!loading && submissions.length == 0 && (
              <tr className="px-6 py-4 text-sm text-slate-900 max-w-0 whitespace-nowrap">
                <td colSpan={9}>
                  <div className="flex w-full justify-center items-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.3 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col min-h-[300px] justify-center  space-x-4 items-center"
                    >
                      <div className="relative">
                        <Image
                          src="/images/no-items.png"
                          layout="fixed"
                          alt="No Items"
                          quality={100}
                          width={120}
                          height={120}
                        />
                      </div>
                      <p className="text-slate-500">No new submissions</p>
                    </motion.div>
                  </div>
                </td>
              </tr>
            )}
            {!loading &&
              submissions?.map((item, index) => (
                <NewSubmissionItem submission={item} key={index} />
              ))}
          </tbody>
        </table>
        {/* Pagination */}
        <nav
          className="flex items-center justify-between px-4 py-3 bg-white border-t border-slate-200 sm:px-6"
          aria-label="Pagination"
        >
          <div className="hidden sm:block">
            <p className="text-sm text-slate-700">
              Showing <span className="font-medium">1</span> to{' '}
              <span className="font-medium">1</span> of{' '}
              <span className="font-medium">1</span> results
            </p>
          </div>
          <div className="flex justify-between flex-1 sm:justify-end">
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50"
            >
              Previous
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50"
            >
              Next
            </a>
          </div>
        </nav>
      </div>
    </div>
  )
}
