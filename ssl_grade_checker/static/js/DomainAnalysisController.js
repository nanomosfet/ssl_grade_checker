var DomainAnalysisController = {
    startAnalysis: function(domain_name) {
        this.AnalysisLoop(domain_name);
        
    },

    AnalysisLoop: function(domain_name) {
        var self = this;
        // Check Model what the status of the current analysis if it is going on
        currentAnalysis = Model.CurrentAnalysis;
        if(!currentAnalysis) {
            Model.getDomainSSL(domain_name).then(function(response) {
                console.log('Starting Analysis');
                Model.CurrentAnalysis = JSON.parse(response);
                setTimeout(function() {
                    self.AnalysisLoop(domain_name);
                }, 5000);
            }, function(error) {
                console.error("Failed!", error);
            });
        }
        else if(currentAnalysis.status == "READY") {
            console.log("Analysis is complete!")
            Model.addDomainFromCurrentAnalysis();
            return true;
        }
        else if(currentAnalysis.status == "ERROR") {
            console.log("Error occured during analysis\nStatus Message is: "+currentAnalysis.statusMessage);
            return false;
        }
        else if(currentAnalysis.status == "DNS") {
            Model.getDomainSSL(domain_name).then(function(response) {
                Model.CurrentAnalysis = JSON.parse(response);
                console.log('Status is'+currentAnalysis.status);
                setTimeout(function() {
                    self.AnalysisLoop(domain_name);
                }, 5000);
                
            }, function(error) {
                console.error("Failed!", error);
            });
        }
        else if (currentAnalysis.status == "IN_PROGRESS"){
            Model.getDomainSSL(domain_name).then(function(response) {
                Model.CurrentAnalysis = JSON.parse(response);
                console.log('Status is'+currentAnalysis.status);
                AnalyzeDomainView.updateProgress();
                setTimeout(function() {
                    self.AnalysisLoop(domain_name);
                }, 5000);
                
            }, function(error) {
                console.error("Failed!", error);
            });
        }     
    },

    calculateCurrentPercent: function() {
        var numEndPoints = Model.CurrentAnalysis.endpoints.length;
        var percentSum = 0;

        for (var i = 0; i < numEndPoints; i++) {
            var endpointProgress = Model.CurrentAnalysis.endpoints[i].progress;
            if ((endpointProgress >= 0) && (endpointProgress <= 100)) {
                percentSum =  percentSum + endpointProgress;
            }

            if (endpointProgress  != 100) {
                break;
            }
        }

        return percentSum/(numEndPoints);
    }




}