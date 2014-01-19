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