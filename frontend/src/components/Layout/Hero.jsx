import { useEffect, useState, useCallback } from 'react'
import image1 from '../../assets/img1.webp'
import image2 from '../../assets/img2.webp'
import image3 from '../../assets/img3.jpg'
import image4 from '../../assets/img4.jpg'
import image5 from '../../assets/img5.webp'

import image1Mobile from '../../assets/img1_mobile.jpg'
import image2Mobile from '../../assets/img2_mobile.webp'
import image3Mobile from '../../assets/img3_mobile.jpg'
import image4Mobile from '../../assets/img4_mobile.jpg'
import image5Mobile from '../../assets/img5_mobile.png'

import { FaAngleRight, FaAngleLeft } from 'react-icons/fa6'


const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0)

  const desktopImages = [image1, image2, image3, image4, image5]
  const mobileImages = [
    image1Mobile,
    image2Mobile,
    image3Mobile,
    image4Mobile,
    image5Mobile,
  ]

  // Memoize nextImage function to prevent re-renders
  const nextImage = useCallback(() => {
    if (currentImage < desktopImages.length - 1) {
      setCurrentImage((prev) => prev + 1)
    } else {
      setCurrentImage(0) // Loop back to the first image
    }
  }, [currentImage, desktopImages.length])

  const prevImage = () => {
    if (currentImage > 0) {
      setCurrentImage((prev) => prev - 1)
    } else {
      setCurrentImage(desktopImages.length - 1) // Go to last image when reaching start
    }
  }

  useEffect(() => {
    const interval = setInterval(nextImage, 5000) // Change image every 5 seconds
    return () => clearInterval(interval) // Clean up interval on component unmount
  }, [nextImage])

  return (
    <div className='container mx-auto px-4 rounded'>
      <div className='h-56 md:h-96 w-full bg-slate-200 relative overflow-hidden'>
        {/* Navigation Arrows */}
        <div className='absolute z-10 h-full w-full md:flex items-center hidden'>
          <div className='flex justify-between w-full text-2xl'>
            <button
              onClick={prevImage}
              className='p-2 rounded border bg-defaul-button text-white hover:bg-hero-button-hover  transition-colors'
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={nextImage}
              className='p-2 rounded border bg-defaul-button text-white  hover:bg-hero-button-hover transition-colors'
            >
              <FaAngleRight />
            </button>
          </div>
        </div>

        {/* Desktop and tablet version */}
        <div className='hidden md:flex h-full w-full overflow-hidden'>
          {desktopImages.map((imageUrl, index) => (
            <div
              key={index}
              className='w-full h-full min-w-full min-h-full transition-all duration-500 ease-in-out'
              style={{ transform: `translateX(-${currentImage * 100}%)` }}
            >
              <img
                src={imageUrl}
                className='w-full h-full object-cover'
                alt={`Banner ${index + 1}`}
              />
            </div>
          ))}
        </div>

        {/* Mobile version */}
        <div className='flex h-full w-full overflow-hidden md:hidden'>
          {mobileImages.map((imageUrl, index) => (
            <div
              key={index}
              className='w-full h-full min-w-full min-h-full transition-all duration-500 ease-in-out'
              style={{ transform: `translateX(-${currentImage * 100}%)` }}
            >
              <img
                src={imageUrl}
                className='w-full h-full object-cover'
                alt={`Banner mobile ${index + 1}`}
              />
            </div>
          ))}
        </div>

        {/* Overlay Text and Shop Now Button */}
        <div className='absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30'>
          <div className='text-center text-white space-y-4'>
            <h1 className='text-3xl md:text-5xl font-bold tracking-wide'>
              Welcome to Our Store
            </h1>
            <p className='text-lg md:text-xl max-w-2xl'>
              Discover the latest trends and shop your favorite products at
              unbeatable prices.
            </p>
            <button className='bg-defaul-button text-white font-semibold py-3 px-8 rounded-md shadow-lg hover:bg-blue-700 transition-colors transform hover:scale-105'>
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
