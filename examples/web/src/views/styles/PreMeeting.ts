import styled from 'styled-components';
import { TextBox } from './Common';

const ArrowRight = `{
    display: inline-block;
    width: 0; 
    height: 0; 
    margin-top: 3px;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 5px solid black;
}`;

const ArrowDown = `{
    display: inline-block;
    width: 0; 
    height: 0; 
    margin-top: 6px;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid black;
}`;

export const ViewContainer = styled.div`
    margin: auto;
    text-align: center;
`

export const GreetingsHeader = styled.div`
    font-size: 36px;
    margin: 8px;
`

export const GreetingsSubHeader = styled.div`
    font-size: 24px;
    margin: 16px;
    font-family: cursive;
`

export const MeetingInfoContainer = styled.div`
    width: fit-content;
    margin: auto;
    display: inline-block;
`

export const MeetingID = styled(TextBox)`
`

export const Passcode = styled(TextBox)`
`

export const JoinName = styled(TextBox)`
`

export const JoinButton = styled.button`
    width: 232px;
    display: block;
    margin: 36px auto;
    padding: 8px;
    border-radius: 4px;
    background: black;
    color: white;
    font-size: 18px;
    font-weight: bolder;
    cursor: pointer;
`

export const UIOptionsContainer = styled.table`
    text-align: left;
    margin-top: 8px;
    background: lightgray;
    padding: 10px;
    width: 100%;
`

export const UIOptions = styled.tbody`
    width: 100%;
`

export const OptionsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
`

export const OptionsHeader = styled.span`
    display: block;
    text-align: left;
    font-weight: bolder;
`

export const THOptionsHeader = styled<any, any>("OptionsHeader")`
    display: inline-block;
    margin-left: 10px;
`

export const THOptionsWrapper = styled.div`
    display: flex;
    width: fit-content;
    font-weight: bolder;
    justify-content: flex-start;
    margin-top: 30px;
    cursor: pointer
`

export const OptionsData = styled.td`
    min-width: 300px;
    padding: 5px;
`

export const CheckBox = styled.input`
`

export const InputBox = styled.input`
    width: 100%;
    height: 25px;
`

export const BGOptionContainer = styled.div`
    background: lightgray;
    padding: 10px;
`

export const BGColorTextLabel : any = styled<any, any>("span")`
    ${props => props.customStyle}
`

export const BGColorTextBox = styled(TextBox)`
    width: 400px;
    margin: 10px;
`

export const BGColorHint = styled.span`
    font-size: 10px
    font-weight: bold;
    display: block;
`

export const IFramePropsContainer = styled.div`
    width: 100%;
    margin: auto;
`

export const IFrameLabel = styled.span`
    display: block;
    text-align: left;
    font-weight: bolder;
    margin-top: 30px;
    margin-bottom: 10px;
`

export const IFrameProps = styled.div`
    background: darkgray;
    text-align: left;
    padding: 8px;
`

export const PropsSpecs = styled.input`
    display: inline-block;
    width: 200px;
`

export const PropsHint = styled.span`
    display: inline-block;
    font-size: 12px;
    font-style: italic;
    font-weight: 600;
    margin-left: 12px;
`
export const MeetingDeviceDropdown = styled.select`
    width: 180px;
    display: block;
    padding: 4px;
    margin: 8px auto;
    border-radius: 4px;
    background: white;
    color: black;
    font-size: 14px;
`
export const THWorkFlow = styled.ul`
    display: flex;
    justify-content: space-around;
`
export const Circle = styled.li`
    width: 8em;
    height: 8em;
    text-align: center;
    line-height: 3em;
    border-radius: 4em;
    background: cadetblue; 
    margin: 0 1em;
    display: inline-block;
    color: white;
    position: relative;
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    &::before{
        content: '';
        position: absolute;
        top: 4em;
        left: 8em;
        width: 11em;
        height: .2em;
        background: cadetblue;
        z-index: 44;
    }

    &:last-child::before {
      display: none;
    }

    .active {
        background: dodgerblue;
    }

    .active ~ li {
        background: lightblue;
    }
      
    .active ~ li::before {
        background: lightblue;
    }
`
export const SubLabel = styled.label`
    color: cadetblue;
`

export const LabelContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

export const THResourceContainer = styled.div`
    display: flex;
    flex-direction: row-reverse;
    > * {
        flex: 1;
    }
`
export const THResourceForm = styled.form`
    display: flex;
    flex-direction: column;
    > * {
        margin: 10px 0;
    }
    label {
        margin-top: 10px;
    }
`
export const THResourceJsonSection = styled.details`
    padding: 10px;
    background: aliceblue;
    summary {
        cursor: pointer;
    }
`

export const Arrow = styled<any, any>("div")`
  ${props => props.closed ? ArrowRight : ArrowDown}
`