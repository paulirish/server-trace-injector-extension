const Background = {};

let sessionTimeOffset;
let startTime;

Background.startTrace = function() {
  sessionTimeOffset = (Date.now() - performance.now()) * 1000;
  startTime = performance.now();
};

function createMockTrace() {
  const endTime = performance.now();
  const pid = 1;
  const tid = 1;
  const step = (endTime - startTime) * 1000 / 10;
  const start = startTime * 1000;
  const data = {'traceEvents': [
    {'name': 'Extension task X 1', 'ts': start, 'dur': step * 4, 'ph': 'X', 'args': {}, tid, pid, 'cat': ''},
    {'name': 'Extension task X 2', 'ts': start + step * 5, 'dur': step * 5, 'ph': 'X', 'args': {}, tid, pid, 'cat': ''},
    {'name': 'Extension task I 1', 'ts': start + step * 5.5, 'ph': 'I', 'args': {}, tid, pid, 'cat': ''},
    {'name': 'Extension task B+E', 'ts': start + step * 6, 'ph': 'B', 'args': {}, tid, pid, 'cat': ''},
    {'name': 'Extension task B+E', 'ts': start + step * 10, 'ph': 'E', 'args': {}, tid, pid, 'cat': ''}
  ]};
  return data;
}

Background.endTrace = function() {
  const data = createMockTrace();
  const url = 'data:application/json,' + escape(JSON.stringify(data));

  // Send to devtools page
  // TODO: probably could use sendResponse instead of this lame sendMessage dance
  chrome.runtime.sendMessage({
    state: 'TRACE_READY',
    url,
    sessionTimeOffset
  });
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.state == 'STATE_TRACING') {
    Background.startTrace();
  } else if (message.state == 'STATE_AFTER_TRACING') {
    Background.endTrace();
  }
});
