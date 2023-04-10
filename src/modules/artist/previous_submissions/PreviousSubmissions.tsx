import { ARTIST_API } from 'data'
import { Submission } from 'core/types'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Search } from 'react-feather'

import { SpinnerCircular } from 'spinners-react'
import { PreviousSubmissionItem } from './PreviousSubmissionItem'
import Image from 'next/legacy/image'

export const PreviousSubmissions = () => {
  const [submissions, setSubmissions] = useState<{
    data: Submission[]
    isFetching: boolean
  }>({
    data: [],
    isFetching: true,
  })

  useEffect(() => {
    ARTIST_API.previousSubmissions(1, 30)
      .then((res) => {
        setSubmissions({
          data: res.payload,
          isFetching: false,
        })
      })
      .catch(console.log)
  }, [])

  return (
    <motion.section
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="flex items-center justify-between py-3 border-t border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <div className="flex items-center px-4 py-1.5 border rounded-full">
            <Search size={20} className="mr-2 text-primary-blue" />
            <input
              className="outline-none select-none placeholder:text-sm"
              placeholder="Search by name"
              type="text"
            />
          </div>
        </div>
      </div>

      {submissions.isFetching && (
        <div className="flex w-full justify-center items-center h-[100px]">
          <div className="flex space-x-4 items-center">
            <SpinnerCircular
              size={40}
              secondaryColor={'transparent'}
              color="#1980F5"
            />
            <span className="text-primary-blue">Loading...</span>
          </div>
        </div>
      )}

      {!submissions.isFetching && submissions.data.length == 0 && (
        <div className="flex w-full justify-center items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col min-h-[300px] justify-center  space-x-4 items-center"
          >
            <div className="relative">
              <Image
                src={'/images/no-items.png'}
                layout="fixed"
                alt="No Items"
                quality={100}
                width={120}
                height={120}
              />
            </div>
            <p className="text-slate-500">No previous submissions</p>
          </motion.div>
        </div>
      )}

      <ul role="list" className="divide-y divide-slate-200">
        {!submissions.isFetching &&
          submissions.data.map((sub, index) => (
            <PreviousSubmissionItem key={index} submission={sub} />
          ))}
      </ul>
    </motion.section>
  )
}
