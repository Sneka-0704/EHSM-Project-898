sap.ui.define([], function () {
    "use strict";

    return {
        severityState: function (sSeverity) {
            if (!sSeverity) return "None";
            switch (sSeverity.toUpperCase()) {
                case "HIGH":
                case "CRITICAL":
                    return "Error";
                case "MEDIUM":
                    return "Warning";
                case "LOW":
                    return "Success";
                default:
                    return "None";
            }
        },

        priorityState: function (sPriority) {
            if (!sPriority) return "None";
            switch (sPriority.toUpperCase()) {
                case "HIGH":
                case "URGENT":
                    return "Error";
                case "MEDIUM":
                    return "Warning";
                case "LOW":
                    return "None";
                default:
                    return "None";
            }
        }
    };
});
