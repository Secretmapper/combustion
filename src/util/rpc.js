import 'whatwg-fetch';

class RPC {
  static URL = '/transmission/rpc';
  static SESSION_ID_HEADER = 'X-Transmission-Session-Id';

  constructor(url = RPC.URL) {
    this._url = url;
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
      if (response.status === 409 && response.headers.has(RPC.SESSION_ID_HEADER)) {
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
