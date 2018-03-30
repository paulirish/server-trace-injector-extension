// timeout because of some race. :/
setTimeout(_ => {
  let traceRecorder = chrome.experimental.devtools.timeline.addTraceProvider(
    'TraceInjector',
    'Trace from Cloud Provider'
  );

  let tracingSession;

  traceRecorder.onRecordingStarted.addListener(session => {
    console.log('start recording');

    tracingSession = session;
    // Relay the tab ID to the background page
    chrome.runtime.sendMessage({
      state: 'STATE_TRACING'
    });
  });

  traceRecorder.onRecordingStopped.addListener(() => {
    console.log('stop recording');
    chrome.runtime.sendMessage({
      state: 'STATE_AFTER_TRACING'
    });
  });

  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    console.log({message, sender, sendResponse});
    if (message.state === 'TRACE_READY') {
      const {url, sessionTimeOffset} = message;
      tracingSession.complete(url, sessionTimeOffset);
    }
  });
}, 1000);
