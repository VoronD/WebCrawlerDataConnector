(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {

        var cols = [{
            id: "Source",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "Count",
            dataType: tableau.dataTypeEnum.int
        }];

        var tableSchema = {
            id: "imageCounting",
            alias: "description goes here",
            columns: cols
        };


        tableau.log("Hello World!");

        schemaCallback([tableSchema]);
    };

    myConnector.getData = function (table, doneCallback) {

        $.getJSON("https://gettopservices.azurewebsites.net/api/v1/GetTop10ImageSources", function (resp) {
            var feat = resp.features,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = resp.length; i < len; i++) {
                tableData.push({
                    "Source": resp[i].Source,
                    "Count": resp[i].Count,
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });



    };

    tableau.registerConnector(myConnector);

    $(document).ready(function () {
        $("#submitButton").click(function () {
            tableau.connectionName = "imageCounting";
            tableau.submit();
        });
    });
})();