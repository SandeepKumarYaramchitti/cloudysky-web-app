import React from 'react'
import {EyeIcon} from '@heroicons/react/outline'
function FeaturedPosts() {
  return (
          <div className='border bg-surface rounded border-gray-200 p-3 mb-3 overflow-hidden hover:scale-105 transition-transform duration-200 ease-in-out cursor-pointer'>
            {/* Blog Content */}
            <div className=''>
              <p className='text-lg md:text-xl font-bold w-full text-gray-900 dark:text-gray-100 tracking-tight '>A TailwindCSS made blog post</p>
              <p className="mt-3 mb-4 text-md font-normal text-skin-base ">
                Metus potenti velit sollicitudin porttitor magnis elit lacinia tempor varius, ut cras orci vitae
                parturient id nisi vulputate consectetur, primis venenatis cursus tristique malesuada viverra
                congue risus.
              </p>
              {/* Tags */}
              <div className='mt-2 flex items-center justify-between'>
                <div className='flex items-center space-x-2'>
                  <span
                    className="inline-flex items-center leading-none px-2.5 py-1.5 text-sm font-medium text-skin-inverted rounded-full border border-skin-input"
                    >
                    Programming
                  </span>
                  <p className=' text-sm font-normal text-skin-base leading-5'>2 mins read</p>  
                </div>
                <div className='flex items-center space-x-1 mr-5 pr-5'>
                  <EyeIcon className='h-5 w-5 text-gray-600' />
                  <span className='text-sm font-normal text-skin-base'>100</span>
                </div>
               
              </div>
            </div>
          {/* Blog Main Image */}
          </div>
  )
}

export default FeaturedPosts