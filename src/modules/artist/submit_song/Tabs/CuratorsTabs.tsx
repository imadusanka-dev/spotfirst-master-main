import Image from 'next/legacy/image'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/outline'
import classNames from 'classnames'
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react'
import { Search } from 'react-feather'
import Rating from 'react-rating'

import { MdStarBorder, MdStar } from 'react-icons/md'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebook,
  faInstagram,
  faSpotify,
} from '@fortawesome/free-brands-svg-icons'
import { CURATOR_API } from 'data'
import { SpinnerCircular } from 'spinners-react'
import { Curator } from 'core/types'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { getSocialMediaUrl } from '../../../../../utils/helpers'
import { resetSelectedCurators } from 'redux/slices/submitSong'
import { useAppDispatch } from 'core/hooks/useRedux'

type Sorting = {
  id: number
  name: string
}

interface Props {
  sortings: Sorting[]
  selectedSorting: Sorting
  setSelectedSorting: Dispatch<SetStateAction<Sorting>>
  onSelected: (add: boolean, curator: string) => void
  onSelectAll: (curators: string[]) => void
  selectedCurators: string[]
  genreFilter: string[]
  ratingFilter: number[]
  priceFilter: number
}

const CuratorsTab = ({
  sortings,
  selectedSorting,
  setSelectedSorting,
  onSelected,
  onSelectAll,
  selectedCurators,
  genreFilter,
  ratingFilter,
  priceFilter,
}: Props) => {
  const [curators, setCurators] = useState<{
    data: Curator[]
    isFetching: boolean
  }>({ data: [], isFetching: true })
  const dispatch = useAppDispatch()
  const [selectAllChecked, setSelectAllChecked] = useState<boolean>(false)

  useEffect(() => {
    //reset selected curators when filter is changed
    // dispatch(resetSelectedCurators())

    CURATOR_API.curatorFilter({
      page: 1,
      perPage: 10,
      genres: genreFilter,
      ratings: ratingFilter,
      pricing: priceFilter,
    })
      .then((res) => {
        setCurators({
          data: res.payload,
          isFetching: false,
        })
      })
      .catch((error) => console.log(error))
  }, [genreFilter, ratingFilter, priceFilter])

  useEffect(() => {
    if (selectAllChecked) {
      const isSame = curators.data.every((curator) =>
        selectedCurators.includes(curator._id)
      )

      !isSame && setSelectAllChecked(false)
    }
  }, [selectedCurators])

  const onChange = (value: boolean, curator: string) =>
    onSelected(value, curator)

  const handleSelectAll = (value) => {
    setSelectAllChecked(value)
    if (value) {
      const curatorIds = curators.data.map((curator) => curator._id)
      onSelectAll(curatorIds)
    } else {
      onSelectAll([])
    }
  }

  const getSocialMediaIcons = (links) => {
    const urls = getSocialMediaUrl(links)
    return (
      <div className="flex space-x-2 overflow-hidden">
        {urls?.facebook && (
          <div className="w-6 rounded-full flex items-center justify-center bg-primary-blue h-6 min-h-[24px] min-w-[24px]">
            <a href={urls?.facebook} target="_blank">
              <FontAwesomeIcon
                className="w-2 h-3 text-white"
                icon={faFacebook as IconProp}
              />
            </a>
          </div>
        )}
        {urls?.instagram && (
          <div className="w-6 rounded-full flex items-center justify-center bg-primary-blue h-6 min-h-[24px] min-w-[24px]">
            <a href={urls?.instagram} target="_blank">
              <FontAwesomeIcon
                className="w-2 h-3 text-white"
                icon={faInstagram as IconProp}
              />
            </a>
          </div>
        )}
        {urls?.spotify && (
          <div className="w-6 rounded-full flex items-center justify-center bg-primary-blue h-6 min-h-[24px] min-w-[24px]">
            <a href={urls?.spotify} target="_blank">
              <FontAwesomeIcon
                className="w-2 h-3 text-white"
                icon={faSpotify as IconProp}
              />
            </a>
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      <div className="flex items-center justify-between py-3 border-t border-b border-gray-100">
        <div className="flex items-center space-x-2">
          <div className="flex items-center px-4 py-1.5 border rounded-full">
            <Search size={20} className="mr-2 text-primary-blue" />
            <input
              className="outline-none select-none placeholder:text-sm"
              placeholder="Search by name"
              type="text"
            />
          </div>
          <div className="flex items-center h-5">
            <input
              id="select_all_curators"
              name="select_all"
              type="checkbox"
              className="w-4 h-4 mr-2 rounded border-gray-50 focus:ring-primary-blue text-primary-blue"
              onChange={(event) => handleSelectAll(event.target.checked)}
              checked={selectAllChecked}
            />
            <label
              htmlFor="select_all_curators"
              className="text-sm select-none"
            >
              Select All
            </label>
          </div>
        </div>
        <Listbox value={selectedSorting} onChange={setSelectedSorting}>
          {({ open }) => (
            <div className="flex items-center">
              <Listbox.Label className="block text-sm font-medium text-gray-700">
                Sort by:
              </Listbox.Label>
              <div className="relative">
                <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white cursor-pointer focus:outline-none sm:text-sm">
                  <span className="block truncate">{selectedSorting.name}</span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <SelectorIcon
                      className="w-5 h-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>

                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {sortings.map((person) => (
                      <Listbox.Option
                        key={person.id}
                        className={({ active }) =>
                          classNames(
                            active
                              ? 'text-white bg-primary-blue'
                              : 'text-gray-900',
                            'cursor-default select-none relative py-2 pl-3 pr-9'
                          )
                        }
                        value={person}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={classNames(
                                selected ? 'font-medium' : 'font-normal',
                                'block truncate'
                              )}
                            >
                              {person.name}
                            </span>

                            {selected ? (
                              <span
                                className={classNames(
                                  active ? 'text-white' : 'text-primary-blue',
                                  'absolute inset-y-0 right-0 flex items-center pr-4'
                                )}
                              >
                                <CheckIcon
                                  className="w-5 h-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </div>
          )}
        </Listbox>
      </div>

      {curators.isFetching && (
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

      <ul role="list" className="divide-y divide-gray-200">
        {!curators.isFetching &&
          curators.data.map((curator) => {
            const _selected = selectedCurators.some(
              (item) => item === curator.id
            )
            return (
              <li key={curator.id}>
                <a className="block  hover:bg-gray-50">
                  <div className="flex items-center px-4 py-4 sm:px-6">
                    <div className="flex-1 min-w-0 sm:flex sm:items-center sm:justify-between">
                      <div className="truncate">
                        <div className="flex">
                          <div className="flex items-center">
                            <div className="mt-6 mr-2">
                              <input
                                id="select_curator"
                                name="select_curator"
                                type="checkbox"
                                checked={_selected}
                                onChange={(event) =>
                                  onChange(event.target.checked, curator.id)
                                }
                                className="w-5 h-5 ml-4 rounded-md border-gray-50 focus:ring-primary-blue text-primary-blue"
                              />
                              <div className="text-xs px-2 py-1 text-sm rounded-full bg-primary-blue bg-opacity-10 text-primary-blue-dark">
                                1 token
                              </div>
                            </div>
                            <Image
                              src={curator.user[0]?.profilePicture}
                              width={80}
                              height={80}
                              className="ml-3 w-20 h-20 min-w-[80px] min-h-[80px] bg-primary-blue rounded-full"
                            />
                          </div>
                          <div className="flex flex-col justify-between w-full ml-4 ">
                            <p>{curator.curatorName}</p>
                            <div className="w-full">
                              <div>
                                <Rating
                                  readonly
                                  initialRating={curator.rating}
                                  emptySymbol={
                                    <MdStarBorder className="text-yellow-500" />
                                  }
                                  fullSymbol={
                                    <MdStar className="text-yellow-500" />
                                  }
                                />
                              </div>
                              <div>
                                <textarea
                                  className="px-2 py-1 text-xs outline-none"
                                  placeholder="Curator info"
                                  style={{ resize: 'none' }}
                                  cols={50}
                                  rows={2}
                                  value={curator.user[0]?.description}
                                  disabled
                                />
                              </div>
                              <p className="text-xs text-gray-500">
                                Approved Rate :{curator.approveRate}%
                              </p>
                              <p className="text-xs text-gray-500">
                                Response Rate :{curator.responseRatio}%
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="flex items-center flex-shrink-0 mt-4 space-x-2 sm:mt-0 sm:ml-5">
                          {getSocialMediaIcons(curator.user[0]?.links)}
                          <div className="text-sm text-gray-500">
                            {curator.followerCountOfMedia ?? 0} Followers
                          </div>
                        </div>
                        <div className="flex flex-col items-end mt-3 space-y-2">
                          <span className="text-xs">Accepted Genres</span>
                          <div className="flex flex-wrap space-x-1.5">
                            {curator.user[0]?.genres?.map((genre) => {
                              return (
                                <span
                                  key={genre}
                                  className="px-4 capitalize py-1 text-sm rounded-full bg-primary-blue bg-opacity-10 text-primary-blue-dark"
                                >
                                  {genre}
                                </span>
                              )
                            })}
                          </div>
                        </div>
                        <div className="flex items-center mt-3 space-x-1">
                          <p className="text-xs text-gray-500">
                            Average Share Time:
                          </p>
                          <p className="text-xs">
                            {curator.averageShareTime} Days
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            )
          })}
      </ul>
    </>
  )
}

export default CuratorsTab
