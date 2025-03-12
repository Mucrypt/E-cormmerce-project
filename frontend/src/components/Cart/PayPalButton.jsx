import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import PropTypes from 'prop-types'

const PayPalButton = ({amount, onSuccess, onError}) => {
  return (
    <PayPalScriptProvider
      options={{
        'client-id': 
        import.meta.env.VITE_PAYPAL_CLIENT_ID,
      }}
    >
      <PayPalButtons
        style={{ layout: 'vertical' }} // Customize the button layout
        createOrder={(data, actions) => {
          // Create an order on your server or use a mock order
          return actions.order.create({
            purchase_units: [{amount: {value: amount }}],
          })
        }}
        onApprove={(data, actions) => {
          // Capture the payment and handle success
          return actions.order.capture().then(onSuccess)
        }}
        onError={onError} // Handle errors
      />
    </PayPalScriptProvider>
  )
}
PayPalButton.propTypes = {
  amount: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
}


export default PayPalButton
