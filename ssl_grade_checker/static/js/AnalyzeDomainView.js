var AnalyzeDomainView = {
    bindAnalyzeButton: function(buttonID) {
        var button = document.getElementById(buttonID);        
        button.addEventListener('click', function() {
            domain_name = document.getElementById("add-domain-name").value;
            ctrl.StartDomainAnalyze(domain_name);
            this.disabled = true;
        });
    },

    reEnableAnalyzeButton: function(buttonID) {
        var button = document.getElementById(buttonID);
        button.disabled = false;
    },

    emptyAnalyzeTextField: function(textFieldID) {
        var analyzeTextField = document.getElementById(textFieldID);
        analyzeTextField.value = '';
    },

    finishAnalyzeRender: function() {
        this.reEnableAnalyzeButton('analyzeButton');
        this.emptyAnalyzeTextField('add-domain-name');
        this.hideProgressBar('add-render-progress')

    },

    renderProgressBar: function(barID, percent) {
        var bar = document.getElementById(barID);
        bar.style.dispay = 'flex';
        if (!bar.firstChild) {
            var div = document.createElement('div');
            bar.appendChild(div);
            div.setAttribute('class','progress-bar progress-bar-striped progress-bar-animated');
            div.setAttribute('role', 'progressbar');
            div.setAttribute('aria-valuenow', percent);
            div.setAttribute('aria-valuemin', '0');
            div.setAttribute('aria-valuemax', '100');
            div.setAttribute('role', 'progressbar');
            div.style.width = percent + '%';
            div.innerHTML = percent + '%';

        }
        else {
            var div = bar.firstChild;
            div.style.width = percent + '%';
            div.innerHTML = percent + '%';
        }   

    },

    hideProgressBar: function(barID) {
        var bar = document.getElementById(barID);
        bar.style.display = 'none';
    },

    startAnalyze: function() {
        this.renderProgressBar('add-render-progress', 0);
        this.bindAnalyzeButton('analyzeButton');
    },

    updateProgress: function() {
        currentAnalysis = ctrl.getAnalysisStatus();
        this.renderProgressBar('add-render-progress', DomainAnalysisController.calculateCurrentPercent());
    },
};