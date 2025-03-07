import Link from "next/link"
import LogoCloud from "components/LogoCloud"
import Pipeline from "components/Pipeline"

function PageLinkContainer({ children }) {
  return (
    <div className="w-72 h-40 bg-gray-700 text-white rounded flex items-center justify-center text-2xl font">
      {children}
    </div>
  )
}

export default function Home() {
  return (
    <div>
      <div className="relative bg-gray-900 min-h-screen flex flex-col">
        <div className="p-4 flex justify-between">
          <a
            className="text-xl text-pink-500 font-bold"
            href={process.env.NEXT_PUBLIC_URL}
          >
            CharityBase
          </a>
          <div className="hidden sm:flex space-x-6">
            <a
              target="_blank"
              rel="noreferrer noopener"
              href="https://github.com/sponsors/charity-base"
              className="text-gray-500 hover:text-gray-300 font-bold"
            >
              Sponsor
            </a>
            <a
              target="_blank"
              rel="noreferrer noopener"
              href="https://github.com/charity-base"
              className="text-gray-500 hover:text-gray-300 font-bold"
            >
              GitHub
            </a>
            <a
              target="_blank"
              rel="noreferrer noopener"
              href="https://twitter.com/charitybase_uk"
              className="text-gray-500 hover:text-gray-300 font-bold"
            >
              Twitter
            </a>
          </div>
        </div>
        <div className="flex-grow py-24 flex flex-col justify-center space-y-24">
          <h1 className="text-4xl font-extrabold text-center text-white">
            The Database of Charities
          </h1>
          <Pipeline />
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          preserveAspectRatio="none"
          viewBox="0 0 1680 40"
          className="absolute w-full z-10 bottom-0 text-white"
          // style="bottom: -1px;"
        >
          <path d="M0 40h1680V30S1340 0 840 0 0 30 0 30z" />
        </svg>
      </div>

      <div className="bg-white pt-44 pb-60">
        <LogoCloud />
      </div>
      <div className="relative bg-pink-50 py-48 sm:py-60">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          preserveAspectRatio="none"
          viewBox="0 0 1680 40"
          className="absolute w-full z-10 top-0 text-white transform rotate-180"
          // style="bottom: -1px;"
        >
          <path d="M0 40h1680V30S1340 0 840 0 0 30 0 30z" />
        </svg>
        <div className="flex justify-center items-center flex-col space-y-8 sm:space-y-0 sm:flex-row sm:space-x-12">
          <a
            target="_blank"
            rel="noreferrer noopener"
            href="https://search.charitybase.uk/chc"
          >
            <PageLinkContainer>Search Charities</PageLinkContainer>
          </a>
          <Link href="/docs">
            <PageLinkContainer>Access the API</PageLinkContainer>
          </Link>
        </div>
      </div>
      <div className="relative bg-gray-50 py-24 text-sm leading-7 text-gray-500 text-center px-4">
        <div className="absolute -top-6 inset-x-0 text-center">
          <a
            target="_blank"
            rel="noreferrer noopener"
            href="https://github.com/sponsors/charity-base"
            className="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-base font-bold rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          >
            <svg
              className="-ml-1 mr-3 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
            Sponsor
          </a>
        </div>
        Created open source & free to use
        <br />
        <div className="mt-4 uppercase">
          Worthwhile Applications Ltd
          <span className="hidden sm:inline"> &middot; </span>
          <span className="sm:hidden">
            <br />
          </span>
          registered company 12946098
        </div>
      </div>
    </div>
  )
}
