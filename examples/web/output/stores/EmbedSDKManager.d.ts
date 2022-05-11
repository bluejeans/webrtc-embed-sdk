import { BJNEmbedSDKInterface, BJNEConnectionState, BJNEParticipant, BJNEChatMessage, JoinProps, VideoState } from "bluejeans-webrtc-embed-sdk";
export default class EmbedSDKManager implements BJNEmbedSDKInterface {
    constructor();
    get isSDKInitComplete(): boolean;
    get connectionState(): BJNEConnectionState;
    get audioMuted(): boolean;
    get videoMuted(): boolean;
    get receivingScreenShare(): boolean;
    get sharingScreen(): boolean;
    get canShareScreen(): boolean;
    get remoteAudioMuted(): boolean;
    get participants(): BJNEParticipant[];
    get selfParticipant(): BJNEParticipant;
    get chatMessages(): BJNEChatMessage[];
    get videoState(): VideoState;
    get version(): string;
    joinMeeting(joinProps: JoinProps): void;
    leave(): void;
    leaveAndEndForAll(): void;
    setAudioMuted(val?: boolean): void;
    setVideoMuted(val?: boolean): void;
    startScreenShare(): void;
    stopScreenShare(): void;
    setRemoteAudioMuted(mute: boolean): void;
    setName(name: string): void;
}
