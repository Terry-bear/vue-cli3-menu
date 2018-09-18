export default class OpenMessage {
  constructor(message, ThisMsg) {
    this.message = message
    this.ThisMsg = ThisMsg
  }
  open() {
    this.ThisMsg(this.message)
  }
  openSuccess() {
    this.ThisMsg({
      message: this.message,
      type: 'success'
    })
  }

  openWaring() {
    this.ThisMsg({
      message: this.message,
      type: 'warning'
    })
  }

  openError() {
    this.ThisMsg.error(this.message)
  }
}
