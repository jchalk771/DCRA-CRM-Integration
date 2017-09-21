/**
 * CONF_CRM_INTEGRATION_RULES
 * @namespace CONF_CRM_INTEGRATION_RULES
 * @example CRM to Core integration rules are configured in script: CONF_CRM_INTEGRATION_RULES
 * Example routing rule: If custom fields match
 *  var rules = {
  "ServiceRequest/Trees and Weeds/Tall Grass and Weeds/NA": {
		"Propogation_Rules": {
			"Update_Core_WF" : true,
			"Task": "Intake",
			"Set_Status": "Create Enforcement Case",
			"Fire_WTUA_Event": false
		},
		"Custom_Field_Map": {
			"Where in the Public Right of Way?": "Location ROW"
		}
	}
  }
 */

var rules = 
{
	"ServiceRequest/*/*/*": {
		"Propogation_Rules": {
			"Update_Core_WF" : true,
			"Task": "Intake",
			"Set_Status": "Note",
			"Fire_WTUA_Event": true
		}
	}
};