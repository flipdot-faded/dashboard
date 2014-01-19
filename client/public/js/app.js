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
        
        if(window.viewModel) viewModel.socket.call('colorMixer', 'R', newValue);
    });
    
    self.G = ko.createObserable(function (newValue) {
        sliderG.setValue(newValue);
        updateColorResult();
        
        if(window.viewModel) viewModel.socket.call('colorMixer', 'G', newValue);
    });
    
    self.B = ko.createObserable(function (newValue) {
        sliderB.setValue(newValue);
        updateColorResult();
        
        if(window.viewModel) viewModel.socket.call('colorMixer', 'B', newValue);
    });
    
    // set the default values
    self.R(defaultR);
    self.G(defaultG);
    self.B(defaultB);
}
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
            
            // ensure we're on play mode
            if(window.viewModel && !viewModel.radioControl.isPlaying()) {
                viewModel.radioControl.startStop();
            }
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
function RadioControl() {
    var self = this;
    
    self.isPlaying = ko.observable(false);
    self.playingIcon = ko.computed(function () {
        return self.isPlaying() ? "fa-pause" : "fa-play-circle-o";
    });
    
    function startRadio() {
        if(window.viewModel) viewModel.socket.call('radioControl', 'startRadio');
    }
    
    function stopRadio() {
        if(window.viewModel) viewModel.socket.call('radioControl', 'stopRadio');
    }
    
    self.startStop = function () {
        var oldVal = self.isPlaying();
        
        if(oldVal) {
            stopRadio();
        } else {
            startRadio();
        }
        
        self.isPlaying(!oldVal);
    };
    
    self.increaseVolume = function () {
        if(window.viewModel) viewModel.socket.call('radioControl', 'increaseVolume');
    };
    
    self.decreaseVolume = function () {
        if(window.viewModel) viewModel.socket.call('radioControl', 'decreaseVolume');
    };
}
function Socket() {
    var self = this;
    
    var socket = io.connect();
    
    self.call = function (controller, command, args) {
        socket.send(JSON.stringify({
            controller: controller,
            command: command,
            args: args
        }));
    };
    
    self.onConfig = function (callback) {
        socket.on('spaceConfig', function (config) {
            callback(config);
        });
    }
}
function postProcessDom(){
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
};
$(function () {
    function DashboardViewModel(){
        var self = this;
        
        self.socket = new Socket();
        self.onReady;
        self.socket.onConfig(function (config) {
            self.colorMixer = new ColorMixer(
                config.colorMixer.R,
                config.colorMixer.G,
                config.colorMixer.B);
        
            self.switches = _.map(config.switches, function (s) {
                return new Switch(s.name, s.id, s.state);
            });
            
            self.radioList = new RadioList(_.map(config.radioList,function (r) {
                return new RadioEntry(r.name, r.id);
            }));
            
            self.radioControl = new RadioControl();
            
            if(self.onReady) self.onReady();
        });
    }
    
    var viewModel = new DashboardViewModel();
    viewModel.onReady = function () {
        ko.applyBindings(viewModel);
        window.viewModel = viewModel;
        
        postProcessDom();
    };
});