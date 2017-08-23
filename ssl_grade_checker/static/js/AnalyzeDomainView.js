var AnalyzeDomainView = {
    bindAnalyzeButton: function(buttonID) {
        var button = document.getElementById(buttonID);        
        button.addEventListener('click', function() {
            domain_name = document.getElementById("add-domain-name").value;
            ctrl.StartDomainAnalyze(domain_name);

        });
    }
};