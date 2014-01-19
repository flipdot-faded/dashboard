$(function(){
    ko.createObserable = function(valueChangedHandler){
        var observable = ko.observable();
        observable.subscribe(valueChangedHandler);
        return observable;
    }
});