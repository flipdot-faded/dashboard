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