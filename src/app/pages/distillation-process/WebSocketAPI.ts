import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { DistillationProcessComponent } from './distillation-process.component';

export class WebSocketAPI {
    webSocketEndPoint: string = 'http://localhost:8080/ws';
    topic: string = '/topic/distillery-frontend';
    stompClient: any;
    distillationProcessComponent: DistillationProcessComponent;
    constructor(appComponent: DistillationProcessComponent) {
        this.distillationProcessComponent = appComponent;
    }
    _connect() {
        const ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(ws);
        const _this = this;
        _this.stompClient.connect({}, function (frame) {
            _this.stompClient.subscribe(_this.topic, function (sdkEvent) {
                _this.onMessageReceived(sdkEvent);
            });
        }, this.errorCallBack);
    }

    _disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
    }

    errorCallBack(error) {
        setTimeout(() => {
            this._connect();
        }, 5000);
    }

    /**
	 * Send message to sever via web socket
	 * @param {*} message
	 */
    _send(message) {
        this.stompClient.send('/distillery/distillery-backend', {}, JSON.stringify(message));
    }

    onMessageReceived(message) {
        this.distillationProcessComponent.handleMessage((message.body));
    }
}
