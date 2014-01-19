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
        
        self.radioControl = new RadioControl();
    }
    
    var viewModel = new DashboardViewModel();
    ko.applyBindings(viewModel);
    window.viewModel = viewModel;
});