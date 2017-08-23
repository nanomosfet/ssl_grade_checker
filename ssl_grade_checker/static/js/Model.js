var Model = {
    init: function() {
        this.loadDomains();
    },

    domains: [],

    CurrentAnalyzeStatus: {},

    pages: ["SSL Status", "Settings"],

    currentPage: null,

    loadDomains: function() {
        var request = new XMLHttpRequest();
        var self = this;
        request.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var domains_JSON = JSON.parse(this.responseText);
                for(i = 0; i < domains_JSON.Domains.length; i++) {
                    self.domains.push({
                        id: domains_JSON.Domains[i].id,
                        domain_name: domains_JSON.Domains[i].domain_name,
                        grade: domains_JSON.Domains[i].grade,
                        last_updated: domains_JSON.Domains[i].last_updated,
                        status: domains_JSON.Domains[i].status,
                        active: domains_JSON.Domains[i].active
                    });
                    
                }
                ctrl.reloadDomainLists();
            }
        };
        request.open("GET", "/domains/JSON");
        request.send();
    },

    getDomainSSL: function(domain_name) {
        return new Promise(function(resolve, reject) {
            var req = new XMLHttpRequest();
            req.open('GET', '/checkSSL/' + domain_name);

            req.onload = function() {
                if (req.status == 200) {
                    //console.log('resolved\n'+req.response);
                    resolve(req.response);
                } 
                else {
                    reject(Error(req.statusText));
                }
            };

            req.onerror = function() {
                reject(Error("Network Error"));
            };
            req.send();
        }); 
    }

};