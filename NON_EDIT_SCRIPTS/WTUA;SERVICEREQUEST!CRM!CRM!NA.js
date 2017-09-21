/**
 * CRM to Core SR integration scripts, executed when a new SR is created via construct.
 * 
 * @namespace WTUA:ServiceRequest/CRM/CRM/NA
 */

// get JSON Config for CRM to Core Integration Rules
eval(getScriptText("CONF_CRM_INTEGRATION_RULES", null, false));
eval(getScriptText("INCLUDES_WF_RULES", null, false));

logDebug("retrieved scripts");

var rules = 
{
    "Code/*/*/*": [
      {
        "Propogation_Rules": null,
        "Custom_Field_Map": {
          "Your Full Name": "Complaintant",
          "Your Mailing Address": "Complaintant Adress",
          "Your Phone Number": "Complaintant Phone",
          "Your Email Address": "Complaintant Email"
        }
      }
    ]
  };

try {
    // automation on Workflow Work Order / Work Order
    if(wfTask=="Investigation" && wfStatus=="Work Order") {
        var newCoreCapId = autoCreateRecordFromCRM();
        logDebug("New record id: " + newCoreCapId);
    }

    // add comment to records related to CRM shadow record
    if(wfTask=="Investigation" && wfStatus=="Comment") {
        // do stuff
        var childRecs = getRelatedRecdsDown("ServiceRequest/*/*/*")
        for(c in childRecs) {
            
            var thisChildId = childRecs[c];
            createCapComment(wfComment,thisChildId);
        }
        
        logDebug("Successfully added comment to all records related to CRM shadow record.")
    }
} catch (err) {
    logDebug("Error executing script WTUA:ServiceRequest/CRM/CRM/NA:" + err);
}

function isEmpty(str) {
    return (!str || 0 === str.length);
}




/**
 * Auto create service request, work order or enforcement record from new CRM shadow record
 * @example The "Foreign Association" record type mapping must be configured on the CRM Request Type. 
 * The integration saves the foreign association record type on the CRM shadow record custom field: Workorder Record Type
 * @memberof WTUA:ServiceRequest/CRM/CRM/NA
 */
function autoCreateRecordFromCRM() {
    try {
        logDebug("in autoCreateRecordFromCRM");


        // Get target core record type from shadow record CustomField.Workorder Record Type
        var crmReqType = getAppSpecific("Request Type");
        var coreRecType = getAppSpecific("Workorder Record Type");

        if (isEmpty(coreRecType)) {
            logDebug("The Core Record Type could not be created because no record type has been mapped. Validate the CRM Request Type Foreign Association config for Request Type: " + crmReqType);
        } else {
            logDebug("doing autoCreateRecordFromCRM");
            //check if the shadow record has already created a core SR record (otherwise it will create dups)
            var coreRecordID = getAppSpecific("Core Request ID");
            if (!isEmpty(coreRecordID)) {
                logDebug("WARNING: A core record already exists for this CRM request: " + coreRecordID);
                return false;
            }

            logDebug("no CoreRequestID autoCreateRecordFromCRM");

            logDebug("About to Address Validated autoCreateRecordFromCRM");
            //validate CRM address before creating child
            var validateAddress = validateCRMAddress();
            logDebug("CRM Address Validated: " + validateAddress);
            logDebug("Address Validated autoCreateRecordFromCRM");

            //update contact types from individual to "Complainant"
            //editContactType("individual", "Complainant");

            //create the core record as a child of the CRM shadow record
            var coreReqTypeArr = coreRecType.split("/");
            var coreRecCapId = createChild(coreReqTypeArr[0], coreReqTypeArr[1], coreReqTypeArr[2], coreReqTypeArr[3], crmReqType);

            if (coreRecCapId) {

                //update the Core Request ID on the CRM shadow record custom fields
                coreRecordID = coreRecCapId.getCustomID();
                editAppSpecific("Core Request ID", coreRecordID);

                //copy the CRM request description to the core record description
                var crmWorkDesModel = aa.cap.getCapWorkDesByPK(capId).getOutput();
                var crmRequestDesc = crmWorkDesModel.getDescription();
                editRecordDescription(crmRequestDesc, coreRecCapId);

                //update Core SR custom fields from CRM
                copyCustomFieldsFromCRM(capId, coreRecCapId);

                //copy any comments from CRM shadow record to the Core SR
                copyRecordComments(capId, coreRecCapId);

                //copy attachments from CRM shadow record
                copyDocuments(capId, coreRecCapId);

                //link contacts to ref
                createRefContactsFromCapContactsAndLink(coreRecCapId, null, null, false, false, comparePeopleStandard);

                //if the address is not validated, update SR workflow = "Address Validation Required"
                if (!validateAddress) {
                    var crmAddress = getAppSpecific("Location", capId);
                    updateTask("Intake", "Address Validation Required", "Address could not be validated: " + crmAddress, "Updated via script", "", coreRecCapId);
                } else {
                    //propogate workflow based on JSON rules
                    updateCoreSRWorkflow(capId, coreRecCapId);
                }
            }
            return coreRecCapId;
        }
    } catch (err) {
        logDebug("Error creating core SR type from CRM: " + err);
    }
}


/**
Title : getRelatedRecdsDown
Purpose : gets all great/grand/children/etc 
Author : Lynda Wacht
Functional Area : Related Record
Description : 
Reviewed By : 
Script Type : EMSE
General Purpose/Client Specific : General
Client developed for : 
Parameters : 
	recType: 4 level record type:  can be "*//*//*//*"
	capId: capId: Optional: capId to check
	
*/
function getRelatedRecdsDown (recType) { 
try{
	var itemCap = capId;
	if (arguments.length == 2)
		itemCap = arguments[1]; // use cap ID specified in args
	var relArr = getChildren(recType, itemCap);
	var allKids = new Array();
	var cnt=0;
	var i=0;
	var m=0;
	for (i in relArr){
		logDebug("kid added: " + relArr[i].getCustomID() );
		allKids[cnt]=relArr[i];
		cnt++;
	}
	while (allKids[m]){
		thisCapId =allKids[m];
		var hierArr = getChildren(recType,thisCapId);
		for (x in hierArr){
			var childAlreadyThere=false;
			for (mm in allKids)
				if (allKids[mm]==hierArr[x]) childAlreadyThere=true;
			if (!childAlreadyThere) {
				allKids[cnt]=hierArr[x];
				cnt++;
			}
		}
		m++;
	}
	return allKids;
}catch (err) {
	logDebug("A JavaScript Error occurred: getRelatedRecdsDown: " + err.message);
	logDebug(err.stack)
}};

/**
 * Updates the Core SR workflow based on rules defined in CONF_CRM_INTEGRATION_RULES
 * @memberof WTUA:ServiceRequest/CRM/CRM/NA
 * @example 
    var rules = 
    {
      "ServiceRequest/Graffiti/Graffiti/NA": {
        "Propogation_Rules": {
          "Update_Core_WF" : true,
          "Task": "Intake",
          "Set_Status": "Create Enforcement Case",
          "Fire_WTUA_Event": true
        }
      }
    };
    var coreReqCapId = createChild(...)
    updateCoreSRWorkflow(capId, coreReqCapId);
 *  @param crmCapId - capId of the CRM shadow record
 *  @param coreCapId - capId of the Core Service Request
 */
function updateCoreSRWorkflow(crmCapId, coreCapId) {

    //get CRM to core custom field map from CONF_CRM_INTEGRATION_RULES
    var coreRecType = getAppSpecific("Workorder Record Type", crmCapId);
    var coreRecTypeArr = coreRecType.split("/");
    var coreRecTypeString = coreRecTypeArr[0] + "/" + coreRecTypeArr[1] + "/" + coreRecTypeArr[2] + "/" + coreRecTypeArr[3];
    if (!rules) {
        logDebug("WARNING: CRM rules have not been defined. Configure the CONF_CRM_INTEGRATION_RULES JSON to configure the CRM to Core Integration.");
    }

    var rule = findRecordTypeRule(rules, coreRecTypeArr);
    if (rule.Update_Core_WF) {
        logDebug("Updating core record workflow.")
        if (rule.Set_Status) {
            holdId = capId;
            capId = coreCapId;
            closeTask(rule.Task, rule.Set_Status, "Auto routed request from CRM.", "Updated via script.");
            capId = holdId;
        }
        if (rule.Fire_WTUA_Event) {
            runWTUAForWFTaskWFStatus(rule.Task, null, rule.Set_Status, coreCapId);
        }
    }
}

/**
 * Updates Core SR custom fields from the shadow record custom list CRM INFO-CUSTOM
 * CRM SR custom field names must match Core SR custom field names exactly in order to sync
 * @example 
    var rules = 
    {
      "ServiceRequest/Graffiti/Graffiti/NA": {
        "customFieldMap": {
          "Where in the Public Right of Way?": "Location ROW"
        }
      }
    };
    var coreReqCapId = createChild(...)
    copyCustomFieldsFromCRM(capId, coreReqCapId);
 * @memberof WTUA:ServiceRequest/CRM/CRM/NA
 * @param crmCapId - capId of the CRM shadow record
 * @param coreCapId - capId of the Core Service Request
 */

function copyCustomFieldsFromCRM(crmCapId, coreCapId) {

    try {

        // validate parameters
        if (!crmCapId) { logDebug("Error in function updateCustomFieldsFromCRM(): CRM CapId Object is required: " + crmCapId); return false; }
        if (!coreCapId) { logDebug("Error in function updateCustomFieldsFromCRM(): Core CapId Object is required: " + coreCapId); return false; }

        //get CRM to core custom field map from CONF_CRM_INTEGRATION_RULES
        var coreRecType = getAppSpecific("Workorder Record Type", crmCapId);
        var coreRecTypeArr = coreRecType.split("/");
        var coreRecTypeString = coreRecTypeArr[0] + "/" + coreRecTypeArr[1] + "/" + coreRecTypeArr[2] + "/" + coreRecTypeArr[3];
        if (!rules) {
            logDebug("WARNING: CRM rules have not been defined. Configure the CONF_CRM_INTEGRATION_RULES JSON to configure the CRM to Core Integration.");
        }
        var crmRules = findRecordTypeRule(rules, coreRecTypeArr);
        var customFieldMap;
        if (crmRules) {
            customFieldMap = crmRules.Custom_Field_Map;
        }

        //copy the Request Type custom field
        editAppSpecific("Request Type", getAppSpecific("Request Type", crmCapId), coreCapId);

        //copy Core SR custom fields from the shadow record custom list CRM INFO-CUSTOM.
        var crmCustomFieldArray = loadASITable("CRM INFO-CUSTOM", crmCapId);
        for (row in crmCustomFieldArray) {
            // get the value from ASIT to compare
            var crmFieldName = crmCustomFieldArray[row]["Name"]; //logDebug("crmFieldName: " + crmFieldName);
            var crmFieldVal = crmCustomFieldArray[row]["Value"]; //logDebug("crmFieldVal: " + crmFieldVal);

            //if a custom field mapping exists use the custom mapping, 
            //else update the Core SR custom fields that match the CRM custom fields
            var coreFieldName = crmFieldName;
            if (customFieldMap && customFieldMap[crmFieldName]) {
                coreFieldName = customFieldMap[crmFieldName];
                logDebug("coreFieldName from map: " + coreFieldName);
            } else {
                logDebug("attempt to map exact match")
            }
            // update the Core SR custom fields that match the CRM custom fields
            editAppSpecific(coreFieldName, crmFieldVal, coreCapId);
        }
    } catch (err) {
        logDebug("**ERROR updating custom fields from CRM shadow record. " + err);
    }
}

/**
 * Checks for a valid address created from CRM. 
 * If no address was validated, try to perform a fuzzy search with the CRM full address string.
 * @memberof WTUA:ServiceRequest/CRM/CRM/NA
 */
function validateCRMAddress() {

    var addressValidated = false;

    //first check if there is already a valid address, else try to validate again
    var addresses = getRecordAddresses();
    if(addresses){
        if (addresses.length > 0) { // if there is an address on the shadow record (it was validated by CRM integration)
            logDebug("Address was validated by the CRM Integration.");
            addressValidated = true;
        } else { // else if no address on shadow record (it could not be validated, so we will try harder)
    
            var crmAddressString = getAppSpecific("Location"); //crm address saved in shadow custom field.Location
            var searchAddresses = parseAndSearchAddrFromCRM(crmAddressString, true); // enable fuzzy search because google maps doesn't match ArcGIS
    
            // TO DO: if the search returned 0 OR multiple matches, flag it for human validation
            if (!searchAddresses) { //
                logDebug("Requires Address Validation: No ref address could be found for: " + crmAddressString);
                return false;
            }
            if (searchAddresses) { //
                if(searchAddresses.length){
                    if(searchAddresses.length > 1){
                        logDebug("Requires Address Validation: multiple matches on ref address search.");
                        logDebug("Potential matches: ")
                        for (ra in searchAddresses) {
                            refAddress = searchAddresses[ra];
                            logDebug("		" + refAddress.getHouseNumberStart() + " " + refAddress.getStreetName() + ", Unit: " + refAddress.getUnitStart() + ", " + refAddress.getCity());
                        }
                    }
                }
            } else {
                refAddress = searchAddresses[0];
                refAddress.setPrimaryFlag("Y");
                var newAddrResult = aa.address.createAddressWithRefAddressModel(capId, refAddress);
                if (newAddrResult.getSuccess()) {
                    var newAddr = newAddrResult.getOutput();
                    logDebug("Successfully added address to record: " + newAddr);
                    //get parcel for the validate address
                    var addrUID = refAddress.getUID();
                    addParcelAndOwnerFromRefAddress(addrUID);
                    copyParcelGisObjects();
    
                    addressValidated = true;
                } else {
                    logDebug("ERROR creating record address from reference address. " + newAddrResult.getErrorMesssage());
                }
            }
        }
    }
    return addressValidated;
}

/**
 * Parses a CRM formatted address into distinct elements and searches for a Core reference address by house number and street name.
 * @memberof WTUA:ServiceRequest/CRM/CRM/NA
 * @example 
 var crmFormattedAddress = "316 Petaluma Boulevard North, Petaluma, CA, United States";
 var addrResults = 
 * @param {string} crmAddress CRM formatted address string
 */
function parseAndSearchAddrFromCRM(crmAddress,enableFuzzySearch) {
    //set enable fuzzy search to pass on to getRefAddressByHouseNbrStreetName()
    if(!enableFuzzySearch){
        enableFuzzySearch = false;
    }

    // use regex to parse the address into variables
    var re = /(^\d+\w*\s*(?:[\-\/]?\s*)?\d*\s*\d+\/?\s*\d*\s*)(.*?),(.*?),(.*?),(.*)/i;
    var parsedAddr = re.exec(crmAddress);
    var hseNum = parsedAddr[1];
    logDebug(" hseNum: " + hseNum);
    var strName = parsedAddr[2];
    logDebug(" strName: " + strName);
    var city = parsedAddr[3];
    logDebug(" city: " + city);
    var state = parsedAddr[4];
    logDebug(" state: " + state);
    var country = parsedAddr[5];
    logDebug(" country: " + country);

    var addressSearch = getRefAddressByHouseNbrStreetName(hseNum, strName, enableFuzzySearch);

    return addressSearch;

}

function findRecordTypeRule(rules, coreRecTypeArr) {
    //only return the first match
    var rule;

    rule = rules["*/*/*/*"];
    if (rule) {
        return rule;
    }

    rule = rules[coreRecTypeArr[0] + "/*/*/*"];
    if (rule) {
        return rule;
    }

    rule = rules[coreRecTypeArr[0] + "/" + coreRecTypeArr[1] + "/*/*"];
    if (rule) {
        return rule;
    }

    rule = rules[coreRecTypeArr[0] + "/" + coreRecTypeArr[1] + "/" + coreRecTypeArr[2] + "/*"];
    if (rule) {
        return rule;
    }

    rule = rules[coreRecTypeArr[0] + "/*/" + coreRecTypeArr[2] + "/*"];
    if (rule) {
        return rule;
    }

    rule = rules[coreRecTypeArr[0] + "/*/" + coreRecTypeArr[2] + "/" + coreRecTypeArr[3]];
    if (rule) {
        return rule;
    }

    rule = rules[coreRecTypeArr[0] + "/*/*/" + coreRecTypeArr[3]];
    if (rule) {
        return rule;
    }

    rule = rules[coreRecTypeArr[0] + "/" + coreRecTypeArr[1] + "/*/" + coreRecTypeArr[3]];
    if (rule) {
        return rule;
    }

    rule = rules[appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/" + appTypeArray[3]];
    if (rule) {
        return rule;
    }
    return rule;
}

/*
	This is a customized version of the createChild() master script. Enhanced to:
		- Set the EXT_UID on the copied transaction parcel
		- Get the ref parcel id (l1_parcel_nbr) from the reference parcel to set it on the transaction parcel
		- Copies the Parcel GIS object to the record
*/