import {DistillationProcessComponent} from './distillation-process.component';

export class WebSocketAPI {

    distillationProcessComponent: DistillationProcessComponent;
    private WS_BACKEND_URL = 'ws://localhost:8080/distillery-backend';
    private webSocket: WebSocket;

    constructor(appComponent: DistillationProcessComponent) {
        this.distillationProcessComponent = appComponent;
    }

    connect() {
        this.webSocket = new WebSocket(this.WS_BACKEND_URL);
        this.webSocket.onmessage = (event) => {
            this.onMessageReceived(JSON.parse(event.data));
        };
    }

    disconnect() {
        if (this.webSocket !== null) {
            this.webSocket.close();
        }
    }

    /**
     * Send message to sever via web socket
     * @param {*} message
     */
    send = async message => {
        while (this.webSocket.readyState !== 1) {
            await new Promise(f => setTimeout(f, 1000));
        }
        this.webSocket.send(JSON.stringify(message));
    }

    onMessageReceived(data) {
        this.distillationProcessComponent.handleMessage(data);
    }
}
