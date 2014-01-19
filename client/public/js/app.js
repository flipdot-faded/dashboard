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
$(function () {
 
     function DashboardViewModel(){
        var self = this;
        
        self.colorMixer = new ColorMixer(128, 128, 128);
        self.switches = createSwitches();
    }
    
    var viewModel = new DashboardViewModel();
    ko.applyBindings(viewModel);
    window.viewModel = viewModel;
});