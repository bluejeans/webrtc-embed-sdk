import { computed, action, observable } from 'mobx'
import { JoinProps } from 'bluejeans-webrtc-embed-sdk'
import EmbedSDKManager from './EmbedSDKManager'

export enum AppState {
  PRE_MEETING = 'PreMeeting',
  IN_MEETING = 'InMeeting',
}

declare const __SDK_PACKAGE_VERSION__: string,
  __VERSION__: string,
  __COMMIT_HASH__: string,
  __COMMIT_COUNT__: string

export default class AppManager {
  private embedSDKManager: EmbedSDKManager

  @observable joinProps: JoinProps
  @observable isJoiningMeeting: boolean
  buildInfo: string

  constructor(embedSDKManager: EmbedSDKManager) {
    this.embedSDKManager = embedSDKManager
    this.buildInfo = `embed_sdk_sample_app-V${__VERSION__}-${__COMMIT_HASH__}-${__COMMIT_COUNT__}-sdk-V${__SDK_PACKAGE_VERSION__}`
    console.log('Build info : ', this.buildInfo)
  }

  @computed get appState(): AppState {
    if (this.embedSDKManager.connectionState) {
      return AppState.IN_MEETING
    } else {
      return AppState.PRE_MEETING
    }
  }

  @action setJoiningMeeting(joining: boolean): void {
    this.isJoiningMeeting = joining
  }

  @action.bound setJoinProps(joinProps: JoinProps): void {
    this.joinProps = joinProps
  }
}
