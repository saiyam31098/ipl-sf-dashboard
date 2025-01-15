import { LightningElement, wire } from 'lwc';
import { subscribe, MessageContext, unsubscribe, APPLICATION_SCOPE } from 'lightning/messageService';
import fetchCricketData from '@salesforce/apex/IplController.fetchCricketData';
import MSG_SERVICE from '@salesforce/messageChannel/Record_Selected__c';

export default class IplAllTimeLeadersByCategory extends LightningElement {
    @wire(MessageContext)
    messageContext;
    heading;
    fileName;
    subscription;

    @wire(fetchCricketData, {
        fileName:'$fileName'
    })leadersByCategoryHandler({ data, error}) {
        if(data) {
            console.log('leadersByCategoryHandler data: ', data);
        }
        if(error) {
            console.error('leadersByCategoryHandler error: ', error);
        }
    }

    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    subscribeToMessageChannel() {
        //subscribe(messageContext, messageChannel, listener, subscriberOptions)
        if (!this.subscription) {
          this.subscription = subscribe(
            this.messageContext,
            MSG_SERVICE,
            (message) => this.handleMessage(message),
            { scope: APPLICATION_SCOPE },
          );
        }
    }

    handleMessage(message) {
        console.log("Message ", message);
        this.heading = `TOP 5 ${message.fileName.title} OF ALL TIME`;
        this.fileName = message.fileName.filename + '.json';
    }

    disconnectedCallback() {
        this.unsubscribeToMessageChannel();
    }

    unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }
}