function RadioEntry(label, streamId) {
    var self = this;
    
    self.label = ko.createObserable(function (newValue) {
        
    });
    
    self.streamId = ko.observable(streamId);
    self.isSelected = ko.observable();
    
    self.attachElement = function (element) {
        
    };
    
    self.switchSelected = function () {
        var oldVal = self.isSelected();
        self.isSelected(!oldVal);
    }
    
    self.label(label);
}

function RadioList(radioEntries) {
    var self = this;
    
    self.entries = ko.observableArray(radioEntries);

    function makeUniqueSelection(selected) {
        
        if(selected.isSelected()) {
            if(window.viewModel) viewModel.socket.call('radioControl', 'selectedRadio', selected.streamId());
        } else {
            return;
        }

        _.each(self.entries(), function (e) {
            if(e !== selected && e.isSelected()) {
                e.isSelected(false);
            }
        });
    }
    
    _.each(self.entries(), function (e) {
        e.isSelected.subscribe(function () { makeUniqueSelection(e) });
    })
    
    self.getSelected = function () {
        return _.find(self.entries(), function (e) { return e.isSelected() });
    }
}