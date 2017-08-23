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
            console.log("Error occured during analysis\n Status Message is: "+currentAnalysis.statusMessage);
            return false;
        }
        else if(currentAnalysis.status == "DNS" || currentAnalysis.status == "IN_PROGRESS") {
            Model.getDomainSSL(domain_name).then(function(response) {
                Model.CurrentAnalysis = JSON.parse(response);
                setTimeout(function() {
                    self.AnalysisLoop(domain_name);
                }, 5000);
                console.log('Status is'+currentAnalysis.status);
            }, function(error) {
                console.error("Failed!", error);
            });
        }     
    }
}