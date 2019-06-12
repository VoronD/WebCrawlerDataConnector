(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {

        var cols = [{
            id: "Destination",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "Count",
            dataType: tableau.dataTypeEnum.int
        }];

        var tableSchema = {
            id: "top100destination",
            alias: "description goes here",
            columns: cols
        };


        tableau.log("Hello World!");

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function (table, doneCallback) {
        $.getJSON("https://gettopservices.azurewebsites.net/api/v1/GetTop100DestinationsForDateRange?from=5/12/19&to=6/12/19", function (resp) {
            var feat = resp.features,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = resp.length; i < len; i++) {
                tableData.push({
                    "Destination": resp[i].Destination,
                    "Count": resp[i].Count,
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function () {
        $("#submitButton").click(function () {
            tableau.connectionName = "Top 100 Destinations"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
