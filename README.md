Nativescript Dynatrace plugin for Android and iOS
=================================================

Auto-instrument your application with Dynatrace and to prepare it for monitoring.


Prerequisites / Requirements
----------------------------

You need a Dynatrace account and the credentials of your Dynatrace Application (`DTXApplicationID`, `DTXAgentEnvironment` and `DTXClusterURL`).


Installation
------------

First, you need to add the Nativescript Dynatrace plugin:

    tns plugin add nativescript-dynatrace

Then, you  need to create a file named `dynatrace-service.json` or `dynatrace-service.js` in `NAME_PROJECT/app/App_Resources/` with the following structure:

```typescript
module.exports = {
  DTXAgentEnvironment: string,
  DTXAllowAnyCert: boolean,
  DTXApplicationID: string,
  DTXAutoActionMaxDurationMilliseconds: int,
  DTXAutoActionTimeoutMilliseconds: int,
  DTXAutoStart: boolean,
  DTXBKSFileName: string,
  DTXBKSPassword: string,
  DTXClusterURL: boolean,
  DTXCrashReportingEnabled: boolean,
  DTXExcludePackages: string,
  DTXHybridApplication: boolean,
  DTXIncludeAllPackages: boolean,
  DTXIncludePackages: string,
  DTXInstrumentAutoUserAction: boolean,
  DTXInstrumentGPSLocation: boolean,
  DTXInstrumentLifecycleMonitoring: boolean,
  DTXInstrumentWebRequestTagging: boolean,
  DTXInstrumentWebRequestTiming: boolean,
  DTXLogLevel: string,
  DTXManagedCluster: boolean,
  DTXMonitorCookie: string,
  DTXMultiDexKeep: string,
  DTXMultiDexKeepFile: string,
  DTXPrimaryDexLimit: int,
  DTXSecondaryDexLimit: int,
  DTXSetCookiesForDomain: string,
  DTXUserOptIn: boolean,
  DTXVersionCode: int,
  DTXVersionName: string,
};
```

[Here](https://www.dynatrace.com/support/help/user-experience/mobile-apps/how-do-i-use-advanced-settings-for-android-auto-instrumentation/#367auto-instrumentation-properties) you can find all the auto-instrumentation properties that you can customize.


How this plugin works
---------------------

Work in progress...


API
---

Work in progress...


License
-------

Apache License Version 2.0, January 2004
