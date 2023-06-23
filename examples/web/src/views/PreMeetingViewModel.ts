import { observable, action, extendObservable } from 'mobx'
import {
  JoinProps,
  THSettings,
  Articles,
  Videos,
  Article,
  Video,
  MeetingInfo,
  UIProps,
  IFrameProps,
  InMeetingBGColors,
  Locale,
} from 'bluejeans-webrtc-embed-sdk'
import Managers from '../stores/Managers'
import EmbedSDKManager from '../stores/EmbedSDKManager'
import AppManager from '../stores/AppManager'

export default class PreMeetingViewModel {
  private embedSDKManager: EmbedSDKManager
  private appManager: AppManager
  @observable meetingID: string = ''
  @observable passcode: string = ''
  @observable joinName: string = ''
  @observable meetingOrigin: string = 'https://bluejeans.com'
  @observable disableFullScreenToggle: boolean = false
  @observable hideMeetingFooter: boolean = false
  @observable hideChatPanel: boolean = false
  @observable hideAppsPanel: boolean = false
  @observable lockMeetingControls: boolean = false
  @observable hideCopyLink: boolean = false
  @observable hideRatingScreen: boolean = false
  @observable disableAppPitches: boolean = false
  @observable hideOtherJoinOptions: boolean = false
  @observable backgroundColor: string = ''
  @observable customInMeetingBGConfig: InMeetingBGColors
  @observable meetingContainerWidth: string = ''
  @observable meetingContainerHeight: string = ''
  @observable isMobileEmbed: boolean = false
  @observable teleHealthConfig: THSettings = {}
  @observable meetingContainerRef: string = '.iframeHolder'
  @observable appLocale
  @observable showTHCustomisationOptions: boolean
  @observable externalID: string = ''

  constructor(managers: Managers) {
    this.embedSDKManager = managers.embedSDKManager
    this.appManager = managers.appManager
    this.customInMeetingBGConfig = {
      audioTileColor: '',
      containerColorOfAllTiles: '',
    }
  }

  @action.bound setMeetingId(event): void {
    this.meetingID = event.target.value
  }

  @action.bound setPasscode(event): void {
    this.passcode = event.target.value
  }

  @action.bound setJoinName(event): void {
    this.joinName = event.target.value
  }

  @action.bound setFullScreenToggle(event): void {
    this.disableFullScreenToggle = event.target.checked
  }

  @action.bound setFooterVisibility(event): void {
    this.hideMeetingFooter = event.target.checked
  }

  @action.bound setChatPanelVisibility(event): void {
    this.hideChatPanel = event.target.checked
  }

  @action.bound setAppsPanelVisibility(event): void {
    this.hideAppsPanel = event.target.checked
  }

  @action.bound setMeetingControlLockState(event): void {
    this.lockMeetingControls = event.target.checked
  }

  @action.bound setCopyLinkVisibility(event): void {
    this.hideCopyLink = event.target.checked
  }

  @action.bound setRatingScreenVisibility(event): void {
    this.hideRatingScreen = event.target.checked
  }

  @action.bound setDisableAppPitch(event): void {
    this.disableAppPitches = event.target.checked
  }

  @action.bound setShouldHideOtherJoinOptions(event): void {
    this.hideOtherJoinOptions = event.target.checked
  }

  @action.bound setBackgroundColor(event): void {
    this.backgroundColor = event.target.value
  }

  @action.bound setMeetingContainerWidth(event): void {
    this.meetingContainerWidth = event.target.value
  }

  @action.bound setMeetingContainerHeight(event): void {
    this.meetingContainerHeight = event.target.value
  }

  @action.bound setMeetingContainerRef(event): void {
    this.meetingContainerRef = event.target.value
  }

  @action.bound joinMeeting(): void {
    this.appManager.setJoiningMeeting(true)
    this.appManager.setJoinProps(this.joinprops)
    this.embedSDKManager.joinMeeting(this.joinprops)
  }

  @action.bound setAudioTileColor(event): void {
    this.customInMeetingBGConfig.audioTileColor = event.target.value
  }

  @action.bound setContainerColorOfAllTiles(event): void {
    this.customInMeetingBGConfig.containerColorOfAllTiles = event.target.value
  }

  @action.bound setMobileEmbed(event): void {
    this.isMobileEmbed = event.target.checked
  }

  @action.bound setTeleHealthLogo(event): void {
    this.teleHealthConfig['logo'] = event.target.value
  }

  @action.bound setTeleHealthWhiteLogo(event): void {
    this.teleHealthConfig['whiteLogo'] = event.target.value
  }

  @action.bound setTeleHealthBackground(event): void {
    this.teleHealthConfig['backgroundColor'] = event.target.value
  }

  @action.bound setTeleHealthWelcomeText(event): void {
    this.teleHealthConfig['welcomeText'] = event.target.value
  }

  @action.bound setTeleHealthWaitingText(event): void {
    this.teleHealthConfig['waitingText'] = event.target.value
  }

  @action.bound setTeleHealthBackgroundColor(event): void {
    this.teleHealthConfig['backgroundColor'] = event.target.value
  }

  @action.bound setTeleHealthProviderName(event): void {
    this.teleHealthConfig['providerName'] = event.target.value
  }

  @action.bound setExternalID(event): void {
    this.externalID = event.target.value
  }

  @action.bound setTeleHealthProviderImage(event): void {
    this.teleHealthConfig['providerImage'] = event.target.value
  }

  @action.bound setTeleHealthProviderTitle(event): void {
    this.teleHealthConfig['providerTitle'] = event.target.value
  }

  @action.bound setTeleHealthSkipCheckIn(event): void {
    this.teleHealthConfig.skipCheckIn = event.target.checked
  }

  @action.bound addTelehealthArticle(event): void {
    event.preventDefault()
    const formData = new FormData(event.target)
    const article = Object.fromEntries(formData)

    if (!this.teleHealthConfig.resources) {
      this.teleHealthConfig = {
        ...this.teleHealthConfig,
        resources: { articles: { data: [article] } },
      }
    } else if (!this.teleHealthConfig.resources?.articles?.data?.length) {
      extendObservable(this.teleHealthConfig.resources, {
        articles: { data: [article] },
      })
    } else {
      this.teleHealthConfig.resources.articles.data.push(article)
    }
    event.target.reset()
  }

  @action.bound addTelehealthVideo(event): void {
    event.preventDefault()
    const formData = new FormData(event.target)
    const video = Object.fromEntries(formData)

    if (!this.teleHealthConfig.resources) {
      this.teleHealthConfig = {
        ...this.teleHealthConfig,
        resources: { videos: { data: [video] } },
      }
    } else if (!this.teleHealthConfig.resources?.videos?.data?.length) {
      extendObservable(this.teleHealthConfig.resources, {
        videos: { data: [video] },
      })
    } else {
      this.teleHealthConfig.resources.videos.data.push(video)
    }
    event.target.reset()
  }

  @action.bound toggleShowTHCustomisationOptions(): void {
    this.showTHCustomisationOptions = !this.showTHCustomisationOptions
  }

  private get joinprops(): JoinProps {
    return {
      meetingInfo: this.meetingInfo,
      iFrameProps: this.iFrameProps,
      uiProps: this.uiProps,
    }
  }

  private get meetingInfo(): MeetingInfo {
    return {
      meetingId: this.meetingID,
      passcode: this.passcode,
      name: this.joinName,
      eid: this.externalID,
      meetingOrigin: this.meetingOrigin
    }
  }

  private get uiProps(): UIProps {
    let locale = {}
    if (this.appLocale) {
      locale = { locale: this.appLocale }
    }
    return {
      disableFullScreenToggle: this.disableFullScreenToggle,
      hideFooter: this.hideMeetingFooter,
      hideChatPanel: this.hideChatPanel,
      hideAppsPanel: this.hideAppsPanel,
      lockMeetingControls: this.lockMeetingControls,
      hideCopyLink: this.hideCopyLink,
      hideRatingScreen: this.hideRatingScreen,
      hideAppPitches: this.disableAppPitches,
      customBackground: this.backgroundColor,
      hideOtherJoinOptions: this.hideOtherJoinOptions,
      inMeetingBGConfig: this.customInMeetingBGConfig,
      teleHealthConfig: this.teleHealthConfig,
      ...locale,
    }
  }

  private get iFrameProps(): IFrameProps {
    return {
      width: this.meetingContainerWidth,
      height: this.meetingContainerHeight,
      selectorId: this.meetingContainerRef,
    }
  }

  get availableLocales(): { id: Locale; name: Locale }[] {
    let options = []
    options.push({ id: ' ', name: this.localeName(' ') })
    for (const locale in Locale) {
      options.push({
        id: Locale[locale],
        name: this.localeName(Locale[locale]),
      })
    }
    return options
  }

  localeName(locale): string {
    switch (locale) {
      case Locale.EN:
        return 'English'
      case Locale.ES:
        return 'Spanish'
      case Locale.DE:
        return 'German'
      case Locale.FR:
        return 'French'
      case Locale.JA:
        return 'Japanese'
      default:
        return ' '
    }
  }

  @action.bound setAppLocale(locale: { id: Locale; name: Locale }) {
    this.appLocale = locale.id
  }

  @action.bound joinMeetingWithParams(): void {
    let urlEncoded: string = window.location.href
    let url: string = decodeURIComponent(urlEncoded)
    if (url.indexOf('?') > 0) {
      let queryIndex = url.indexOf('?')
      let query: string = url.slice(queryIndex)
      let meetingID: string = ''
      let passcode: string = ''
      let joinName: string = ''
      let meetingOrigin: string = ''
      let queryList: string[] = query.slice(1).split('&')
      for (let i = 0; i < queryList.length; i++) {
        let queryElem: string = queryList[i]
        if (queryElem.indexOf('meetingID=') > -1) {
          meetingID = queryElem.slice(queryElem.indexOf('meetingID=') + 10)
        } else if (queryElem.indexOf('passcode=') > -1) {
          passcode = queryElem.slice(queryElem.indexOf('passcode=') + 9)
        } else if (queryElem.indexOf('joinName=') > -1) {
          joinName = queryElem.slice(queryElem.indexOf('joinName=') + 9)
        } else if (queryElem.indexOf('env=') > -1) {
          meetingOrigin = queryElem.slice(queryElem.indexOf('env=') + 4)
        }
      }
      window.history.replaceState(
        {},
        window.document.title,
        location.href.slice(0, window.location.href.indexOf('?')),
      )
      this.meetingID = meetingID;
      this.passcode = passcode;
      this.joinName = joinName;
      this.meetingOrigin = meetingOrigin;
      if (meetingID) {
          this.joinMeeting()
      }
    }
  }
}
