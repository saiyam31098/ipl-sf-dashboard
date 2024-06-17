public with sharing class IplController {
    public IplController() {

    }

    //Base URL Constant
    private static final String BASE_URL = 'https://raw.githubusercontent.com/karkranikhil/responses/main/';

    @AuraEnabled(cacheable=true)
    public static String fetchCricketData(String fileName) {
        Http http = new Http();
        HttpRequest request = new HttpRequest();

        //setting up the request

        request.setEndpoint(BASE_URL+fileName);
        request.setMethod('GET');

        try {
            HttpResponse response = http.send(request);
            if(response.getStatusCode() == 200) {
                return response.getBody();
            } else {
                String errorMsg = 'Failed to fetch data. HTTP Status is: ' + response.getStatusCode();
                System.debug('Error: '+ errorMsg);
                throw new AuraHandledException(errorMsg);
            }
        } catch(Exception e) {
            String errorMsg = 'Exception Occurred while fetching data: ' + e.getMessage();
            System.debug('Error: '+ errorMsg);
            throw new AuraHandledException(errorMsg);
        }
    }
}