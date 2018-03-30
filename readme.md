
## server-trace-injector-extension

Demo extension to demonstrate the `chrome.experimental.devtools.timeline.addTraceProvider` devtools extension API.

Implementation details on https://bugs.chromium.org/p/chromium/issues/detail?id=620066

#### Usage

1. You must enable `Experimental Extension APIs` in `about:flags` or via chrome flag `--enable-experimental-extension-apis`.
1. Install unpacked extension
1. open devtools, open Performance panel
1. Close devtools again and reopen it, so that it initializes with the perf panel open. (Some extension initialization race bug...)
1. check the "TraceInjector" checkbox on the far right of the perf panel toolbar
1. start & stop recording
1. The mock server trace events are the last track, so you may want to _collapse_ the Main Thread in order to see it.

#### Screenshot

![image](https://user-images.githubusercontent.com/39191/38119828-81466320-3379-11e8-9531-7bff8fe250a3.png)
