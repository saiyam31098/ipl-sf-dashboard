import { LightningElement, wire } from 'lwc';
import fetchCricketData from '@salesforce/apex/IplController.fetchCricketData';
import IPL_Images_and_logos from '@salesforce/resourceUrl/IPL_Images_and_logos';
import { publish, MessageContext } from 'lightning/messageService';
import MSG_SERVICE from '@salesforce/messageChannel/Record_Selected__c';

const labelMap = {
    "MostRuns": "RUNS",
    "MostWickets": "WICKETS",
    "MostFours": "FOURS",
    "MostSixes": "SIXES",
    "HighestScore": "SCORE",
    "BestStrikeRate": "SR"
}

export default class IplAllTimeLeaders extends LightningElement {

    fileName = 'onAllTimeLeaders.json';
    allLeaders = [];

    @wire(MessageContext)
    messageContext;

    @wire(fetchCricketData, {
        fileName: '$fileName'
    })onAllTimeLeadersHandler({ data, error}) {
        if(data) {
            console.log('onAllTimeLeadersHandler data ', data);
            let parsedData = JSON.parse(data);
            const allLeaders = parsedData.allTimeLeaders;
            this.allLeaders = allLeaders.map(item => {
                let player_image = `${IPL_Images_and_logos}/IPL_Images_and_logos/${item.PLAYER_NAME.replaceAll(' ', '')}.png`;
                let team_logo = `${IPL_Images_and_logos}/IPL_Images_and_logos/${item.TEAM_CODE}.png`;
                const label = labelMap[item.KPIType]
                return {
                    ...item, player_image, team_logo, label
                }
            })
        }   
        if(error) {
            console.error('onAllTimeLeadersHandler error ', error);
        }
    }

    publishMessage(filename, title) {
        const payload = {
            fileName: {
                filename,
                title
            }
        }
        publish(this.messageContext, MSG_SERVICE, payload);
    }

    clickHandler(event) {
        const { filename, title } = event.target.dataset;
        this.publishMessage(filename, title);
    }
}