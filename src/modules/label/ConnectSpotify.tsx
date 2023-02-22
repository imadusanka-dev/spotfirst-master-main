const ConnectSpotify = () => {
  return (
    <>
      <div>
        <div className="mt-10 divide-y divide-gray-200">
          <div className="space-y-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Get Connected
            </h3>
            <p className="max-w-2xl text-sm text-gray-500">
              Connect your spotify
            </p>
          </div>
          <div className="mt-6">
            {/* <div className="w-1/2">
                  {spotify.user ? (
                    <>
                      <div className="flex items-center justify-between px-3 py-3 mt-4  bg-[#191414] rounded-full">
                        <div className="flex items-center space-x-2">
                          <div className="w-14 h-14 rounded-full min-w-[56px] relative overflow-hidden">
                            <Image
                              src={spotify.user.images[0].url}
                              layout="fill"
                              objectFit="cover"
                              placeholder="blur"
                              blurDataURL={spotify.user.images[0].url}
                            />
                          </div>
                          <div>
                            <p className="text-white">
                              {spotify.user.display_name}
                            </p>
                            <span className="text-sm text-[#1DB954]">
                              Contected
                            </span>
                          </div>
                        </div>
                        <span className="items-center justify-end mr-3">
                          <FontAwesomeIcon
                            color="#fff"
                            size="2x"
                            icon={faSpotify}
                          />
                        </span>
                      </div>
                    </>
                  ) : (
                    <button
                      onClick={handleLoginSpotify}
                      className="flex items-center justify-center w-full px-5 py-3 mt-4 mb-5 space-x-2 text-sm font-normal text-white transition-all duration-150 bg-black rounded-lg "
                    >
                      <span className="w-6 h-6 mr-2">
                        <FontAwesomeIcon
                          color="#1DB954"
                          size="2x"
                          icon={faSpotify}
                        />
                      </span>
                      <span>Sign In with Spotify</span>
                    </button>
                  )}
                </div> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default ConnectSpotify
