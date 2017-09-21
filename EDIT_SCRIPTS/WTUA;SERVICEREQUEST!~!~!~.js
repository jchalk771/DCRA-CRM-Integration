/**
 * Workflow automation for all Service Requests
 * @namespace WTUA:ServiceRequest///
 */

// execute workflow propagation rules
eval(getScriptText("INCLUDES_WF_RULES", null, false));
eval(getScriptText("CONF_SR_WORKFLOW_RULES",null,false));

process_WF_JSON_Rules(r);