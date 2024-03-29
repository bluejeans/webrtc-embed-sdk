import styled from 'styled-components'

export const TextBox = styled.input`
  width: 200px;
  margin: 8px;
  padding: 8px;
  border-radius: 4px;
`

export const IFrameHolder = styled<any, any>('div')`
  right: 20px;
  width: 80%;
  height: 80%;
  display: ${(props) => (props.show ? 'block' : 'none')};
`

export const JoiningMessage = styled.div`
  width: 300px;
  text-align: center;
  margin-top: 250px;
  font-size: 26px;
  font-style: italic;
  white-space: pre-wrap;
`

export const BuildInfo = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  font-size: 14px;
  color: transparent;

  @media only screen and (max-width: 768px) {
    position: initial;
    transform: none;
  }
`
