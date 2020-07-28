window.onload = function() {
    document.getElementById("join_button").onclick = function() {
        _showConnectingUI();
        var meetingId = document.getElementById("meeting_id").value;
        var passcode = document.getElementById("passcode").value;
        let meetingInfo = {
            meetingId : meetingId,
            passcode : passcode,
            meetingOrigin : "https://a.bluejeans.com"
        }
        let iFrameProps = {
            selectorId : "iframe_holder"
        }
        let uiProps = {
            hideSignInButton : true,
            disableFullScreenToggle : document.getElementById("full_screen_toggle").checked,
            hideFooter : document.getElementById("footer_toggle").checked,
            hideChatPanel : document.getElementById("chat_toggle").checked,
            hideAppsPanel : document.getElementById("apps_toggle").checked,
            hideRoomJoinOption : true,
            lockMeetingControls : document.getElementById("lock_controls_toggle").checked,
            hideCopyLink : document.getElementById("copy_link_toggle").checked,
            hideRatingScreen : document.getElementById("rating_screen_toggle").checked,
            hideAppPitches : document.getElementById("app_pitch_toggle").checked,
            customBackground : document.getElementById("bg_color").value
        }
        let joinMeetingParams = {
            meetingInfo : meetingInfo,
            iFrameProps : iFrameProps,
            uiProps : uiProps
        }
        BJNEmbedSDK.joinMeeting(joinMeetingParams);
    }
    mobx.autorun(() => {
        console.log("Parent isSDKInitComplete : ", BJNEmbedSDK.isSDKInitComplete)
        if(BJNEmbedSDK.isSDKInitComplete) {
            console.log("isSDKInitComplete");
            _showMeetingUI();
        }
    })
}

function _showConnectingUI() {
    document.getElementById("meeting_join_view").style.display = "none"
    document.getElementById("meeting_control_view").style.display = "block"
    document.getElementById("meeting_view").style.display = "block"
}

function _showMeetingUI() {
    document.getElementById("iframe_holder").style.display = "block"

    mobx.autorun(() => {
        console.log("Parent audioMuted : ", BJNEmbedSDK.audioMuted)
        document.getElementById("audioControl").textContent = BJNEmbedSDK.audioMuted ? "Unmute Audio" : "Mute Audio";
        console.log("Parent videoMuted : ", BJNEmbedSDK.videoMuted)
        document.getElementById("videoControl").textContent = BJNEmbedSDK.videoMuted ? "Unmute Video" : "Mute Video";
        let selfParticipant = BJNEmbedSDK.selfParticipant;
        console.log("Parent selfParticipant : ", selfParticipant)
        document.getElementById("joinName").value = `${ (selfParticipant && selfParticipant.name) ? selfParticipant.name : "EmbedGuest" }`;
        console.log("Parent meetingStatus : ", BJNEmbedSDK.connectionState)
        let meetingStatus;
        switch(BJNEmbedSDK.connectionState) {
            case "Connecting":
                meetingStatus = "Connecting to Meeting";
                break;
            case "Connected":
                meetingStatus = "Connected to Meeting";
                break;
            case "Reconnecting":
                meetingStatus = "Reconnecting to Meeting";
                break;
            case "Disconnected":
                meetingStatus = "Disconnected from Meeting";
                break;
        }
        document.getElementById("meetingStatus").textContent = meetingStatus;

        document.getElementById("sharingStatus").textContent = `${BJNEmbedSDK.receivingScreenShare ? "Receiving" : "Not Receiving"}`;

        document.getElementById("totalParticipants").textContent = `${BJNEmbedSDK.participants ? BJNEmbedSDK.participants.length : 1}`;

        document.getElementById("sharingControl").textContent = `${BJNEmbedSDK.sharingScreen ? "Stop sharing" : "Start sharing"}`;
    })
    
    document.getElementById("joinName").onkeydown = function(event) {
        if(event.keyCode === 13) {
            BJNEmbedSDK.setName(document.getElementById("joinName").value)
        }
    }
    
    document.getElementById("audioControl").onclick = function() {
        BJNEmbedSDK.setAudioMuted()
    }

    document.getElementById("videoControl").onclick = function() {
        BJNEmbedSDK.setVideoMuted()
    }

    document.getElementById("sharingControl").onclick = function() {
        if(BJNEmbedSDK.sharingScreen) {
            BJNEmbedSDK.stopScreenShare()
        } else {
            BJNEmbedSDK.startScreenShare()
        }
    }
    
    document.getElementById("leaveControl").onclick = function() {
        BJNEmbedSDK.leave()
    }
}