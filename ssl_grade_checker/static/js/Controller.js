var ctrl = {
    getDomains: function() {
        return Model.domains;
    },

    init: function() {
        Model.init();
        Model.currentPage = Model.pages[0];
        NavView.render();
        PageView.renderPage();
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
    }
};