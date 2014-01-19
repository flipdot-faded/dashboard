var request = require('request');

function RadioControl(sender) {
    var self = this;
    
    var radioId;
    
    self.increaseVolume = function () {
        sender.send({
            mixer_control: "laut"
        });
    };
    
    self.decreaseVolume = function () {
        sender.send({
            mixer_control: "leise"
        });
    };
    
    self.selectedRadio = function (radioId) {
        if(radioId) radioId = radioId;
        
        sender.send({
            radio: radioId
        });
        
        return radioId;
    };
    
    self.stopRadio = function () {
        sender.send({
            radio_control: 'stop'
        });
    };
    
    self.startRadio = function () {
        sender.send({
            radio_control: 'play'
        });
    };
}

function ColorMixer (sender) {
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

function ElectricSocketControl(houseCode, sender) {
    var self = this;
    
    var sockets = {};
    
    self.socketState = function (args) {
        if(args.socketState) sockets[args.socketId] = args.socketState;
        
        sender.send({
            hauscode: houseCode,
            dose: args.socketId,
            status: args.socketState ? 1 : 0
        });
        
        return sockets[args.socketId];
    };
}

function SpaceControl(server, port, houseCode){
    var self = this;
    
    self.server = server;
    
    var sender = {
        send: function (values) {
            var options = {
                url: 'http://'+self.server+'/remote_control.php',
                qs: values
            };
            request(options, function (err, res, body) {
                if(err) console.log(err);
            });
        }
    };
    
    self.radioControl = new RadioControl(sender);
    self.colorMixer = new ColorMixer(sender);
    self.electricSocketControl = new ElectricSocketControl(houseCode, sender);
}

module.exports = SpaceControl;