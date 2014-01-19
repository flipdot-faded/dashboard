$(function(){
    $('input[type=checkbox]').each(function(){
        var self = $(this);
        
        self.attr("data-on", "success");
        self.attr("data-on-label", "ein");
        self.attr("data-off", "danger");
        self.attr("data-off-label", "aus");
        self.bootstrapSwitch();
    });
});