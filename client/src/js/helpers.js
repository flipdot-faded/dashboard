$(function(){
    ko.createObserable = function(defaultValue, valueChangedHandler){
        
        if(typeof(defaultValue) == 'function') valueChangedHandler = defaultValue;
        
        var observable = ko.observable(defaultValue);
        observable.subscribe(valueChangedHandler);
        return observable;
    }
});