$(function () {
 
     function DashboardViewModel(){
        var self = this;
        
        self.colorMixer = new ColorMixer(128, 128, 128);
    }
    
    var viewModel = new DashboardViewModel();
    ko.applyBindings(viewModel);
    window.viewModel = viewModel;
});