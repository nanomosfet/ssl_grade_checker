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
            spanEl.innerHTML = status;
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