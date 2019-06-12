(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {

        var cols = [{
            id: "Destinations",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "Count",
            dataType: tableau.dataTypeEnum.int
        }];

        var tableSchema = {
            id: "top10destination",
            alias: "description goes here",
            columns: cols
        };


        tableau.log("Hello World!");

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://gettopservices.azurewebsites.net/api/v1/GetTop10Destinations", function(resp) {
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
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "Top 10 Destinations"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
