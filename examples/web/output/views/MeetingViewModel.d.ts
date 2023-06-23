import Managers from '../stores/Managers';
export default class MeetingViewModel {
    private appManager;
    private embedSDKManager;
    constructor(managers: Managers);
    get joinName(): string;
    get participantsCount(): number;
    get meetingStatus(): string;
    get contentStatus(): string;
    get audioStatus(): string;
    get videoStatus(): string;
    get sharingStatus(): string;
    get canShareScreen(): boolean;
    get remoteAudioMuted(): boolean;
    get remoteAudioMutedStatus(): string;
    get callControlInfo(): string;
    get videoState(): string;
    private get isDisconnected();
    setJoinName(event: any): void;
    toggleVideoState(): void;
    toggleAudioState(): void;
    toggleScreenShare(): void;
    toggleRemoteAudioMuted(): void;
    leaveMeeting(): void;
}
