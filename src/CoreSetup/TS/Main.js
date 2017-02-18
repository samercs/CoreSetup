/// <reference path="../typings/index.d.ts" />
"use strict";
require("../Less/site.less");
require("../Less/my.less");
var Main = (function () {
    function Main() {
        $.get("/home/persona", function (persons) {
            var options = {
                dataSource: persons,
                paging: {
                    enabled: false,
                },
                showBorders: true,
                editing: {
                    mode: "batch",
                    allowUpdating: true
                },
                filterRow: {
                    visible: true,
                    applyFilter: "auto"
                },
                searchPanel: {
                    visible: true,
                    width: 240,
                    placeholder: "Search..."
                },
                headerFilter: {
                    visible: true
                },
                onEditingStart: function (e) {
                    $.ajax({
                        url: "/home/person/update",
                        type: 'PUT',
                        data: e.data,
                        success: function (data) {
                            alert('Load was performed.');
                        }
                    });
                },
                columns: [
                    {
                        dataField: "id",
                        width: 50
                    },
                    {
                        dataField: "type",
                        width: 50
                    },
                    "name", "email"]
            };
            $("#gridContainer").dxDataGrid(options);
        });
    }
    return Main;
}());
$(document).ready(function () {
    new Main();
});
//# sourceMappingURL=Main.js.map