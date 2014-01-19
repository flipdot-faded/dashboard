$(function () {
 
     function DashboardViewModel(){
        var self = this;
        
        self.colorMixer = new ColorMixer(128, 128, 128);
        
        self.switches = [
            new Switch('Schwarzlicht', 1, true),
            new Switch('Raumlicht', 2, false),
            new Switch('Bunte Lampe', 3, true),
        ]
        
        self.radioList = new RadioList([
            new RadioEntry('Antenne Hackerspace', 1),
            new RadioEntry('NSA.fm', 2),
        ]);
        
        self.radioControl = new RadioControl();
        self.socket = new Socket();
    }
    
    var viewModel = new DashboardViewModel();
    ko.applyBindings(viewModel);
    window.viewModel = viewModel;
});