function RadioControl() {
    var self = this;
    
    self.isPlaying = ko.observable(false);
    self.playingIcon = ko.computed(function () {
        return self.isPlaying() ? "fa-pause" : "fa-play-circle-o";
    });
    
    function startRadio() {
        console.log('starting radio');
    }
    
    function stopRadio() {
        console.log('stopping radio');
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
        console.log("louder");
    };
    
    self.decreaseVolume = function () {
        console.log("quieter");
    };
}