import { Controller } from "stimulus"
import { createConsumer } from "@rails/actioncable"

export default class extends Controller {
  static targets = [ "output" ]

  initialize() {
    let controller = this.element
    this.connection = createConsumer().subscriptions.create({channel: "ActionView::Component::Live::LiveChannel", component: this.data.get('component'), id: this.data.get('id')}, {
      connected() {
      },

      disconnected() {
      },

      received(data) {
        if(controller.isConnected){
          controller.insertAdjacentHTML('beforebegin', data['body'])
          controller.parentNode.removeChild(controller)
        }
      }
    });
  }

  connect() {
  }

  disconnect() {
    this.connection.unsubscribe();
  }
}
