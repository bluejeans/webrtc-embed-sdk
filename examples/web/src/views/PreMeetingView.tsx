import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { toJS } from 'mobx'
import Managers from '../stores/Managers'
import {
  ViewContainer,
  GreetingsHeader,
  GreetingsSubHeader,
  MeetingInfoContainer,
  MeetingID,
  Passcode,
  JoinName,
  JoinButton,
  UIOptionsContainer,
  UIOptions,
  OptionsWrapper,
  OptionsHeader,
  OptionsData,
  CheckBox,
  InputBox,
  BGOptionContainer,
  BGColorTextLabel,
  BGColorTextBox,
  BGColorHint,
  IFramePropsContainer,
  IFrameLabel,
  IFrameProps,
  PropsSpecs,
  PropsHint,
  THWorkFlow,
  Circle,
  SubLabel,
  LabelContainer,
  THResourceContainer,
  THResourceForm,
  THResourceJsonSection,
  MeetingDeviceDropdown,
  Arrow,
  THOptionsHeader,
  THOptionsWrapper,
  ExternalID,
} from './styles/PreMeeting'
import PreMeetingViewModel from './PreMeetingViewModel'

interface Props {
  managers: Managers
}

@observer
export default class PreMeetingView extends Component<Props> {
  private managers: Managers
  private viewmodel: PreMeetingViewModel

  constructor(props: Props) {
    super(props)
    this.viewmodel = new PreMeetingViewModel(props.managers)
  }

  makeDropdown<T>(
    selectedItem: T | null,
    items: T[],
    idProp: keyof T,
    displayProp: keyof T,
    onSelect: (T) => void,
  ): JSX.Element {
    const doSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newValue = items.find((item) => item[idProp] + '' == e.target.value)
      onSelect(newValue)
    }
    return selectedItem ? (
      <MeetingDeviceDropdown
        value={selectedItem[idProp] + ''}
        onChange={doSelect}
      >
        {items?.map((item) => {
          return (
            <option key={item[idProp] + ''} value={item[idProp] + ''}>
              {item[displayProp] + ''}
            </option>
          )
        })}
      </MeetingDeviceDropdown>
    ) : (
      <></>
    )
  }
  componentDidMount(): void {
      this.viewmodel.joinMeetingWithParams()
  }

  render() {
    const thArticlesCount =
      this.viewmodel.teleHealthConfig.resources?.articles?.data?.length || 0
    const thVideosCount =
      this.viewmodel.teleHealthConfig.resources?.videos?.data?.length || 0
    return (
      <ViewContainer>
        <GreetingsHeader>Welcome!</GreetingsHeader>
        <GreetingsSubHeader>
          Sample for BlueJeans meeting in Embed mode
        </GreetingsSubHeader>
        <MeetingInfoContainer>
          <MeetingID
            placeholder={'Meeting ID'}
            value={this.viewmodel.meetingID}
            onChange={this.viewmodel.setMeetingId}
          />
          <br />
          <Passcode
            placeholder={'Passcode(optional)'}
            value={this.viewmodel.passcode}
            onChange={this.viewmodel.setPasscode}
          />
          <br />
          <JoinName
            placeholder={'Name'}
            value={this.viewmodel.joinName}
            onChange={this.viewmodel.setJoinName}
          />
          <br />
          <ExternalID
            placeholder={'External ID(optional)'}
            value={this.viewmodel.externalID}
            onChange={this.viewmodel.setExternalID}
          />
          <br />
          <>
            <OptionsWrapper>
              <OptionsHeader>UI customisation(Optional)</OptionsHeader>
              <OptionsData>
                <CheckBox
                  type='checkbox'
                  checked={this.viewmodel.isMobileEmbed}
                  onChange={this.viewmodel.setMobileEmbed}
                />
                <label>Mobile Embed</label>
              </OptionsData>
            </OptionsWrapper>

            <UIOptionsContainer>
              {!this.viewmodel.isMobileEmbed ? (
                <UIOptions>
                  <tr>
                    <OptionsData>
                      <CheckBox
                        type='checkbox'
                        checked={this.viewmodel.disableFullScreenToggle}
                        onChange={this.viewmodel.setFullScreenToggle}
                      />
                      <label>Disable Full Screen Toggle</label>
                    </OptionsData>
                    <OptionsData>
                      <CheckBox
                        type='checkbox'
                        checked={this.viewmodel.hideMeetingFooter}
                        onChange={this.viewmodel.setFooterVisibility}
                      />
                      <label>Hide Meeting Footer</label>
                    </OptionsData>
                    <OptionsData>
                      <CheckBox
                        type='checkbox'
                        checked={this.viewmodel.hideChatPanel}
                        onChange={this.viewmodel.setChatPanelVisibility}
                      />
                      <label>Hide Chat Panel</label>
                    </OptionsData>
                  </tr>
                  <tr>
                    <OptionsData>
                      <CheckBox
                        type='checkbox'
                        checked={this.viewmodel.hideAppsPanel}
                        onChange={this.viewmodel.setAppsPanelVisibility}
                      />
                      <label>Hide Apps Panel</label>
                    </OptionsData>
                    <OptionsData>
                      <CheckBox
                        type='checkbox'
                        checked={this.viewmodel.lockMeetingControls}
                        onChange={this.viewmodel.setMeetingControlLockState}
                      />
                      <label>Lock meeting controls</label>
                    </OptionsData>
                    <OptionsData>
                      <CheckBox
                        type='checkbox'
                        checked={this.viewmodel.hideCopyLink}
                        onChange={this.viewmodel.setCopyLinkVisibility}
                      />
                      <label>Hide Copy link</label>
                    </OptionsData>
                  </tr>
                  <tr>
                    <OptionsData>
                      <CheckBox
                        type='checkbox'
                        checked={this.viewmodel.hideRatingScreen}
                        onChange={this.viewmodel.setRatingScreenVisibility}
                      />
                      <label>Disable Meeting Rating screens</label>
                    </OptionsData>
                    <OptionsData>
                      <CheckBox
                        type='checkbox'
                        checked={this.viewmodel.disableAppPitches}
                        onChange={this.viewmodel.setDisableAppPitch}
                      />
                      <label>Disable app pitches</label>
                    </OptionsData>
                    <OptionsData>
                      <CheckBox
                        type='checkbox'
                        checked={this.viewmodel.hideOtherJoinOptions}
                        onChange={this.viewmodel.setShouldHideOtherJoinOptions}
                      />
                      <label>Hide other join options</label>
                    </OptionsData>
                  </tr>
                </UIOptions>
              ) : (
                <UIOptions>
                  <tr>
                    <OptionsData>
                      <CheckBox
                        type='checkbox'
                        checked={this.viewmodel.hideChatPanel}
                        onChange={this.viewmodel.setChatPanelVisibility}
                      />
                      <label>Hide Chat Panel</label>
                    </OptionsData>
                    <OptionsData>
                      <CheckBox
                        type='checkbox'
                        checked={this.viewmodel.lockMeetingControls}
                        onChange={this.viewmodel.setMeetingControlLockState}
                      />
                      <label>Lock meeting controls</label>
                    </OptionsData>
                    <OptionsData>
                      <CheckBox
                        type='checkbox'
                        checked={this.viewmodel.hideRatingScreen}
                        onChange={this.viewmodel.setRatingScreenVisibility}
                      />
                      <label>Disable Meeting Rating screens</label>
                    </OptionsData>
                  </tr>
                  <tr>
                    <OptionsData>
                      <CheckBox
                        type='checkbox'
                        checked={this.viewmodel.hideCopyLink}
                        onChange={this.viewmodel.setCopyLinkVisibility}
                      />
                      <label>Hide Copy link</label>
                    </OptionsData>
                  </tr>
                </UIOptions>
              )}
            </UIOptionsContainer>

            <>
              <OptionsWrapper>
                <OptionsHeader>
                  Theme selection (*Optional, will be ignored if Telehealth PLE
                  customisations are set)
                </OptionsHeader>
              </OptionsWrapper>

              <BGOptionContainer>
                <BGColorTextLabel customStyle={'margin-left : 70px;'}>
                  Background Color :
                </BGColorTextLabel>
                <BGColorTextBox
                  placeholder='#FFFFFF or linear-gradient(#6600CC, #6600FF)'
                  value={this.viewmodel.backgroundColor}
                  onChange={this.viewmodel.setBackgroundColor}
                />
                <BGColorHint>
                  Supported format : #FFFFFF (or) linear-gradient(#6600CC,
                  #6600FF)
                </BGColorHint>
              </BGOptionContainer>

              <BGOptionContainer>
                <BGColorTextLabel customStyle={'margin-left : 90px;'}>
                  AudioTile Color :
                </BGColorTextLabel>
                <BGColorTextBox
                  placeholder='#FFFFFF or linear-gradient(#6600CC, #6600FF)'
                  value={this.viewmodel.customInMeetingBGConfig.audioTileColor}
                  onChange={this.viewmodel.setAudioTileColor}
                />
                <BGColorHint>
                  Supported format : #FFFFFF (or) linear-gradient(#6600CC,
                  #6600FF)
                </BGColorHint>
              </BGOptionContainer>

              <BGOptionContainer>
                <BGColorTextLabel>
                  Color for container of all tiles :
                </BGColorTextLabel>
                <BGColorTextBox
                  placeholder='#FFFFFF or linear-gradient(#6600CC, #6600FF)'
                  value={
                    this.viewmodel.customInMeetingBGConfig
                      .containerColorOfAllTiles
                  }
                  onChange={this.viewmodel.setContainerColorOfAllTiles}
                />
                <BGColorHint>
                  Supported format : #FFFFFF (or) linear-gradient(#6600CC,
                  #6600FF)
                </BGColorHint>
              </BGOptionContainer>
            </>

            <BGOptionContainer>
              <BGColorTextLabel>Locale :</BGColorTextLabel>
              {this.makeDropdown(
                {
                  id: this.viewmodel.appLocale,
                  name: this.viewmodel.localeName(this.viewmodel.appLocale),
                },
                this.viewmodel.availableLocales,
                'id',
                'name',
                this.viewmodel.setAppLocale,
              )}
            </BGOptionContainer>

            <IFramePropsContainer>
              <IFrameLabel>
                Meeting container specifications(Optional)
              </IFrameLabel>
              <IFrameProps>
                <PropsSpecs
                  placeholder='Width'
                  value={this.viewmodel.meetingContainerWidth}
                  onChange={this.viewmodel.setMeetingContainerWidth}
                />
                <PropsHint>Default 100%, Example : 100% (or) 300px</PropsHint>
              </IFrameProps>
              <IFrameProps>
                <PropsSpecs
                  placeholder='Height'
                  value={this.viewmodel.meetingContainerHeight}
                  onChange={this.viewmodel.setMeetingContainerHeight}
                />
                <PropsHint>Default 100%, Example : 100% (or) 300px</PropsHint>
              </IFrameProps>
              <IFrameProps>
                <PropsSpecs
                  placeholder='Container'
                  value={this.viewmodel.meetingContainerRef}
                  onChange={this.viewmodel.setMeetingContainerRef}
                />
                <PropsHint>
                  Default: Attach to the body, Example : #iframeContainer (or)
                  .iframeContainer
                </PropsHint>
              </IFrameProps>
            </IFramePropsContainer>
          </>

          <THOptionsWrapper
            onClick={this.viewmodel.toggleShowTHCustomisationOptions}
          >
            <Arrow closed={!this.viewmodel.showTHCustomisationOptions} />
            <THOptionsHeader>
              TeleHealth PLE customisation (Optional)
            </THOptionsHeader>
          </THOptionsWrapper>

          {this.viewmodel.showTHCustomisationOptions && (
            <>
              <UIOptionsContainer>
                Workflow:
                <THWorkFlow>
                  <Circle>Landing</Circle>

                  <Circle>
                    CheckIn
                    <div>
                      <CheckBox
                        type='checkbox'
                        checked={this.viewmodel.teleHealthConfig?.skipCheckIn}
                        onChange={this.viewmodel.setTeleHealthSkipCheckIn}
                      />
                      <label>Skip</label>
                    </div>
                  </Circle>

                  <Circle>Waiting</Circle>
                </THWorkFlow>
                <UIOptions>
                  <tr>
                    <OptionsData>
                      {this.viewmodel.isMobileEmbed ? (
                        <>
                          <LabelContainer>
                            <label>
                              Logo URL (Image must be transparent):{' '}
                            </label>
                            <SubLabel>
                              {' '}
                              *Visible only on landing screen
                            </SubLabel>
                          </LabelContainer>
                          <InputBox
                            type='text'
                            placeholder='https://example.com/src/image.png'
                            value={this.viewmodel.teleHealthConfig?.whiteLogo}
                            onChange={this.viewmodel.setTeleHealthWhiteLogo}
                          />
                        </>
                      ) : (
                        <>
                          <>
                            <LabelContainer>
                              <label>Logo URL: </label>
                              <SubLabel>
                                {' '}
                                *Visible only on landing screen
                              </SubLabel>
                            </LabelContainer>
                            <InputBox
                              type='text'
                              placeholder='https://example.com/src/image.png'
                              value={this.viewmodel.teleHealthConfig?.logo}
                              onChange={this.viewmodel.setTeleHealthLogo}
                            />
                          </>

                          <>
                            <LabelContainer>
                              <label>
                                White Logo URL (Image must be transparent):{' '}
                              </label>
                              <SubLabel>
                                {' '}
                                *Visible only on landing screen
                              </SubLabel>
                            </LabelContainer>
                            <InputBox
                              type='text'
                              placeholder='https://example.com/src/image.png'
                              value={this.viewmodel.teleHealthConfig?.whiteLogo}
                              onChange={this.viewmodel.setTeleHealthWhiteLogo}
                            />
                          </>
                        </>
                      )}
                    </OptionsData>
                  </tr>

                  <tr>
                    <OptionsData>
                      <>
                        <LabelContainer>
                          <label>Custom Background: </label>
                          <SubLabel>
                            {' '}
                            *Custom background for entire entire app in
                            televisit
                          </SubLabel>
                        </LabelContainer>
                        <InputBox
                          type='text'
                          placeholder='#FFFFFF or linear-gradient(#6600CC, #6600FF)'
                          value={
                            this.viewmodel.teleHealthConfig?.backgroundColor
                          }
                          onChange={this.viewmodel.setTeleHealthBackground}
                        />
                      </>
                      <LabelContainer>
                        <label>Welcome message: </label>
                        <SubLabel> * Visible only on landing screen</SubLabel>
                      </LabelContainer>

                      <InputBox
                        type='text'
                        placeholder='Enter welcome message'
                        value={this.viewmodel.teleHealthConfig?.welcomeText}
                        onChange={this.viewmodel.setTeleHealthWelcomeText}
                      />
                    </OptionsData>
                  </tr>

                  <tr>
                    <OptionsData>
                      <LabelContainer>
                        <label>Waiting message: </label>
                        <SubLabel> * Visible only on waiting screen</SubLabel>
                      </LabelContainer>
                      <InputBox
                        type='text'
                        value={this.viewmodel.teleHealthConfig?.waitingText}
                        onChange={this.viewmodel.setTeleHealthWaitingText}
                        placeholder='Enter waiting message'
                      />
                    </OptionsData>
                  </tr>

                  {/* <tr>
                                    <OptionsData>
                                        <label>Background Color: </label>
                                        <InputBox
                                            type="text"
                                            placeholder="#FFFFFF or linear-gradient(#6600CC, #6600FF)"
                                            value={ this.viewmodel.teleHealthConfig?.backgroundColor }
                                            onChange={ this.viewmodel.setTeleHealthBackgroundColor } />
                                    </OptionsData>
                                </tr> */}

                  <tr>
                    <OptionsData>
                      <LabelContainer>
                        <label>Provider Name:</label>
                        <SubLabel> * Visible on all screens</SubLabel>
                      </LabelContainer>
                      <InputBox
                        type='text'
                        placeholder='Enter Provider Name'
                        value={this.viewmodel.teleHealthConfig?.providerName}
                        onChange={this.viewmodel.setTeleHealthProviderName}
                      />
                    </OptionsData>
                  </tr>

                  <tr>
                    <OptionsData>
                      <LabelContainer>
                        <label>Provider Title:</label>
                        <SubLabel> * Visible on all screens</SubLabel>
                      </LabelContainer>
                      <InputBox
                        type='text'
                        placeholder='Enter Provider Title'
                        value={this.viewmodel.teleHealthConfig?.providerTitle}
                        onChange={this.viewmodel.setTeleHealthProviderTitle}
                      />
                    </OptionsData>
                  </tr>

                  <tr>
                    <OptionsData>
                      <LabelContainer>
                        <label>Provider Image URL:</label>
                        <SubLabel> * Visible on all screens</SubLabel>
                      </LabelContainer>
                      <InputBox
                        type='text'
                        placeholder='https://example.com/src/image.png'
                        value={this.viewmodel.teleHealthConfig?.providerImage}
                        onChange={this.viewmodel.setTeleHealthProviderImage}
                      />
                    </OptionsData>
                  </tr>
                </UIOptions>
                <THResourceContainer>
                  <fieldset>
                    <legend>
                      <b>Article</b>
                    </legend>
                    <THResourceForm
                      onSubmit={this.viewmodel.addTelehealthArticle}
                    >
                      <div>
                        <label htmlFor='title'>Title: </label>
                        <InputBox
                          name='title'
                          type='text'
                          required
                          placeholder='Enter article title here'
                        />
                      </div>
                      <div>
                        <label htmlFor='thumbnailUrl'>Thumbnail URL: </label>
                        <InputBox
                          name='thumbnailUrl'
                          type='text'
                          required
                          placeholder='https://example.com/src/thumbnail.png'
                        />
                      </div>
                      <div>
                        <label htmlFor='url'>Document URL: </label>
                        <InputBox
                          name='url'
                          type='text'
                          required
                          placeholder='https://example.com/src/document.pdf'
                        />
                      </div>
                      <JoinButton type='submit'>Add Article</JoinButton>
                    </THResourceForm>
                  </fieldset>
                  <fieldset>
                    <legend>
                      <b>Video</b>
                    </legend>
                    <THResourceForm
                      onSubmit={this.viewmodel.addTelehealthVideo}
                    >
                      <div>
                        <label htmlFor='title'>Title: </label>
                        <InputBox
                          name='title'
                          type='text'
                          required
                          placeholder='Enter video title here'
                        />
                      </div>
                      <div>
                        <label htmlFor='thumbnailUrl'>Thumbnail URL: </label>
                        <InputBox
                          name='thumbnailUrl'
                          type='text'
                          required
                          placeholder='https://example.com/src/thumbnail.png'
                        />
                      </div>
                      <div>
                        <label htmlFor='url'>Video URL: </label>
                        <InputBox
                          name='url'
                          type='text'
                          required
                          placeholder='https://example.com/src/video.mp4'
                        />
                      </div>
                      <div>
                        <label htmlFor='url'>Duration: </label>
                        <InputBox
                          name='duration'
                          type='text'
                          required
                          placeholder='e.g. 20:10'
                        />
                      </div>
                      <JoinButton type='submit'>Add Video</JoinButton>
                    </THResourceForm>
                  </fieldset>
                </THResourceContainer>
              </UIOptionsContainer>
              <THResourceJsonSection style={{ textAlign: 'initial' }}>
                <summary>
                  TeleHealth resources ({' '}
                  {`Videos : ${thVideosCount} | Articles : ${thArticlesCount}`}{' '}
                  )
                </summary>
                <pre>
                  {JSON.stringify(
                    toJS(this.viewmodel.teleHealthConfig.resources),
                    undefined,
                    2,
                  )}
                </pre>
              </THResourceJsonSection>
            </>
          )}
        </MeetingInfoContainer>
        <JoinButton onClick={this.viewmodel.joinMeeting}>
          Join Meeting
        </JoinButton>
      </ViewContainer>
    )
  }
}
