export async function trackRequests(block) {
  let { handledRequests } = server.pretender;
  let n = handledRequests.length;

  await block();

  let result = handledRequests.slice(n);

  return result;
}

export function inspectRequests(requests) {
  return requests.map(inspectRequest).join('\n');
}

export function inspectRequest(request) {
  let result = `==> ${request.method} ${request.url}`;

  if (request.requestBody) {
    result += ` with ${request.requestBody}`;
  }

  return result;
}
