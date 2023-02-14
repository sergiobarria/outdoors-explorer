import { Link } from 'react-router-dom'
import { ArrowRightIcon } from '@radix-ui/react-icons'

export const Hero = () => {
  return (
    <div className="relative isolate overflow-hidden">
      <img
        src="https://res.cloudinary.com/sbarria-dev/image/upload/b_black,o_50/v1676142647/outdoors-explorer/hero_c2zxdt.jpg"
        alt=""
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Discover the world, one adventure at a time.
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Embark on a journey of discovery and exploration with us. Let us be your
              guide as you travel to the most breathtaking destinations and experience the
              beauty of the great outdoors.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link to="/" className="btn-primary btn">
                Get started
              </Link>
              <Link to="/" className="btn-outline btn">
                Learn more{' '}
                <span aria-hidden="true">
                  <ArrowRightIcon width={18} height={18} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
