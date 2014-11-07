xenonmodule.controller('GastosCtrl', function($scope, $layout, $state, config)
    {
        $scope.config = config;
        $scope.test = 'hola';
    }).
    controller('GastosEvoCtrl', function($scope, $http, $layout, $log)
    {
        $scope.xenonPalette = ['#68b828','#7c38bc','#0e62c7','#fcd036','#4fcdfc','#00b19d','#ff6264','#f7aa47'];
        
        $scope.new_category = {
            query: '',
            name: '',
            concepts: []
        }
        
        $scope.$watch('new_category.query', function(new_value, old_value) {
            $scope.getMovimientos(new_value);
        });
        
        $scope.getMovimientos = function(new_value) {
            $http.get($scope.$parent.config.routes.concept.get,{
                params: {
                    query: new_value
                }
            }).
                success(function(data, status, headers, config) {
                    $scope.new_category.concepts = data;
                    $scope.getPieSerie(new_value);
                }).
                error(function(data, status, headers, config) {
                  $log.info(data);
                });
        }
        
        $scope.getPieSerie = function(new_value) {
            $http.get($scope.$parent.config.routes.concept.pie, {
                params: {
                    query: new_value
                }
            }).
                success(function(data, status, headers, config) {
                    $scope.getPieSelection(data);
                }).
                error(function(data, status, headers, config) {
                  $log.info(data);
                });
        }
        
        $scope.getPieSelection = function(data) {
            if( ! $.isFunction($.fn.dxChart))
                    return;
            if (data[0].selected==null) data[0].selected=0;
            if (data[0].not_selected==null) data[0].not_selected=0;
            var dataSource = [
                    {name: "seleccionados", val: -data[0].selected},
                    {name: "otros", val: -data[0].not_selected}
            ], timer;
            if (typeof $scope.pie != 'undefined') {
                $log.info(dataSource);
                $scope.pie = $("#bar-selected").dxPieChart("instance");
                $scope.pie.option({ dataSource: dataSource });
            } else {
                $scope.pie = $("#bar-selected").dxPieChart({
                        dataSource: dataSource,
                        title: "",
                        tooltip: {
                                enabled: false,
                                customizeText: function() { 
                                        return this.argumentText + "<br/>" + this.valueText;
                                }
                        },
                        size: {
                                height: 240
                        },
                        pointClick: function(point) {
                                point.showTooltip();
                                clearTimeout(timer);
                                timer = setTimeout(function() { point.hideTooltip(); }, 2000);
                                $("select option:contains(" + point.argument + ")").prop("selected", true);
                        },
                        legend: {
                                visible: false
                        },  
                        series: [{
                                type: "doughnut",
                                argumentField: "name"
                        }],
                        palette: $scope.xenonPalette
                });
            }
        }
    });