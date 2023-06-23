import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { computed } from 'mobx'
import Managers from '../stores/Managers'
import { AppState } from '../stores/AppManager'
import PreMeetingView from './PreMeetingView'
import MeetingView from './MeetingView'
import JoiningView from './JoiningView'
import AppViewModel from './AppViewModel'
import { IFrameHolder, BuildInfo } from './styles/Common'

interface Props {
  managers: Managers
}

@observer
export default class SampleApp extends Component<Props> {
  private viewModel: AppViewModel

  constructor(props: Props) {
    super(props)
    this.viewModel = new AppViewModel(props.managers)
  }

  @computed private get viewToShow(): JSX.Element {
    switch (this.viewModel.appState) {
      case AppState.PRE_MEETING:
        return this.viewModel.joiningStarted ? (
          <JoiningView />
        ) : (
          <PreMeetingView managers={this.props.managers} />
        )
      case AppState.IN_MEETING:
        return <MeetingView managers={this.props.managers} />
    }
  }

  render() {
    return (
      <div style={{ width: '100vw', height: '100vh', margin: '30px' }}>
        <IFrameHolder
          className='iframeHolder'
          show={this.viewModel.showMeetingIframe}
        />
        {this.viewToShow}
        <BuildInfo>{`version : webrtc SDK - ${this.viewModel.buildInfo} `}</BuildInfo>
      </div>
    )
  }
}
