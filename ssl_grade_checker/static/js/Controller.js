var ctrl = {
    getDomains: function() {
        return Model.domains;
    },

    init: function() {
        Model.currentPage = Model.pages[0];
        DomainListView.render();
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
    }
};