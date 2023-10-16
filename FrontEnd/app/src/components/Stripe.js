


function OnRamp(){

const stripePack = new StripePack({
    // Get public key from Stripe: https://dashboard.stripe.com/register
    stripePublicKey:
      'pk_test_51MZbmZKSn9ArdBimSyl5i8DqfcnlhyhJHD8bF2wKrGkpvNWyPvBAYtE211oHda0X3Ea1n4e9J9nh2JkpC7Sxm5a200Ug9ijfoO',
    // Deploy your own server: https://github.com/5afe/aa-stripe-service
    onRampBackendUrl: 'https://aa-stripe.safe.global'
  })
  //await stripePack.init()
// See options for using the StripePack open method in:
// https://stripe.com/docs/crypto/using-the-api
const sessionData = await stripePack.open({
  element: '#stripe-root', // Can be any CSS selector
  theme: 'light' // light | dark
  // Optional, if you want to use a specific created session
  // ---
  // sessionId: 'cos_1Mei3cKSn9ArdBimJhkCt1XC',
  // Optional, if you want to specify default options
  // ---
  // defaultOptions: {
  // transaction_details: {
  //   wallet_address: walletAddress,
  //   lock_wallet_address: true
  //   supported_destination_networks: ['ethereum', 'polygon'],
  //   supported_destination_currencies: ['usdc'],
  // },
  // customer_information: {
  //   email: 'john@doe.com'
  // }
})



  return (
    <div id="stripe-root"></div>
  )

}


export default OnRamp;