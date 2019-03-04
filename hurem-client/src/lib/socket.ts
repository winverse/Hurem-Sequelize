export default class SocketHelper {
	_store: any;
	_socket: any;
	_uri: string;
	_listen: boolean = true;

	constructor({ store, uri }: any) {
		this._socket = new WebSocket(uri);
		console.log(this._socket);
		this.initialize({ store, uri });
	}

	parseJSON = (str: string) => {
		let parsed = null;
		try {
			parsed = JSON.parse(str);
		} catch (e) {
			return null;
		}
		return parsed;
	}

	listener = (message: any) => {
		const { parseJSON, _store } = this;
		if (!this._listen) return;
		const data = parseJSON(message.data);
		if (!data || !data.type) return;
		_store.dispatch(data);
	}

	reconnect = () => {
		const { _uri } = this;
		setTimeout(() => {
			console.log(`reconnecting...`);
			this.connect(_uri);
		}, 300);
	}

	connect = (uri: string) => {
		const { _socket, listener, reconnect } = this;
		if (!_socket) return;
		this._uri = uri;
		_socket.onmessage = listener;
		_socket.onopen = (event: any) => {
			console.log('connected to', uri);
		};
		_socket.onclose = reconnect; 
	}

	initialize = ({ store, uri }: any) => {
		const { connect } = this;
		this._store = store;
		connect(uri);
	}

	listen = () => {
		this._listen = true;
	}

	ignore = () => {
		this._listen = false;
	}
}