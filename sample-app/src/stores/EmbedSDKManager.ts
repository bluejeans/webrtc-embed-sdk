import { computed, action } from "mobx";
import {  BJNEmbedSDK as EmbedSDK, BJNEmbedSDKInterface, BJNEConnectionState, BJNEParticipant, BJNEChatMessage, JoinProps, VideoState } from "bluejeans-webrtc-embed-sdk";

export default class EmbedSDKManager implements BJNEmbedSDKInterface {

    constructor() {
        EmbedSDK.observe("audioMuted", () => {
            console.info("audioMuted changed : ", EmbedSDK.audioMuted)
        })

        EmbedSDK.observe("connectionState", () => {
            console.info("connectionState changed : ", EmbedSDK.connectionState)
        })
    }

    @computed get isSDKInitComplete() : boolean {
        return EmbedSDK.isSDKInitComplete;
    }

    @computed get connectionState(): BJNEConnectionState {
        return EmbedSDK.connectionState;
    }

    @computed get audioMuted(): boolean {
        return EmbedSDK.audioMuted;
    }

    @computed get videoMuted(): boolean {
        return EmbedSDK.videoMuted;
    }

    @computed get receivingScreenShare(): boolean {
        return EmbedSDK.receivingScreenShare;
    }

    @computed get sharingScreen(): boolean {
        return EmbedSDK.sharingScreen;
    }

    @computed get canShareScreen(): boolean {
        return EmbedSDK.canShareScreen;
    }

    @computed get remoteAudioMuted(): boolean {
        return EmbedSDK.remoteAudioMuted;
    }

    @computed get participants(): BJNEParticipant[] {
        return EmbedSDK.participants;
    }

    @computed get selfParticipant(): BJNEParticipant {
        return EmbedSDK.selfParticipant;
    }

    @computed get chatMessages(): BJNEChatMessage[] {
        return EmbedSDK.chatMessages;
    }

    @computed get videoState(): VideoState {
        return EmbedSDK.videoState;
    }

    @action joinMeeting(joinProps : JoinProps) {
        EmbedSDK.joinMeeting(joinProps);
    }

    @action leave(): void {
        EmbedSDK.leave();
    }

    @action leaveAndEndForAll(): void {
        // TODO
    }

    @action setAudioMuted(val?:boolean): void {
        EmbedSDK.setAudioMuted(val);
    }

    @action setVideoMuted(val?:boolean): void {
        EmbedSDK.setVideoMuted(val);
    }

    @action startScreenShare(): void {
        if(this.canShareScreen) {
            EmbedSDK.startScreenShare();
        }
    }

    @action stopScreenShare(): void {
        if(this.canShareScreen) {
            EmbedSDK.stopScreenShare();
        }
    }

    @action setRemoteAudioMuted(mute : boolean): void {
        EmbedSDK.setRemoteAudioMuted(mute);
    }

    @action setName(name: string): void {
        EmbedSDK.setName(name);
    }
}