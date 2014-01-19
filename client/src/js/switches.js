function Switch(element, initalState) {
    var self = this;
    
    element.attr("data-on", "success");
    element.attr("data-on-label", "ein");
    element.attr("data-off", "danger");
    element.attr("data-off-label", "aus");
    element.bootstrapSwitch();

    self.state = ko.createObserable(function (newValue) {
        element.bootstrapSwitch('setState', newValue);
    });
    
    element.on('switch-change', function (e, data) {
        self.state(data.value);
    });
    
    self.state(initalState);
}

function createSwitches() {
    var switches = [];
    $('input[type=checkbox]').each(function(){
        var element = $(this);
        switches.push( new Switch(element, true) );
    });
    return switches;
}