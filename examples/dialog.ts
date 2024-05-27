let dialog = require('dialog')

print(dialog.message('Dialog demo', 'Press OK to start'))

print(
  dialog.custom({
    header: 'Dialog demo',
    text: 'Press OK to start',
    button_left: 'left',
    button_right: 'right',
    button_center: 'center',
  })
)
