import { LightningElement, wire } from 'lwc';
import {loadStyle} from 'lightning/platformResourceLoader';
import fetchCricketData from '@salesforce/apex/IplController.fetchCricketData';
import IPL_Winners from '@salesforce/resourceUrl/IPL_Winners';
import iplGlobalStyle from '@salesforce/resourceUrl/iplGlobalStyle';
import winner2024 from '@salesforce/resourceUrl/winner2024'

export default class IplBanner extends LightningElement {

    fileName = 'ipl2024stats.json';
    winner = winner2024;
    carouselList = [];
    ipl2024StatsResponse = [];
    leftStats = [];
    rightStats = [];

    @wire(fetchCricketData, {
        fileName: '$fileName'
    })ipl2024StatsHandler({data, error}) {
        if(data) {
            console.log('ipl2024StatsHandler data: ', data);
            let parsedData = JSON.parse(data);
            this.ipl2024StatsResponse = parsedData.stats;
            const half = Math.ceil(this.ipl2024StatsResponse.length/2);

            this.leftStats = this.ipl2024StatsResponse.slice(0, half);
            this.rightStats = this.ipl2024StatsResponse.slice(half);
        } 
        if(error) {
            console.error('ipl2024StatsHandler error: ', error);
        } 
    }

    connectedCallback() {
        this.onLoadStyleMethod();
        this.generateCarouselList();
    }

    onLoadStyleMethod() {
        loadStyle(this, iplGlobalStyle).then(()=>{
            console.log('iplGlobalStyle loaded');
        }).catch(error=>{
            console.error('iplGlobalStyle load error ', error);
        })
    }

    generateCarouselList() {
        for(let i = 2008; i<2024; i++) {
            let url = `${IPL_Winners}/IPL_Winners/${i}.png`;
            let year = i;
            let altText = `Winners of season ${i}`;
            this.carouselList.push({url, year, altText});
        }
    }
}