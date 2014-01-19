function Switch(label, id, initalState) {
    var self = this;

    self.attachElement = function (element) {
        self.state = ko.createObserable(function (newValue) {
            element.bootstrapSwitch('setState', newValue);
            
            if(window.viewModel) viewModel.socket.call('electricSocketControl', 'socketState', {
                socketId: self.id(),
                socketState: newValue
            });
        });
        
        element.on('switch-change', function (e, data) {
            self.state(data.value);
        });
    
        self.state(initalState);
    }
    
    self.label = ko.observable(label);
    self.id = ko.observable(id);
}