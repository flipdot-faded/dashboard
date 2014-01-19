function Switch(label, initalState) {
    var self = this;

    self.attachElement = function (element) {
        self.state = ko.createObserable(function (newValue) {
            element.bootstrapSwitch('setState', newValue);
        });
        
        element.on('switch-change', function (e, data) {
            self.state(data.value);
        });
    
        self.state(initalState);
    }
    
    self.label = ko.observable(label);
}