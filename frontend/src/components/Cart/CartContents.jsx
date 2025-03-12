import { RiDeleteBin3Line } from 'react-icons/ri'

const CartContents = () => {
  const cartProducts = [
    {
      productId: 1,

      price: 100,
      qty: 2,
      Image: 'https://picsum.photos/id/1/200?random=1',
      size: 'M',
      color: 'red',
      name: 'T-shirt',
    },
    {
      productId: 2,
      size: 'XL',
      color: 'red',
      name: 'Jeans',
      price: 200,
      qty: 1,
      Image: 'https://picsum.photos/id/9/200?random=9',
    },
  ]
  return (
    <div>
      {cartProducts.map((product, index) => (
        <div
          key={index}
          className='flex items-center justify-between py-4 border-b'
        >
          <div className='flex items-tarts'>
            <img
              src={product.Image}
              alt={product.name}
              className='w-20 h-24 object-cover mr-4 rounded-md'
            />
            <div>
              <h3>{product.name}</h3>
              <p className='text-sm text-gray-500'>
                {product.size} | color: {product.color}
              </p>
              <div className='flex items-center mt-2'>
                <button className='text-xl border rounded px-2 py-1 font-medium'>
                  -
                </button>
                <span>{product.qty}</span>
                <button className='text-xl border rounded px-2 py-1 font-medium'>
                  +
                </button>
              </div>
            </div>
          </div>
          <div>
            <p>${product.price.toLocaleString()}</p>
            <button>
              <RiDeleteBin3Line className='h-6 w-6 text-red-700 ' />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CartContents
