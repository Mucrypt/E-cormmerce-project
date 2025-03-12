import React, { useState, useCallback, useMemo } from 'react'
import { FaTimes, FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { useSearchParams } from 'react-router-dom'
import PropTypes from 'prop-types'

// Mock data for categories, sizes, colors, brands, and ratings
const categories = [
  {
    name: 'Clothing',
    subcategories: [
      {
        name: "Men's Clothing",
        subcategories: ['Shirts', 'Pants', 'Jackets', 'Shoes'],
      },
      {
        name: "Women's Clothing",
        subcategories: ['Dresses', 'Tops', 'Jeans', 'Heels'],
      },
      {
        name: "Kids' Clothing",
        subcategories: ['T-Shirts', 'Shorts', 'Sweaters', 'Sandals'],
      },
    ],
  },
  {
    name: 'Electronics',
    subcategories: [
      {
        name: 'Mobile Phones',
        subcategories: ['Smartphones', 'Feature Phones', 'Accessories'],
      },
      {
        name: 'Laptops',
        subcategories: ['Gaming Laptops', 'Ultrabooks', 'Chromebooks'],
      },
      {
        name: 'Home Appliances',
        subcategories: ['Refrigerators', 'Washing Machines', 'Microwaves'],
      },
    ],
  },
  {
    name: 'Home & Kitchen',
    subcategories: [
      {
        name: 'Furniture',
        subcategories: ['Sofas', 'Beds', 'Tables', 'Chairs'],
      },
      {
        name: 'Kitchenware',
        subcategories: ['Cookware', 'Cutlery', 'Small Appliances'],
      },
    ],
  },
]

const sizes = ['S', 'M', 'L', 'XL', 'XXL']
const colors = ['Red', 'Blue', 'Green', 'Black', 'White']
const brands = ['Nike', 'Adidas', 'Puma', 'Reebok', 'Vans']
const ratings = [5, 4, 3, 2, 1]

const FilterSidebar = ({ onClose }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [priceRange, setPriceRange] = useState([
    parseInt(searchParams.get('minPrice') || 0),
    parseInt(searchParams.get('maxPrice') || 1000),
  ])
  const [selectedCategories, setSelectedCategories] = useState(
    searchParams.get('categories')?.split(',') || []
  )
  const [selectedSizes, setSelectedSizes] = useState(
    searchParams.get('sizes')?.split(',') || []
  )
  const [selectedColors, setSelectedColors] = useState(
    searchParams.get('colors')?.split(',') || []
  )
  const [selectedBrands, setSelectedBrands] = useState(
    searchParams.get('brands')?.split(',') || []
  )
  const [selectedRatings, setSelectedRatings] = useState(
    searchParams.get('ratings')?.split(',') || []
  )
  const [expandedCategories, setExpandedCategories] = useState([])

  // Toggle category expansion
  const toggleCategory = useCallback((category) => {
    setExpandedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    )
  }, [])

  // Handle filter changes
  const handleFilterChange = useCallback((setter, value) => {
    setter((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    )
  }, [])

  // Handle price range change
  const handlePriceRangeChange = useCallback((index, value) => {
    setPriceRange((prev) => {
      const newRange = [...prev]
      newRange[index] = Math.max(0, Math.min(1000, parseInt(value) || 0))
      // Ensure min <= max
      if (index === 0 && newRange[0] > newRange[1]) {
        newRange[1] = newRange[0]
      } else if (index === 1 && newRange[1] < newRange[0]) {
        newRange[0] = newRange[1]
      }
      return newRange
    })
  }, [])

  // Apply filters and update URL
  const handleApplyFilters = useCallback(() => {
    const params = new URLSearchParams()
    params.set('minPrice', priceRange[0])
    params.set('maxPrice', priceRange[1])
    if (selectedCategories.length > 0)
      params.set('categories', selectedCategories.join(','))
    if (selectedSizes.length > 0) params.set('sizes', selectedSizes.join(','))
    if (selectedColors.length > 0)
      params.set('colors', selectedColors.join(','))
    if (selectedBrands.length > 0)
      params.set('brands', selectedBrands.join(','))
    if (selectedRatings.length > 0)
      params.set('ratings', selectedRatings.join(','))

    setSearchParams(params)
    onClose() // Close sidebar on mobile
  }, [
    priceRange,
    selectedCategories,
    selectedSizes,
    selectedColors,
    selectedBrands,
    selectedRatings,
    setSearchParams,
    onClose,
  ])

  // Reset all filters
  const handleResetFilters = useCallback(() => {
    setPriceRange([0, 1000])
    setSelectedCategories([])
    setSelectedSizes([])
    setSelectedColors([])
    setSelectedBrands([])
    setSelectedRatings([])
    setSearchParams(new URLSearchParams())
  }, [setSearchParams])

  // Memoized filter sections for performance
  const renderCategoryFilters = useMemo(
    () =>
      categories.map((category) => (
        <div key={category.name}>
          <button
            onClick={() => toggleCategory(category.name)}
            className='flex items-center justify-between w-full text-left font-medium text-gray-700 hover:text-gray-900'
            aria-expanded={expandedCategories.includes(category.name)}
          >
            <span>{category.name}</span>
            {expandedCategories.includes(category.name) ? (
              <FaChevronUp className='text-sm' />
            ) : (
              <FaChevronDown className='text-sm' />
            )}
          </button>
          {expandedCategories.includes(category.name) && (
            <div className='pl-4 mt-2 space-y-2'>
              {category.subcategories.map((subcategory) => (
                <div key={subcategory.name}>
                  <label className='flex items-center space-x-2'>
                    <input
                      type='checkbox'
                      checked={selectedCategories.includes(subcategory.name)}
                      onChange={() =>
                        handleFilterChange(
                          setSelectedCategories,
                          subcategory.name
                        )
                      }
                      className='form-checkbox h-5 w-5 text-green-600'
                      aria-label={`Select ${subcategory.name}`}
                    />
                    <span>{subcategory.name}</span>
                  </label>
                  {subcategory.subcategories && (
                    <div className='pl-4 mt-2 space-y-2'>
                      {subcategory.subcategories.map((sub) => (
                        <label
                          key={sub}
                          className='flex items-center space-x-2'
                        >
                          <input
                            type='checkbox'
                            checked={selectedCategories.includes(sub)}
                            onChange={() =>
                              handleFilterChange(setSelectedCategories, sub)
                            }
                            className='form-checkbox h-5 w-5 text-green-600'
                            aria-label={`Select ${sub}`}
                          />
                          <span>{sub}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )),
    [expandedCategories, selectedCategories, handleFilterChange, toggleCategory]
  )

  return (
    <div className='w-72 p-6 bg-white shadow-lg sm:w-full sm:p-4'>
      {/* Close Button (Mobile Only) */}
      <button
        onClick={onClose}
        className='lg:hidden absolute top-4 right-4 text-gray-600 hover:text-gray-900'
        aria-label='Close sidebar'
      >
        <FaTimes className='text-xl' />
      </button>

      {/* Price Range Filter */}
      <div className='mb-6'>
        <h3 className='text-lg font-semibold mb-4'>Price Range</h3>
        <input
          type='range'
          min={0}
          max={1000}
          value={priceRange[0]}
          onChange={(e) => handlePriceRangeChange(0, e.target.value)}
          className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer'
          aria-label='Minimum price range'
        />
        <input
          type='range'
          min={0}
          max={1000}
          value={priceRange[1]}
          onChange={(e) => handlePriceRangeChange(1, e.target.value)}
          className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2'
          aria-label='Maximum price range'
        />
        <div className='flex justify-between text-sm text-gray-600 mt-2'>
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      {/* Category and Subcategory Filter */}
      <div className='mb-6'>
        <h3 className='text-lg font-semibold mb-4'>Categories</h3>
        <div className='space-y-2'>{renderCategoryFilters}</div>
      </div>

      {/* Size Filter */}
      <div className='mb-6'>
        <h3 className='text-lg font-semibold mb-4'>Sizes</h3>
        <div className='flex flex-wrap gap-2'>
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => handleFilterChange(setSelectedSizes, size)}
              className={`px-4 py-2 border rounded-lg transition-colors ${
                selectedSizes.includes(size)
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              aria-label={`Select size ${size}`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Color Filter */}
      <div className='mb-6'>
        <h3 className='text-lg font-semibold mb-4'>Colors</h3>
        <div className='flex flex-wrap gap-2'>
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => handleFilterChange(setSelectedColors, color)}
              className={`w-8 h-8 rounded-full border transition-shadow ${
                selectedColors.includes(color) ? 'ring-2 ring-green-600' : ''
              }`}
              style={{ backgroundColor: color.toLowerCase() }}
              aria-label={`Select color ${color}`}
            ></button>
          ))}
        </div>
      </div>

      {/* Brand Filter */}
      <div className='mb-6'>
        <h3 className='text-lg font-semibold mb-4'>Brands</h3>
        <div className='space-y-2'>
          {brands.map((brand) => (
            <label key={brand} className='flex items-center space-x-2'>
              <input
                type='checkbox'
                checked={selectedBrands.includes(brand)}
                onChange={() => handleFilterChange(setSelectedBrands, brand)}
                className='form-checkbox h-5 w-5 text-green-600'
                aria-label={`Select brand ${brand}`}
              />
              <span>{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div className='mb-6'>
        <h3 className='text-lg font-semibold mb-4'>Ratings</h3>
        <div className='space-y-2'>
          {ratings.map((rating) => (
            <label key={rating} className='flex items-center space-x-2'>
              <input
                type='checkbox'
                checked={selectedRatings.includes(rating.toString())}
                onChange={() =>
                  handleFilterChange(setSelectedRatings, rating.toString())
                }
                className='form-checkbox h-5 w-5 text-green-600'
                aria-label={`Select ${rating} star rating`}
              />
              <span>{`${rating} Star${rating > 1 ? 's' : ''}`}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Apply and Reset Filters Buttons */}
      <div className='flex flex-col gap-2'>
        <button
          onClick={handleApplyFilters}
          className='w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-semibold transition-all'
          aria-label='Apply filters'
        >
          Apply Filters
        </button>
        <button
          onClick={handleResetFilters}
          className='w-full bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg font-semibold transition-all'
          aria-label='Reset filters'
        >
          Reset Filters
        </button>
      </div>
    </div>
  )
}

FilterSidebar.propTypes = {
  onClose: PropTypes.func.isRequired,
}

export default React.memo(FilterSidebar)
