var request = require('request');

function RadioControl(spaceControl) {
    var self = this;
    
    var radioId;
    
    self.increaseVolume = function () {
        console.log("louder");
    };
    
    self.decreaseVolume = function () {
        console.log("quieter");
    };
    
    self.selectedRadio = function (radioId) {
        if(radioId) radioId = radioId;
        console.log('now playing: ' + radioId);
        return radioId;
    };
    
    self.stopRadio = function () {
        console.log('stopping radio');
    };
    
    self.startRadio = function () {
        console.log('starting radio');
    };
}

function ColorMixer (spaceControl) {
    var self = this;
    
    var r, g, b;
    
    self.R = function (value) {
        if(value) r = value;
        return r;
    };
    
    self.G = function (value) {
        if(value) g = value;
        return g;
    };
    
    self.B = function (value) {
        if(value) b = value;
        return b;
    };
}

function ElectricSocketControl(spaceControl) {
    var self = this;
    
    var sockets = {};
    
    self.socketState = function (args) {
        if(args.socketState) sockets[args.socketId] = args.socketState;
        console.log(JSON.stringify(args))
        return sockets[args.socketId];
    }
}

function SpaceControl(server){
    var self = this;
    
    self.server = server;
    
    self.radioControl = new RadioControl(self);
    self.colorMixer = new ColorMixer(self);
    self.electricSocketControl = new ElectricSocketControl(self);
}

module.exports = SpaceControl;