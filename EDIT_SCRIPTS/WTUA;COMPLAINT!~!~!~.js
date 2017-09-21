/**
 * Workflow automation for all Complaint records
 * @namespace WTUA:Complaint/*/*/*
 */

// execute workflow propagation rules
eval(getScriptText("INCLUDES_WF_RULES", null, false));
eval(getScriptText("CONF_COMP_WORKFLOW_RULES",null,false));

process_WF_JSON_Rules(r);