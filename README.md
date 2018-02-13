# Nativescript Dynatrace plugin for Android and iOS

Basic Instrument your application to prepare for monitoring.

## Prerequisites / Requirements

- Head on over to https://dynatrace.com/ and sign up for a account.
- You need to have the credentials of your Dynatrace Application.
    Example:
    applicationId 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX'
    environmentId 'XXXXXXXXX'
    cluster 'https://XXXXXX.dynatrace.com'

## Installation

You need to create a file named dynatrace-service.json with the following structure

{
  "project_info": {
    "applicationId": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
    "environmentId": "XXXXXXXXX",
    "cluster": "https://XXXXXX.dynatrace.com"
  }
}

Go to the next path NAME_PROJECT/app/App_Resources/ and paste in that directory your file that you just created

Adding the Nativescript Dynatrace plugin

```javascript
tns plugin add nativescript-dynatrace
```

## API

Developing...
    
## License

Apache License Version 2.0, January 2004
