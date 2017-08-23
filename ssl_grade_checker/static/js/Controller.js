var ctrl = {
    getDomains: function() {
        return Model.domains;
    },

    init: function() {
        Model.init();
        Model.currentPage = Model.pages[0];
        NavView.render();
        PageView.renderPage();
        AnalyzeDomainView.bindAnalyzeButton('analyzeButton');
    },

    getCurrentPage: function() {
        return Model.currentPage;
    },

    getPages: function() {
        return Model.pages;
    },

    setCurrentPage: function(page) {
        Model.currentPage = page;
    },

    reloadDomainLists: function() {
        DomainListView.renderDomainList("domainTableBody");
        DomainListView.renderConfigTable("domainConfigTableBody");
    },

    StartDomainAnalyze: function(domain_name) {        

        
    },

    checkAnalyzeProgress: function(response) {
        var self = this;
        Model.CurrentAnalyzeStatus = JSON.parse(response);
        if (Model.AnayzeStatus.status == "READY") {
            return AnayzeStatus.grade;
        }
        else if (Model.AnayzeStatus.status == "DNS" ) {
            console.log('Status is DNS');
            self.checkAnalyzeProgress(AnayzeStatus.host);
        }
    }
};