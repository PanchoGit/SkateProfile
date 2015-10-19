/// <reference path="../_references.js" />

var App;

(function (app) {
    var spawnViewModel = (function () {
        function viewModel() {

            this.model = {
                skaters: ko.observableArray([])
            };

            this.init();
        }

        viewModel.prototype.init = function () {
            var self = this;

            $.ajax('api/skater/', {
                context: this,
                type: 'GET',
                contentType: 'application/json; charset=utf-8',
                data: "",
                success: function(responseData, textStatus, jqxhr) {
                    var skaters = [];
                    _.each(responseData, function(item) {
                        skaters.push(new App.SkaterModel(item.Id, item.Name));
                    });
                    self.model.skaters(skaters);
                    window.ApplyGridNess("knGrid");
                }
            });
        }

        viewModel.prototype.model = this.model;

        return viewModel;
    }());

    function skaterModel(id, name) {
        var self = this;
        self.id = ko.observable(id);
        self.name = ko.observable(name);
    }

    app.SpawnViewModel = spawnViewModel;
    app.SkaterModel = skaterModel;

})(App || (App = {}));

function init(){
    ko.applyBindings(new App.SpawnViewModel());
	window.ApplyGridNess("knGrid");
}

init();