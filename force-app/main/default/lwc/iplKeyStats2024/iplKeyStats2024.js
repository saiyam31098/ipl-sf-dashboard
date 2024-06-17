import { LightningElement, api } from 'lwc';
import IPL_Images_and_logos from '@salesforce/resourceUrl/IPL_Images_and_logos';

export default class IplKeyStats2024 extends LightningElement {
    @api keystatsvalue;

    get playerImage() {
        let name = this.keystatsvalue?.name?.replaceAll(' ', '');
        return `${IPL_Images_and_logos}/IPL_Images_and_logos/${name}.png`;
    }

    get bgClass() {
        let bgClassName = this.keystatsvalue?.category?.replaceAll(' ', '')+'__bg';
        return `slds-grid slds-wrap stats-box ${bgClassName}`;
    }
}