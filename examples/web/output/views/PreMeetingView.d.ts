import { Component } from 'react';
import Managers from '../stores/Managers';
interface Props {
    managers: Managers;
}
export default class PreMeetingView extends Component<Props> {
    private managers;
    private viewmodel;
    constructor(props: Props);
    makeDropdown<T>(selectedItem: T | null, items: T[], idProp: keyof T, displayProp: keyof T, onSelect: (T: any) => void): JSX.Element;
    render(): JSX.Element;
}
export {};
