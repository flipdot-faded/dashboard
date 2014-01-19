$(function(){
    ko.createObserable = function(valueChangedHandler){
        var observable = ko.observable();
        observable.subscribe(valueChangedHandler);
        return observable;
    }
});
function ColorMixer(defaultR, defaultG, defaultB){
    var self = this;
    
    function sliderChangedHandler(){
        
        var newR = sliderR.getValue();
        var newG = sliderG.getValue();
        var newB = sliderB.getValue();
        
        self.R(newR);
        self.G(newG);
        self.B(newB);
    };
    
    function updateColorResult(){
        $('#colorResult').css('background', 'rgb('+self.R()+','+
                                                   self.G()+','+
                                                   self.B()+')');
    }
    
    var sliderR = $('input[data-slider-id="slider_R"]').slider()
        .on('slide', sliderChangedHandler)
        .data('slider');
    var sliderG = $('input[data-slider-id="slider_G"]').slider()
        .on('slide', sliderChangedHandler)
        .data('slider');
    var sliderB = $('input[data-slider-id="slider_B"]').slider()
        .on('slide', sliderChangedHandler)
        .data('slider');
        
    self.R = ko.createObserable(function (newValue) {
        sliderR.setValue(newValue);
        updateColorResult();
    });
    
    self.G = ko.createObserable(function (newValue) {
        sliderG.setValue(newValue);
        updateColorResult();
    });
    
    self.B = ko.createObserable(function (newValue) {
        sliderB.setValue(newValue);
        updateColorResult();
    });
    
    // set the default values
    self.R(defaultR);
    self.G(defaultG);
    self.B(defaultB);
}
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
function RadioEntry(label, streamId) {
    var self = this;
    
    self.label = ko.createObserable(function (newValue) {
        
    });
    
    self.streamId = ko.observable();
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
        if(!selected.isSelected()) return;

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
$(function () {
 
     function DashboardViewModel(){
        var self = this;
        
        self.colorMixer = new ColorMixer(128, 128, 128);
        
        self.switches = [
            new Switch('Schwarzlicht', true),
            new Switch('Raumlicht', false),
            new Switch('Bunte Lampe', true),
        ]
        
        self.radioList = new RadioList([
            new RadioEntry('Antenne Hackerspace'),
            new RadioEntry('NSA.fm'),
        ]);
    }
    
    var viewModel = new DashboardViewModel();
    ko.applyBindings(viewModel);
    window.viewModel = viewModel;
});
$(function(){
    var switchIndex = 0;
    $('input[type=checkbox]').each(function(){
        var element = $(this);
        
        element.attr("data-on", "success");
        element.attr("data-on-label", "ein");
        element.attr("data-off", "danger");
        element.attr("data-off-label", "aus");
        element.bootstrapSwitch();
        
        viewModel.switches[switchIndex].attachElement(element);
        switchIndex++;
    });
});