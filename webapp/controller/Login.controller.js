sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel"
], function (Controller, MessageToast, MessageBox, JSONModel) {
    "use strict";

    return Controller.extend("ehsm898.controller.Login", {
        onInit: function () {
            // Initialize login model if needed
        },

        onLoginPress: function () {
            var oView = this.getView();
            var sEmployeeId = oView.byId("employeeIdInput").getValue();
            var sPassword = oView.byId("passwordInput").getValue();

            if (!sEmployeeId || !sPassword) {
                MessageToast.show("Please enter both Employee ID and Password");
                return;
            }

            var oModel = this.getOwnerComponent().getModel();
            var oBusyDialog = new sap.m.BusyDialog();
            oBusyDialog.open();

            // ZLOGIN_EHSM898Set(EmployeeId='...',Password='...')
            var sPath = oModel.createKey("/ZLOGIN_EHSM898Set", {
                EmployeeId: sEmployeeId,
                Password: sPassword
            });

            oModel.read(sPath, {
                success: function (oData) {
                    oBusyDialog.close();
                    if (oData.Status === "Success") {
                        MessageToast.show("Login Successful!");
                        
                        // Store user info in a global model
                        var oUserModel = new JSONModel({
                            EmployeeId: sEmployeeId,
                            Name: oData.EmployeeName // Assuming backend returns this
                        });
                        this.getOwnerComponent().setModel(oUserModel, "user");

                        // Navigate to Dashboard
                        this.getOwnerComponent().getRouter().navTo("Dashboard");
                    } else {
                        MessageBox.error("Invalid Credentials. Please try again.");
                    }
                }.bind(this),
                error: function (oError) {
                    oBusyDialog.close();
                    MessageBox.error("Login failed. Please check your connection or try again later.");
                }
            });
        }
    });
});
