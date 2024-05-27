let badusb = require('badusb')
let notification = require('notification')

badusb.setup()

if (badusb.isConnected()) {
  badusb.print('Hello World!')
} else {
  print('USB not connected.')
  notification.error()
}
