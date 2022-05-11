(function () {
    /*  
    window.postMessage({
        "type": "embedProxy.toProxy",
        "method" : "joinMeeting",
        "args": [{
            "meetingInfo": {
                "meetingId": "<Meeting ID>",
                "passcode": "<Passcode>",
                "name": "<Name>"
            },
            "iFrameProps": {
                "width": "100vw",
                "height": "100vh",
                "selectorId": ".iframeHolder"
            },
            "uiProps": {
                "disableFullScreenToggle": false,
                "hideFooter": false,
                "hideChatPanel": false,
                "hideAppsPanel": true,
                "lockMeetingControls": false,
                "hideCopyLink": false,
                "hideRatingScreen": false,
                "hideAppPitches": true,
                "customBackground": "",
                "hideOtherJoinOptions": false,
                "inMeetingBGConfig": {
                    "audioTileColor": "",
                    "containerColorOfAllTiles": ""
                },
                "locale": "en",
                "teleHealthConfig": {
                    "skipCheckIn": true,
                    "backgroundColor": "linear-gradient(#6600CC, #6600FF)",
                    "welcomeText": "Welcome to the clinic!",
                    "waitingText": "Please wait for your provider",
                    "resources": {
                        "videos": {
                            "data": [
                                {
                                    "title": "Video title",
                                    "thumbnailUrl": "https://vid.com",
                                    "url": "https://vid.com",
                                    "duration": "12:10"
                                }
                            ]
                        }
                    }
                }
            }
        }]
    })
    */
    const toNative = "embedProxy.toNative";
    const toProxy = "embedProxy.toProxy";
    let BJNEmbedSDK = BJN.BJNEmbedSDK;
    let sendDataToParent =function (messageOptions) {
        messageOptions = messageOptions || {};
        let postMessageBody = messageOptions;

        // MacOS or iOS
        if(typeof window.webkit?.messageHandlers !== "undefined") {
            console.log("Inside sendDataToParent - detected Mac or ios");
            if(typeof window.webkit.messageHandlers.nativeProcess !== "undefined" &&
            typeof window.webkit.messageHandlers.nativeProcess.postMessage !== "undefined") {
                // MacOS
                console.log("In sendDataToParent - detected Mac. trying to send via nativeProcess.postMessage");
                try {
                    window.webkit.messageHandlers.nativeProcess.postMessage(postMessageBody)
                } catch (ex) {
                    console.log("Some error happened in posting message on mac")
                }
            } else if(typeof window.webkit?.messageHandlers?.sendMessageHandler !== "undefined" &&
            typeof window.webkit?.messageHandlers?.sendMessageHandler.postMessage !== "undefined") {
                // iOS
                console.log("In sendDataToParent - detected iOS. trying to send via sendMessageHandler.postMessage");
                try {
                    window.webkit.messageHandlers.sendMessageHandler.postMessage(JSON.stringify(postMessageBody));
                } catch (ex) {
                    console.log("Some error happened in posting message on iOS")
                }
            }
        } else if(typeof window.appInterface !== "undefined" && typeof window.appInterface.postMessage !== "undefined") {
            // Android
            console.log("In sendDataToParent - detected Android. trying to send via appInterface.postMessage");
            try {
                window.appInterface.postMessage(JSON.stringify(postMessageBody));
            } catch(ex) {
                console.log("Some error happened in posting message on android")
            }
        } else if(typeof window.external !== "undefined" && typeof window.external.postMessage !== "undefined") {
            // React-native-windows
            window.external.postMessage(JSON.stringify(postMessageBody))
        } else {
            // iframe.
            window.parent.postMessage(postMessageBody, "*")
        }
    }

    let initializeWindowListerners = function() {
        window.addEventListener('message', (event) => {
            const origin = event.origin;
            let parsedData = event.data;
            try {
                if(typeof event.data === "string") {
                    parsedData = JSON.parse(event.data);
                } else {
                    parsedData = event.data;
                }
            } catch (ex) {
                console.info("Some error while parsing raw JSON. Setting data as is.", ex);
                parsedData = event.data;
            }
            if (parsedData?.type != "webpackOk") {
                // DO NOTHING!
            }
            if(parsedData.type !== toProxy) return;
            if(parsedData && parsedData.method && parsedData.method === "joinMeeting") {
                if(window.joinMeetingCalled) {
                    console.error("Join meeting has already been called once, ignoring this postMessage");
                    return;
                }
                window.joinMeetingCalled = true;
            }
            BJNEmbedSDK[parsedData.method].apply(BJNEmbedSDK, parsedData.args);
        }, false);
        setUpEmbedSDKObservers();
    }

    let setUpEmbedSDKObservers = function() {
        BJNEmbedSDK.observe("connectionState", () => {
            console.info("connectionState changed : ", BJNEmbedSDK.connectionState)
            sendDataToParent(generatePostMessageForParent(true, "connectionState", BJNEmbedSDK.connectionState));
        })
    }


    let generatePostMessageForParent = function(isProperty, name, value) {
        let msg = isProperty ?
        {
            "type": toNative,
            "property": name,
            "value": value
        } :
        {
            "type": toNative,
            "method": name,
            "args": value
        }
        return msg;
    }

    initializeWindowListerners();
  })();