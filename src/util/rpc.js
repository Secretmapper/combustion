import 'whatwg-fetch';

export default function rpc(method, sessionId, data) {
  const url = `/transmission/rpc`;
  const headers = {'X-Transmission-Session-Id': sessionId};
  const body = JSON.stringify({
    'arguments': data,
    method
  });

  return fetch(url, {
    method: 'POST',
    headers,
    body
  });
};
