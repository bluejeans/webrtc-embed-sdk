
# Change Log
All notable changes to this project will be documented in this file.
 
This project adheres to [Semantic Versioning](http://semver.org/).

## [2.1.1] - 2022-05-11

### Added
- A version property to BJNEmbedSDK to return the current SDK version
### Changed
- Fixed a minor bug to allow file:// URLs to call methods on Embed SDK. This helps with WebView support for locally hosted WebView content
## [2.1.0] - 2022-04-07
### Added

- Support for joining meetings on mobile browsers
- Support for customizing join experience on mobile browsers
- Support for televisits on desktop and mobile browsers
- Ability to customize various aspects of the Patient Landing Experience including; welcome text on the landing screen, background color, organization’s logo, providers image, messaging on the entertainment screen, and articles and videos for patients to view while waiting for the provider. 
- Ability to mute the incoming audio from other participants

## [2.0.0] - 2021-10-06
 
### Added
- Support for selecting Language while joining a meeting through the locale UI Config
- Support for customising background colors for audio tiles and participant tile container
 
### Changed
- **BREAKING CHANGE**: BJNEmbedSDK is now a named export rather than being a default export. Please refer to the [Including BJNEmbedSDK](https://bluejeans.github.io/webrtc-embed-sdk/docs/index.html#including-bjnembedsdk) section of our documentation to see how to include the SDK in your projects
 