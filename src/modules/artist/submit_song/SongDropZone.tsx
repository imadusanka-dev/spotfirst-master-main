import classNames from 'classnames'
import Link from 'next/link'
import { FC, useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import { Music } from 'react-feather'

interface SongDropZoneProps {
  onDrop: (file: File) => void
}

const SongDropZone: FC<SongDropZoneProps> = ({ onDrop }) => {
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    maxFiles: 1,
    multiple: false,
    accept: ['audio/mpeg', 'audio/wav'],
    noClick: false,
    onDropAccepted: (files) => {
      const file = files[0]
      onDrop(file)
    },
  })

  const className = useMemo(
    () =>
      classNames(
        'flex justify-center w-full px-6 pt-8 pb-8 mt-5 border border-gray-300 border-dashed hover:bg-gray-50 transition duration-100 rounded-md',
        isFocused ? 'border-primary-blue' : '',
        isDragActive ? 'border-primary-blue' : '',
        isDragAccept ? 'border-primary-green' : '',
        isDragReject ? 'border-red-500' : ''
      ),
    [isFocused, isDragAccept, isDragReject, isDragActive]
  )

  return (
    <>
      <div {...getRootProps({ className: className })}>
        <div className="flex flex-col items-center justify-center space-y-1 text-center">
          <Music strokeWidth={1.5} className="text-primary-blue" size={40} />
          <div className="flex text-sm text-gray-600">
            <label
              htmlFor="file-upload"
              className="relative font-medium bg-white rounded-md cursor-pointer text-primary-blue hover:text-primary-blue focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-blue"
            >
              <span>Drop your Audio to Upload</span>
              <input {...getInputProps()} type="file" className="sr-only" />
            </label>
          </div>
          <p className="text-xs font-medium text-gray-500">MP3 & WAV onlv</p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full pb-4 ">
        <div className="py-3 ">
          <div className="flex items-center space-x-3">
            <div className="w-[110px] h-[0.5px] bg-slate-400"></div>
            <span className="uppercase text-slate-400">or</span>
            <div className="w-[100px] h-[0.5px] bg-slate-400"></div>
          </div>
        </div>
        <div>
          <Link
            href={'/artist/previous-submissions'}
            className="px-4 py-2 text-sm font-medium rounded-md bg-primary-blue bg-opacity-5 hover:bg-opacity-10 text-primary-blue hover:text-primary-blue-dark"
          >
            Submit an existing demo
          </Link>
        </div>
      </div>
    </>
  )
}

export default SongDropZone
