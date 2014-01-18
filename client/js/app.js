$(function(){
    
    function updateColorResult(){
        $('#colorResult').css('background',
                                      'rgb('+sliderR.getValue()+','+
                                             sliderG.getValue()+','+
                                             sliderB.getValue()+')');
    };
    
    var sliderR = $('input[data-slider-id="slider_R"]').slider()
        .on('slide', updateColorResult)
        .data('slider');
    var sliderG = $('input[data-slider-id="slider_G"]').slider()
        .on('slide', updateColorResult)
        .data('slider');
    var sliderB = $('input[data-slider-id="slider_B"]').slider()
        .on('slide', updateColorResult)
        .data('slider');
    
    updateColorResult();
});