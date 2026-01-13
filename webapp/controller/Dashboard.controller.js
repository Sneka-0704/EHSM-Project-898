sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "../model/formatter"
], function (Controller, Filter, FilterOperator, formatter) {
    "use strict";

    return Controller.extend("ehsm898.controller.Dashboard", {
        formatter: formatter,

        onInit: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("Dashboard").attachPatternMatched(this._onObjectMatched, this);
        },

        _onObjectMatched: function (oEvent) {
            var oUserModel = this.getOwnerComponent().getModel("user");
            if (!oUserModel) {
                // If no user model (direct access), redirect to Login
                this.getOwnerComponent().getRouter().navTo("Login");
                return;
            }

            var sEmployeeId = oUserModel.getProperty("/EmployeeId");
            this._filterTables(sEmployeeId);
        },

        _filterTables: function (sEmployeeId) {
            var oFilter = new Filter("EmployeeId", FilterOperator.EQ, sEmployeeId);

            var oRiskTable = this.getView().byId("riskTable");
            oRiskTable.getBinding("items").filter([oFilter]);

            var oIncidentTable = this.getView().byId("incidentTable");
            oIncidentTable.getBinding("items").filter([oFilter]);
        },

        onRiskSearch: function (oEvent) {
            var sQuery = oEvent.getParameter("newValue");
            var aFilters = [];
            if (sQuery) {
                aFilters.push(new Filter("RiskDescription", FilterOperator.Contains, sQuery));
            }

            // Re-apply EmployeeId filter as well
            var sEmployeeId = this.getOwnerComponent().getModel("user").getProperty("/EmployeeId");
            aFilters.push(new Filter("EmployeeId", FilterOperator.EQ, sEmployeeId));

            var oRiskTable = this.getView().byId("riskTable");
            oRiskTable.getBinding("items").filter(new Filter({
                filters: aFilters,
                and: true
            }));
        },

        onIncidentSearch: function (oEvent) {
            var sQuery = oEvent.getParameter("newValue");
            var aFilters = [];
            if (sQuery) {
                aFilters.push(new Filter("IncidentDescription", FilterOperator.Contains, sQuery));
            }

            var sEmployeeId = this.getOwnerComponent().getModel("user").getProperty("/EmployeeId");
            aFilters.push(new Filter("EmployeeId", FilterOperator.EQ, sEmployeeId));

            var oIncidentTable = this.getView().byId("incidentTable");
            oIncidentTable.getBinding("items").filter(new Filter({
                filters: aFilters,
                and: true
            }));
        },

        onLogoutPress: function () {
            this.getOwnerComponent().getRouter().navTo("Login");
        }
    });
});
