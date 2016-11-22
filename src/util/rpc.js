import 'whatwg-fetch';

class RPC {
  static SESSION_ID_HEADER = 'X-Transmission-Session-Id';

  constructor(onConnect = () => {}, onDisconnect = () => {}) {
    this._url = '/transmission/rpc';
    this._onConnect = onConnect;
    this._onDisconnect = onDisconnect;
    this._sessionId = null;
  }

  sendRequest(method, data) {
    const headers = {
      [RPC.SESSION_ID_HEADER]: this._sessionId
    };
    const body = JSON.stringify({
      'arguments': data,
      method
    });

    return fetch(this._url, {
      method: 'POST',
      headers,
      body
    }).then((response) => {
      if (response.status === 502) {
        this._onDisconnect(response);
      } else if (response.status === 409 && response.headers.has(RPC.SESSION_ID_HEADER)) {
        this._onConnect(response);

        this._sessionId = response.headers.get(RPC.SESSION_ID_HEADER);

        return fetch(this._url, {
          method: 'POST',
          headers: {...headers, [RPC.SESSION_ID_HEADER]: this._sessionId},
          body
        });
      }

      // TODO: Review fullfilment value
      return response;
    });
  }
}

export default RPC;
