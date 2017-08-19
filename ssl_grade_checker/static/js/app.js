

var Model = {
    domains: [
        {
            id: 0,
            domain_name: "www.example.com",
            grade: "A+",
            last_updated: 1490918500000,
            status: "OK",
            active: true
        },
        {
            id: 1,
            domain_name: "www.example_two.com",
            grade: "B",
            last_updated: 1499919200000,
            status: "OK",
            active: true
        },
        {
            id: 2,
            domain_name: "www.example_three.com",
            grade: "N/A",
            last_updated: 1491918400000,
            status: "Error",
            active: true
        },
        {
            id: 3,
            domain_name: "www.example_four.com",
            grade: "F",
            last_updated: 1390518400000,
            status: "OK",
            active: true
        },
        {
            id: 4,
            domain_name: "www.example_disabled.com",
            grade: "F",
            last_updated: 1480918400000,
            status: "OK",
            active: false
        },



    ]

};
var DomainListView = {
    render: function() {
        var domains = ctrl.getDomains();
        var domainListEl = document.getElementById("domainTableBody");
        for(i = 0; i < domains.length; i++) {
            if(domains[i].active) {
                var tr = document.createElement("tr");
                var th = document.createElement("th");
                th.setAttribute("scope","row");
                th.innerHTML = i + 1;
                tr.appendChild(th);
                var td = document.createElement("td");
                td.innerHTML = domains[i].domain_name;
                tr.appendChild(td);
                var td = document.createElement("td");
                td.appendChild(this.renderStatus(domains[i].status));
                tr.appendChild(td);
                var td = document.createElement("td");
                td.appendChild(this.renderGrade(domains[i].grade));
                tr.appendChild(td);
                var td = document.createElement("td");
                td.innerHTML = this.renderDateString(domains[i].last_updated);
                tr.appendChild(td);

                // Append new row to table
                domainListEl.appendChild(tr);
            }
        }
    },

    renderStatus: function(status) {
        var spanEl = document.createElement("span");
        if(status == "OK") {
            spanEl.setAttribute("class", "badge badge-pill badge-success");
            spanEl.innerHTML = status;
        } else if (status == "Error") {
            spanEl.setAttribute("class", "badge badge-pill badge-danger");
            spanEl.innerHTML = status;
        } else {
            spanEl.innerHTML = 'Incorrect Format';
        }
        return spanEl;
    },

    renderGrade: function(grade) {
        var spanEl = document.createElement("span");
        if(grade == "A+" || grade == "A") {
            spanEl.setAttribute("class", "badge badge-pill badge-success");
            spanEl.innerHTML = grade;
        } else if (grade == "B" || grade == "C") {
            spanEl.setAttribute("class", "badge badge-pill badge-warning");
            spanEl.innerHTML = grade;
        } else {
            spanEl.setAttribute("class", "badge badge-pill badge-danger");
            spanEl.innerHTML = grade;
        }
        return spanEl;
    },

    renderDateString: function(date) {
        var d = new Date(date);
        return d.toDateString();
    }

};

var ctrl = {
    getDomains: function() {
        return Model.domains;
    },

    init: function() {
        DomainListView.render();
    }



}

ctrl.init()