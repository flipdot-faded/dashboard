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