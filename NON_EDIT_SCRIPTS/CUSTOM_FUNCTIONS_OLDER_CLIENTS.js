function getScriptText(vScriptName, servProvCode, useProductScripts) {
	if (!servProvCode)
		servProvCode = aa.getServiceProviderCode();
	vScriptName = vScriptName.toUpperCase();
	var emseBiz = aa.proxyInvoker.newInstance("com.accela.aa.emse.emse.EMSEBusiness").getOutput();
	try {
		if (useProductScripts) {
			var emseScript = emseBiz.getMasterScript(aa.getServiceProviderCode(), vScriptName);
		} else {
			var emseScript = emseBiz.getScriptByPK(aa.getServiceProviderCode(), vScriptName, "ADMIN");
		}
		return emseScript.getScriptText() + "";
	} catch (err) {
		return "";
	}
}


function getRefAddressByHouseNbrStreetName(pHseNum, pStrName) {
	var strName = pStrName;
	var enableFuzzySearch=false;
	if (arguments.length == 3) {
		enableFuzzySearch = arguments[2]; 
	}
    if(enableFuzzySearch) {
		 strName = strName.match(/^(\S+)\s/).slice(1) + "%";
	}
    var refAddressesResult = aa.address.getRefAddressByHouseRangeStreetName(parseInt(pHseNum),parseInt(pHseNum),strName.toString());
    if (refAddressesResult.getSuccess()) {
        refAddresses = refAddressesResult.getOutput();
		if(refAddresses) { 
			logDebug("Found matching reference address for: " + pHseNum + " " + strName + ". Count: " + refAddresses.length);
			return refAddresses; //returns only the first address found
		}
		else {
			logDebug("No matching reference address found for: " + pHseNum + " " + strName);
		}
    }
    else {
        logDebug("ERROR Getting Address: " + refAddressesResult.getErrorMessage());
    }
	return false;
}

/**
 * Updates the record description of the current record.
 * @example
    editRecordDescription(crmRequestDesc, coreReqCapId);
 * @memberof INCLUDES_CUSTOM
 *  @param description - Enter the updated record description.
 *  @param capId - Optional capId object
 */
function editRecordDescription(description) { //optional cap id

  var itemCap = capId;
  if (arguments.length > 1) itemCap = arguments[1]; // use cap ID specified in args

  var coreWorkDescScriptModel = aa.cap.getCapWorkDesByPK(itemCap).getOutput();
  var coreWorkDescModel = coreWorkDescScriptModel.getCapWorkDesModel();
  coreWorkDescModel.setDescription(description);
  var editCoreDescResult = aa.cap.editCapWorkDes(coreWorkDescModel);
  if(editCoreDescResult.getSuccess()) {
    logDebug("Successfully updated core SR description: " + description);
  }
  else {
    logDebug("Failed to update core SR description: " + editCoreDescResult.getErrorMessage());
  }
}


/**
 *  Copies all record comments from source to target record.
 *  @memberof INCLUDES_CUSTOM
 *  @param vCapId - capIdModel of the source record 
 *  @param vTargetId - capIdModel of the target record
 */
function copyRecordComments(vCapId,vTargetId) {

	try {
		//create commentScriptModel to get existing comments
		var capCommentScriptModel= aa.cap.createCapCommentScriptModel();
		capCommentScriptModel.setCapIDModel(vCapId);
		capCommentScriptModel.setCommentType("APP LEVEL COMMENT");
		var capCommentModel=capCommentScriptModel.getCapCommentModel();

		// get comments from source capId
		var getCommentResult = aa.cap.getCapComment(capCommentModel);
		if(getCommentResult.getSuccess()){
			var comments = getCommentResult.getOutput();
			for(c in comments) {
				var comment = comments[c];

				//copy the comment to the target record
				var capCommentModel=capCommentScriptModel.getCapCommentModel();
				//exploreObject(capCommentModel);
				capCommentModel.setCapIDModel(vTargetId);
				capCommentModel.setCommentType("APP LEVEL COMMENT");
				capCommentModel.setSynopsis("");
				capCommentModel.setText(comment.getText());
				capCommentModel.setAuditUser(comment.getAuditUser());
				capCommentModel.setAuditStatus("A");

				capCommentModel.setAuditDate(convertDate(comment.getAuditDate()));
				var copyCommentResult = aa.cap.createCapComment(capCommentModel);
				if(copyCommentResult.getSuccess()) {
					logDebug("Comment copied successfully");
				}
				else {
					logDebug("Error copying comment: " + copyCommentResult.getErrorMessage());
					return false;
				}
			}
		}

	}
	catch(err) {
		logDebug("**ERROR in copyRecordComments(): " + err);
	}
}


/**
 *  Copies all attachments between two records.
 *  @memberof INCLUDES_CUSTOM
 *  @param pFromCapId - capIdModel of the source record
 *  @param pToCapId - capIdModel of the target record
 */
function copyDocuments(pFromCapId, pToCapId) {

	//Copies all attachments (documents) from pFromCapId to pToCapId
	var vFromCapId = pFromCapId;
	var vToCapId = pToCapId;
	var categoryArray = new Array();
	
	// third optional parameter is comma delimited list of categories to copy.
	if (arguments.length > 2) {
		categoryList = arguments[2];
		categoryArray = categoryList.split(",");
	}

	var capDocResult = aa.document.getDocumentListByEntity(capId,"CAP");
	if(capDocResult.getSuccess()) {
		if(capDocResult.getOutput().size() > 0) {
	    	for(docInx = 0; docInx < capDocResult.getOutput().size(); docInx++) {
	    		var documentObject = capDocResult.getOutput().get(docInx);
	    		currDocCat = "" + documentObject.getDocCategory();
	    		if (categoryArray.length == 0 || exists(currDocCat, categoryArray)) {
	    			// download the document content
					var useDefaultUserPassword = true;
					//If useDefaultUserPassword = true, there is no need to set user name & password, but if useDefaultUserPassword = false, we need define EDMS user name & password.
					var EMDSUsername = null;
					var EMDSPassword = null;
					var downloadResult = aa.document.downloadFile2Disk(documentObject, documentObject.getModuleName(), EMDSUsername, EMDSPassword, useDefaultUserPassword);
					if(downloadResult.getSuccess()) {
						var path = downloadResult.getOutput();
						//logDebug("path=" + path);
					}
					var tmpEntId = vToCapId.getID1() + "-" + vToCapId.getID2() + "-" + vToCapId.getID3();
					documentObject.setDocumentNo(null);
					documentObject.setCapID(vToCapId)
					documentObject.setEntityID(tmpEntId);
	
					// Open and process file
					try {
						// put together the document content - use java.io.FileInputStream
						var newContentModel = aa.document.newDocumentContentModel().getOutput();
						inputstream = new java.io.FileInputStream(path);
						newContentModel.setDocInputStream(inputstream);
						documentObject.setDocumentContent(newContentModel);
						var newDocResult = aa.document.createDocument(documentObject);
						if (newDocResult.getSuccess()) {
							newDocResult.getOutput();
							logDebug("Successfully copied document: " + documentObject.getFileName());
						}
						else {
							logDebug("Failed to copy document: " + documentObject.getFileName());
							logDebug(newDocResult.getErrorMessage());
						}
					}
					catch (err) {
						logDebug("Error copying document: " + err.message);
						return false;
					}
				}
	    	} // end for loop
		}
    }
}


function getRecordAddresses() { //optional capId parameter
	var itemCap = capId
		if (arguments.length > 1)
			itemCap = arguments[1]; // use cap ID specified in args
		var addResult = aa.address.getAddressByCapId(itemCap);
	if (addResult.getSuccess()) {
		var addArray = addResult.getOutput();
		return addArray;
	} else {
		logDebug("Could not return address: " + addResult.getErrorMessage());
		return false;
	}
	logDebug("Could not find an address of type: " + aType);
	return false;
}

function createRefContactsFromCapContactsAndLink(pCapId, contactTypeArray, ignoreAttributeArray, replaceCapContact, overwriteRefContact, refContactExists)
	{

	// contactTypeArray is either null (all), or an array or contact types to process
	//
	// ignoreAttributeArray is either null (none), or an array of attributes to ignore when creating a REF contact
	//
	// replaceCapContact not implemented yet
	//
	// overwriteRefContact -- if true, will refresh linked ref contact with CAP contact data
	//
	// refContactExists is a function for REF contact comparisons.
	//
	// Version 2.0 Update:   This function will now check for the presence of a standard choice "REF_CONTACT_CREATION_RULES". 
	// This setting will determine if the reference contact will be created, as well as the contact type that the reference contact will 
	// be created with.  If this setting is configured, the contactTypeArray parameter will be ignored.   The "Default" in this standard
	// choice determines the default action of all contact types.   Other types can be configured separately.   
	// Each contact type can be set to "I" (create ref as individual), "O" (create ref as organization), 
	// "F" (follow the indiv/org flag on the cap contact), "D" (Do not create a ref contact), and "U" (create ref using transaction contact type).
	
	var standardChoiceForBusinessRules = "REF_CONTACT_CREATION_RULES";
	
	
	var ingoreArray = new Array();
	if (arguments.length > 1) ignoreArray = arguments[1];
	
	var defaultContactFlag = lookup(standardChoiceForBusinessRules,"Default");

	var c = aa.people.getCapContactByCapID(pCapId).getOutput()
	var cCopy = aa.people.getCapContactByCapID(pCapId).getOutput()  // must have two working datasets

	for (var i in c)
	   {
	   var ruleForRefContactType = "U"; // default behavior is create the ref contact using transaction contact type
	   var con = c[i];

	   var p = con.getPeople();
	   
	   var contactFlagForType = lookup(standardChoiceForBusinessRules,p.getContactType());
	   
	   if (!defaultContactFlag && !contactFlagForType) // standard choice not used for rules, check the array passed
	   	{
	   	if (contactTypeArray && !exists(p.getContactType(),contactTypeArray))
			continue;  // not in the contact type list.  Move along.
		}
	
	   if (!contactFlagForType && defaultContactFlag) // explicit contact type not used, use the default
	   	{
	   	ruleForRefContactType = defaultContactFlag;
	   	}
	   
	   if (contactFlagForType) // explicit contact type is indicated
	   	{
	   	ruleForRefContactType = contactFlagForType;
	   	}

	   if (ruleForRefContactType.equals("D"))
	   	continue;
	   	
	   var refContactType = "";
	   
	   switch(ruleForRefContactType)
	   	{
		   case "U":
		     refContactType = p.getContactType();
		     break;
		   case "I":
		     refContactType = "Individual";
		     break;
		   case "O":
		     refContactType = "Organization";
		     break;
		   case "F":
		     if (p.getContactTypeFlag() && p.getContactTypeFlag().equals("organization"))
		     	refContactType = "Organization";
		     else
		     	refContactType = "Individual";
		     break;
		}
	   
	   var refContactNum = con.getCapContactModel().getRefContactNumber();
	   
	   if (refContactNum)  // This is a reference contact.   Let's refresh or overwrite as requested in parms.
	   	{
	   	if (overwriteRefContact)
	   		{
	   		p.setContactSeqNumber(refContactNum);  // set the ref seq# to refresh
	   		p.setContactType(refContactType);
	   		
	   						var a = p.getAttributes();
			
							if (a)
								{
								var ai = a.iterator();
								while (ai.hasNext())
									{
									var xx = ai.next();
									xx.setContactNo(refContactNum);
									}
					}
					
	   		var r = aa.people.editPeopleWithAttribute(p,p.getAttributes());
	   		
			if (!r.getSuccess()) 
				logDebug("WARNING: couldn't refresh reference people : " + r.getErrorMessage()); 
			else
				logDebug("Successfully refreshed ref contact #" + refContactNum + " with CAP contact data"); 
			}
			
	   	if (replaceCapContact)
	   		{
				// To Be Implemented later.   Is there a use case?
			}
			
	   	}
	   	else  // user entered the contact freehand.   Let's create or link to ref contact.
	   	{
			var ccmSeq = p.getContactSeqNumber();

			var existingContact = refContactExists(p);  // Call the custom function to see if the REF contact exists

			var p = cCopy[i].getPeople();  // get a fresh version, had to mangle the first for the search

			if (existingContact)  // we found a match with our custom function.  Use this one.
				{
					refPeopleId = existingContact;
				}
			else  // did not find a match, let's create one
				{

				var a = p.getAttributes();

				if (a)
					{
					//
					// Clear unwanted attributes
					var ai = a.iterator();
					while (ai.hasNext())
						{
						var xx = ai.next();
						if (ignoreAttributeArray && exists(xx.getAttributeName().toUpperCase(),ignoreAttributeArray))
							ai.remove();
						}
					}
				
				p.setContactType(refContactType);
				var r = aa.people.createPeopleWithAttribute(p,a);

				if (!r.getSuccess())
					{logDebug("WARNING: couldn't create reference people : " + r.getErrorMessage()); continue; }

				//
				// createPeople is nice and updates the sequence number to the ref seq
				//

				var p = cCopy[i].getPeople();
				var refPeopleId = p.getContactSeqNumber();

				logDebug("Successfully created reference contact #" + refPeopleId);
				
				// Need to link to an existing public user.
				
			    var getUserResult = aa.publicUser.getPublicUserByEmail(con.getEmail())
			    if (getUserResult.getSuccess() && getUserResult.getOutput()) {
			        var userModel = getUserResult.getOutput();
			        logDebug("createRefContactsFromCapContactsAndLink: Found an existing public user: " + userModel.getUserID());
					
					if (refPeopleId)	{
						logDebug("createRefContactsFromCapContactsAndLink: Linking this public user with new reference contact : " + refPeopleId);
						aa.licenseScript.associateContactWithPublicUser(userModel.getUserSeqNum(), refPeopleId);
						}
					}
				}

			//
			// now that we have the reference Id, we can link back to reference
			//

		    var ccm = aa.people.getCapContactByPK(pCapId,ccmSeq).getOutput().getCapContactModel();

		    ccm.setRefContactNumber(refPeopleId);
		    r = aa.people.editCapContact(ccm);

		    if (!r.getSuccess())
				{ logDebug("WARNING: error updating cap contact model : " + r.getErrorMessage()); }
			else
				{ logDebug("Successfully linked ref contact " + refPeopleId + " to cap contact " + ccmSeq);}


	    }  // end if user hand entered contact 
	}  // end for each CAP contact
} // end function

function comparePeopleStandard(peop)
	{

	/* 
	
		this function will be passed as a parameter to the createRefContactsFromCapContactsAndLink function.
		takes a single peopleModel as a parameter, and will return the sequence number of the first G6Contact result
		returns null if there are no matches
	
		Best Practice Template Version uses the following algorithm:
		
		1.  Match on SSN/FEIN if either exist
		2.  else, match on Email Address if it exists
		3.  else, match on First, Middle, Last Name combined with birthdate if all exist
		
		This function can use attributes if desired
	*/
	

	if (peop.getSocialSecurityNumber() || peop.getFein())
		{
		var qryPeople = aa.people.createPeopleModel().getOutput().getPeopleModel();
		
		logDebug("we have a SSN " + peop.getSocialSecurityNumber() + " or FEIN, checking on that");
		qryPeople.setSocialSecurityNumber(peop.getSocialSecurityNumber());
		qryPeople.setFein(peop.getFein());
		
		var r = aa.people.getPeopleByPeopleModel(qryPeople);
		
		if (!r.getSuccess())  { logDebug("WARNING: error searching for people : " + r.getErrorMessage()); return false; }

		var peopResult = r.getOutput();
		
		if (peopResult.length > 0)
			{
			logDebug("Searched for a REF Contact, " + peopResult.length + " matches found! returning the first match : " + peopResult[0].getContactSeqNumber() );
			return peopResult[0].getContactSeqNumber();
			}
		}
		
	if (peop.getEmail())
		{
		var qryPeople = aa.people.createPeopleModel().getOutput().getPeopleModel();
		
		qryPeople.setServiceProviderCode(aa.getServiceProviderCode());	
	
		logDebug("we have an email, checking on that");
		qryPeople.setEmail(peop.getEmail());

		var r = aa.people.getPeopleByPeopleModel(qryPeople);

		if (!r.getSuccess())  { logDebug("WARNING: error searching for people : " + r.getErrorMessage()); return false; }

		var peopResult = r.getOutput();

		if (peopResult.length > 0)
			{
			logDebug("Searched for a REF Contact, " + peopResult.length + " matches found! returning the first match : " + peopResult[0].getContactSeqNumber() );
			return peopResult[0].getContactSeqNumber();
			}
		}

	if (peop.getBirthDate() && peop.getLastName() && peop.getFirstName())
		{
		var qryPeople = aa.people.createPeopleModel().getOutput().getPeopleModel();		
		logDebug("we have a name and birthdate, checking on that");
		qryPeople.setBirthDate(peop.getBirthDate());
		qryPeople.setLastName(peop.getLastName());
		qryPeople.setFirstName(peop.getFirstName());
		qryPeople.setMiddleName(peop.getMiddleName());

		var r = aa.people.getPeopleByPeopleModel(qryPeople);

		if (!r.getSuccess())  { logDebug("WARNING: error searching for people : " + r.getErrorMessage()); return false; }

		var peopResult = r.getOutput();

		if (peopResult.length > 0)
			{
			logDebug("Searched for a REF Contact, " + peopResult.length + " matches found! returning the first match : " + peopResult[0].getContactSeqNumber() );
			return peopResult[0].getContactSeqNumber();
			}
		}
		
	logDebug("ComparePeople did not find a match");
		return false;
	}
 
