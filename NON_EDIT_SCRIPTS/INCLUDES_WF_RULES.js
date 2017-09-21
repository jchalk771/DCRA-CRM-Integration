function propogateRule(parentChildArr, rulesArr, originalCapID) {
    if (parentChildArr && rulesArr && originalCapID) {
        for (x in parentChildArr) {
            var y = parentChildArr[x];
            var altId = y.getCustomID();
            var c = getApplication(altId);
            if (c) {
                capId = c;

                var params = aa.util.newHashtable();
                addPropogationParams(params);

                for (PropRule in rulesArr) {
                    var pr = rulesArr[PropRule];
                    if (pr.Task) {
                        if (pr.Activate_Task) {
                            activateTask(pr.Task);
                            logDebug("Task Activated: " + pr.Task);
                        }

                        if (pr.Assign_Task) {
                            assignTask(pr.Task, pr.Assign_Task);
                            logDebug("Task Assigned: Task: " + pr.Task + " User: " + pr.Assign_Task);
                        }

                        var comms = pr.Set_Comment_Static;
                        if (pr.Add_Standard_Comments) {
                            for (c in pr.Add_Standard_Comments) {
                                var add_StComment = pr.Add_Standard_Comments[c];
                                //get standard comment from group/type/commentid
                                var stdComment = getStandardComment(add_StComment.Type, add_StComment.Comment_ID);
                                if (stdComment != "") {
                                    if (comms != "") {
                                        comms += "<br />";
                                    }
                                    comms += stdComment;
                                }
                            }
                        }

                        comms = setParams(comms, params);

                        if (comms) {
                            if (comms != "") {
                                //editTaskComment(pr.Task, comms);
                                //logDebug("Comments Added To Workflow Task: " + pr.Task);
                                //logDebug("Comments Added: " + comms);
                                if (pr.Copy_To_Record_Comments) {
                                    createCapComment(comms, capId);
                                    logDebug("CapComment Created");
                                }
                            }
                        }

                        if (pr.Set_Status) {
                            if (pr.Disposition) {
                                switch (pr.Disposition.toString().toUpperCase()) {
                                    case "UPDATE":
                                        updateTask(pr.Task, pr.Set_Status, comms, "Updated via propogation rules");
                                        logDebug("Task Status Updated: " + pr.Task + "/" + pr.Set_Status + ": " + comms);
                                        break;
                                    case "CLOSE":
                                        closeTask(pr.Task, pr.Set_Status, comms, "Updated via propogation rules");
                                        logDebug("Task Closed: " + pr.Task + "/" + pr.Set_Status + ": " + comms);
                                        break;
                                    case "LOOP":
                                        loopTask(pr.Task, pr.Set_Status, comms, "Updated via propogation rules");
                                        logDebug("Loop Task: " + pr.Task + "/" + pr.Set_Status + ": " + comms);
                                        break;
                                    case "BRANCH":
                                        branchTask(pr.Task, pr.Set_Status, comms, "Updated via propogation rules");
                                        logDebug("Branching Task: " + pr.Task + "/" + pr.Set_Status + ": " + comms);
                                        break;
                                }
                            }
                        }
                    }

                    if (pr.Send_Notifications) {
                        propogationNotification(pr.Send_Notifications, capId, params);
                    }

                    if (pr.Fire_WTUA_Event) {
                        runWTUAForWFTaskWFStatus(pr.Task, pr.WF_Process, pr.Set_Status, capId, wfComment);
                    }
                }
            }
        }
        capId = originalCapID;
    }
    capId = originalCapID;
}

function process_WF_JSON_Rules(rules) {
    if (rules) {
        if (typeof(appTypeArray) == "object") {
            logDebug("Processing WF JSON Rules for */*/*/*");
            process_WF_JSON_Rules_Real(rules, "*/*/*/*");
            logDebug("Processed WF JSON Rules for */*/*/*");

            logDebug("Processing WF JSON Rules for " + appTypeArray[0] + "/*/*/*");
            process_WF_JSON_Rules_Real(rules, appTypeArray[0] + "/*/*/*");
            logDebug("Processed WF JSON Rules for " + appTypeArray[0] + "/*/*/*");

            logDebug("Processing WF JSON Rules for " + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
            process_WF_JSON_Rules_Real(rules, appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
            logDebug("Processed WF JSON Rules for " + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");

            logDebug("Processing WF JSON Rules for " + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
            process_WF_JSON_Rules_Real(rules, appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
            logDebug("Processed WF JSON Rules for " + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");

            logDebug("Processing WF JSON Rules for " + appTypeArray[0] + "/*/" + appTypeArray[2] + "/*");
            process_WF_JSON_Rules_Real(rules, appTypeArray[0] + "/*/" + appTypeArray[2] + "/*");
            logDebug("Processed WF JSON Rules for " + appTypeArray[0] + "/*/" + appTypeArray[2] + "/*");

            logDebug("Processing WF JSON Rules for " + appTypeArray[0] + "/*/" + appTypeArray[2] + "/" + appTypeArray[3]);
            process_WF_JSON_Rules_Real(rules, appTypeArray[0] + "/*/" + appTypeArray[2] + "/" + appTypeArray[3]);
            logDebug("Processed WF JSON Rules for " + appTypeArray[0] + "/*/" + appTypeArray[2] + "/" + appTypeArray[3]);

            logDebug("Processing WF JSON Rules for " + appTypeArray[0] + "/*/*/" + appTypeArray[3]);
            process_WF_JSON_Rules_Real(rules, appTypeArray[0] + "/*/*/" + appTypeArray[3]);
            logDebug("Processed WF JSON Rules for " + appTypeArray[0] + "/*/*/" + appTypeArray[3]);

            logDebug("Processing WF JSON Rules for " + appTypeArray[0] + "/" + appTypeArray[1] + "/*/" + appTypeArray[3]);
            process_WF_JSON_Rules_Real(rules, appTypeArray[0] + "/" + appTypeArray[1] + "/*/" + appTypeArray[3]);
            logDebug("Processed WF JSON Rules for " + appTypeArray[0] + "/" + appTypeArray[1] + "/*/" + appTypeArray[3]);

            logDebug("Processing WF JSON Rules for " + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/" + appTypeArray[3]);
            process_WF_JSON_Rules_Real(rules, appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/" + appTypeArray[3]);
            logDebug("Processed WF JSON Rules for " + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/" + appTypeArray[3]);
        }
    }
}



/**
 * 
 * @param {rules} rules 
 */
function process_WF_JSON_Rules_Real(rules, RecordTypeAlias) {
    logDebug("Processing Rules...");
    logDebug("RecordTypeAlias: " + RecordTypeAlias);
    var originalCapID = capId;

    if (rules) {
        var rule = rules[RecordTypeAlias];
        if (rule) {
            logDebug("We Have Rules For This Record Type: " + RecordTypeAlias);

            for (i in rule) {
                var r = rule[i];

                if (!wfTask) {
                    wfTask = ""
                }
                if (!wfStatus) {
                    wfStatus = ""
                }

                if (!r.Task) {
                    r.Task = wfTask;
                }
                if (!r.Status) {
                    r.Status = wfStatus;
                }


                logDebug("wfTask:" + wfTask);
                logDebug("r.Task:" + r.Task);
                logDebug("wfStatus:" + wfStatus);
                logDebug("r.Status:" + r.Status);

                if (wfTask.toString().toUpperCase() == r.Task.toString().toUpperCase() && wfStatus.toString().toUpperCase() == r.Status.toString().toUpperCase()) {
                    logDebug("We Have Rules For This Task & Status : Task='" + r.Task.toString() + "' Status='" + r.Status.toString()) + "'";
                    if (r.Propogation_Rules_Current_Record) {
                        logDebug("We Have Propogation Rules For The Current Record");
                        var singleArrayOfCap = [originalCapID]
                        propogateRule(singleArrayOfCap, r.Propogation_Rules_Current_Record, originalCapID);
                    }

                    if (r.Propogation_Rules_Other_Records) {
                        for (pr in r.Propogation_Rules_Other_Records) {
                            var z = r.Propogation_Rules_Other_Records[pr];

                            if (z.Record_Type && z.Propogation_Rules) {
                                logDebug("We Have A Record Type & Propogation Rules");

                                var parents = getParentsWithExclusions(z.Record_Type, z.Record_Types_Excluded)
                                propogateRule(parents, z.Propogation_Rules, originalCapID);


                                var children = getChildrenWithExclusions(z.Record_Type, capId, z.Record_Types_Excluded)
                                propogateRule(children, z.Propogation_Rules, originalCapID);
                            }
                        }
                    }

                    var params = aa.util.newHashtable();
                    addPropogationParams(params);

                    //Add Record Comments
                    if (r.Add_Record_Comments) {
                        logDebug("Record Comments");
                        for (c in r.Add_Record_Comments) {
                            var co = r.Add_Record_Comments[c];
                            if (co.Record_Types) {
                                var comm = getStandardComment(co.Type, co.Comment_ID, params);
                                if (comm != "") {
                                    logDebug("We have Comments to Add to Record");
                                    for (rt in co.Record_Types) {
                                        var RecType = co.Record_Types[rt];
                                        var rents = getParents(RecType);
                                        var childs = getChildren(RecType);

                                        if (rents) {
                                            logDebug("Rents....");
                                            addRecordComments(rents, comm);
                                            logDebug("Record Comment Added To Parents");
                                        }
                                        if (childs) {
                                            addRecordComments(childs, comm);
                                            logDebug("Record Comment Added To Children");
                                        }
                                    }
                                }
                            }
                        }
                    }

                    //Send Notifications
                    if (r.Send_Notifications) {
                        propogationNotification(r.Send_Notifications, capId, params);
                    }

                    //Update ASI Mapping
                    if (r.Update_ASI) {
                        logDebug("Update ASI");
                        for (v in r.Update_ASI) {
                            var z = r.Update_ASI[v];

                            if (z) {
                                var rType = z.Source_Record_Type;
                                if (rType) {
                                    if (z.Push_All_ASI_To_Record_Types) {
                                        for (m in z.Push_All_ASI_To_Record_Types) {
                                            var n = z.Push_All_ASI_To_Record_Types[m];

                                            //Check Match On Parents
                                            var p = getParents(n);
                                            for (l in p) {
                                                b = p[l];
                                                copyASIFields(capId, getApplication(b.getCustomID()));
                                                logDebug("Pushed All ASI To Parent");
                                            }

                                            //Check Match On Children
                                            var c = getChildren(n);
                                            for (f in c) {
                                                d = c[f];
                                                copyASIFields(capId, getApplication(d.getCustomID()));
                                                logDebug("Pushed All ASI To Children");
                                            }
                                        }
                                    }

                                    if (z.Updates) {
                                        for (k in z.Updates) {
                                            var source = z.Updates[k];

                                            var s_ASI_Value = source.Static_Value;
                                            if (!s_ASI_Value) {
                                                s_ASI_Value = getAppSpecific(source.ASI_Group + ":" + source.ASI_Field);
                                            }

                                            if (s_ASI_Value) {
                                                if (source.Update_To) {
                                                    for (t in source.Update_To) {
                                                        var u = source.Update_To[t];

                                                        //Check Match On Parents
                                                        var p = getParents(rType);
                                                        editASI(p, u.ASI_Group, u.ASI_Field, s_ASI_Value);
                                                        logDebug("Parent ASI Updated");

                                                        //Check Match On Children
                                                        var c = getChildren(rType);
                                                        editASI(c, u.ASI_Group, u.ASI_Field, s_ASI_Value);
                                                        logDebug("Child ASI Updated");
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    break;
                }
            }
        }
    }
}

function setParams(text, params) {
    if (text) {
        var keySet = params.keySet().toArray();
        for (x in keySet) {
            var k = keySet[x];
            var key = k;
            var value = params.get(key);
            text = text.toString().replace(key, value);
        }
        logDebug("Comment = " + text);
    } else {
        text = "";
    }
    return text;
}

function getStandardComment(type, commentID, params) {
    var comment = "";
    var scBusResult = aa.proxyInvoker.newInstance("com.accela.aa.aamain.review.StandardCommentBusiness");
    if (scBusResult.getSuccess()) {
        var scBus = scBusResult.getOutput();

        var scs = scBus.getStandardCommentByType(aa.getServiceProviderCode(), type);
        if (scs) {
            var a = scs.toArray();
            for (b in a) {
                var c = a[b];
                if (c.getDispDocumentID().toString().toUpperCase() == commentID.toUpperCase()) {
                    comment = c.getDispComment().toString();
                    //replace variables
                    if (params) {
                        comments = setParams(comments, params);
                    }
                    break;
                }
            }
        }
    }
    return comment;
}

function editASI(parentChildArr, ASI_Group, ASI_Field, s_ASI_Value) {
    for (x in parentChildArr) {
        var y = parentChildArr[x];
        editAppSpecific(ASI_Group + ":" + ASI_Field, s_ASI_Value, getApplication(y.getCustomID()));
    }
}

function addRecordComments(parentChildArr, comment, params) {
    for (x in parentChildArr) {
        var y = parentChildArr[x];

        //replace variables
        if (params) {
            comment = setParams(comment, params);
        }

        createCapComment(comment, getApplication(y.getCustomID()));
    }
}

function getChildrenWithExclusions(pCapType, pParentCapId, excludArr) {
    var children = [];
    var g_children = getChildren(pCapType, pParentCapId);
    for (c in g_children) {
        var child = g_children[c];
        if (!checkIfCapTypeInCapTypeArray(child, excludArr)) {
            children.push(child);
        }
    }
    return children;
}

function getParentsWithExclusions(pAppType, excludArr) {
    var parents = [];
    var g_parents = getParents(pAppType);
    for (p in g_parents) {
        var parent = g_parents[p];
        if (!checkIfCapTypeInCapTypeArray(parent, excludArr)) {
            parents.push(parent);
        }
    }
    return parents;
}

function checkIfCapTypeInCapTypeArray(c, arr) {
    if (c) {
        var _c = aa.cap.getCap(c.getID1(), c.getID2(), c.getID3()).getOutput();
        if (_c) {
            var ct = _c.capType;
            if (ct) {
                for (a in arr) {
                    var x = arr[a];
                    if (ct.toString.toUpperCase() == x.toString().toUpperCase()) {
                        return true;
                        break;
                    }
                }
            }
        }

    }
    return false;
}


//LS: modified 2017.08.03. Modified signature. Added capID
function addPropogationParams(params, capID) {
    addParameter(params, "$$appTypeString$$", appTypeString);
    addParameter(params, "$$capStatus$$", capStatus);
    addParameter(params, "$$parentCapId$$", parentCapId);

    getRecordParams4Notification(params);
    getPrimaryAddressLineParam4Notification(params);
    getPrimaryOwnerParams4Notification(params);
    
	addTSIAsParams(params);
}

//LS: added new Method
//Anthony.  I wasn't sure if capID has a global scope in this script so i passed it (and the calling method) as a parameter.
//			But if i can access a global var then the "capID" param is not needed.
function addTSIAsParams(params){
    var tsiArray = new Array();
    loadTaskSpecific(tsiArray);
    for (t in tsiArray){
        var TSI = tsiArray[t];
        var parmName = "$$TSI_" + t + "$$";
        addParameter(params, parmName, TSI );
    }
}

function propogationNotification(notifications, c, params) {
    var _capID = capId;
    if (c) {
        capId = c;
    }
    for (x in notifications) {
        var n = notifications[x];
        var from = n.From;
        var temp = n.Notification_Template;
        var cc = n.CC;
        var to = "";

        if (!params) {
            params = aa.util.newHashtable();
            addPropogationParams(params);
        }

        for (t in n.To_ContactTypes) {
            var ct = n.To_ContactTypes[t];
            logDebug("ct:" + ct);
            var par = params;
            getContactParams4Notification(par, ct);
            to = params.get("$$" + ct.toLowerCase() + "Email$$");
            logDebug("to:" + to);
            if (to) {
                sendNotification(from, to, cc, temp, par, null);
            }
            to = "";
        }
    }
    capId = _capID;
}

//
// matches:  returns true if value matches any of the following arguments
//
function _matches(eVal, argArray) {
    for (i in argArray) {
        var x = argArray[i];
        if (x == eVal) {
            return true;
        }
    }
    return false;
}

/*--------------------------------------------------------------------------------------------------------------------/
| Start ETW 06/13/14 Custom functions for runWTUA
/--------------------------------------------------------------------------------------------------------------------*/
function runWTUAForWFTaskWFStatus(vTaskName, vProcessCode, vStatus, vCapId, vComment) {
    /*---------------------------------------------------------------------------------------------------------/
    | Function Intent:
    |              This function is designed to run the WorkflowTaskUpdateAfter (WTUA) script actions.
    |              for the CapId provided.
    | Call Example:
    |              runWTUAForWFTaskWFStatus('PRMT_TRADE','Application Acceptance','Accepted',capId)
    |
    | 11/13/2013 - Ewylam
    |              Version 1 Created
    |
    | Required parameters in order:
    |              vTaskName = Name of task to run the event for. string
    |                                                 vProcessID = Workflow process that contains the task. string
    |                                                 vStepNum = Step number of the task to run the event for. number
    |              vStatus = Status to rqun the event for. string
    |              vCapId = CapId object
    |
    | Optional paramaters:
    |              None
    /----------------------------------------------------------------------------------------------------------*/

    //Set Variables
    //Save the existing system variables so that they can be reset after the function
    var pvScriptName = vScriptName;
    var pvEventName = vEventName;
    var pprefix = ((typeof prefix === 'undefined') ? null : prefix);
    var pcapId = capId;
    var pcap = cap;
    var pcapIDString = capIDString;
    var pappTypeResult = appTypeResult;
    var pappTypeString = appTypeString;
    var pappTypeArray = appTypeArray;
    var pcapName = capName;
    var pcapStatus = capStatus;
    var pfileDateObj = fileDateObj;
    var pfileDate = fileDate;
    var pfileDateYYYYMMDD = fileDateYYYYMMDD;
    var pparcelArea = parcelArea;
    var pestValue = estValue;
    var pbalanceDue = balanceDue;
    var phouseCount = houseCount;
    var pfeesInvoicedTotal = feesInvoicedTotal;
    var pcapDetail = capDetail;
    var pAInfo = AInfo;
    var ppartialCap;
    if (typeof(partialCap) !== "undefined") {
        ppartialCap = partialCap;
    } else {
        ppartialCap = null;
    }
    var pparentCapId;
    if (typeof(parentCapId) !== "undefined") {
        pparentCapId = parentCapId;
    } else {
        pparentCapId = null;
    }
    var pCreatedByACA;
    if (typeof(CreatedByACA) !== "undefined") {
        pCreatedByACA = CreatedByACA;
    } else {
        CreatedByACA = 'N';
    }

    //WTUA Specific variables.
    var pwfTask = ((typeof wfTask === 'undefined') ? null : wfTask);
    var pwfTaskObj = ((typeof wfTaskObj === 'undefined') ? null : wfTaskObj);
    var pwfStatus = ((typeof wfStatus === 'undefined') ? null : wfStatus);
    var pwfDate = ((typeof wfDate === 'undefined') ? null : wfDate);
    var pwfDateMMDDYYYY = ((typeof wfDateMMDDYYYY === 'undefined') ? null : wfDateMMDDYYYY);
    var pwfProcessID = ((typeof wfProcessID === 'undefined') ? null : wfProcessID);
    var pwfStep = ((typeof wfStep === 'undefined') ? null : wfStep);
    var pwfComment = ((typeof wfComment === 'undefined') ? null : wfComment);
    var pwfNote = ((typeof wfNote === 'undefined') ? null : wfNote);
    var pwfDue = ((typeof wfDue === 'undefined') ? null : wfDue);
    var pwfHours = ((typeof wfHours === 'undefined') ? null : wfHours);
    var pwfProcess = ((typeof wfProcess === 'undefined') ? null : wfProcess);
    var pwfObj = ((typeof wfObj === 'undefined') ? null : wfObj);
    var pwfStaffUserID = ((typeof wfStaffUserID === 'undefined') ? null : wfStaffUserID);
    var ptimeAccountingArray = ((typeof timeAccountingArray === 'undefined') ? null : timeAccountingArray);
    var pwfTimeBillable = ((typeof wfTimeBillable === 'undefined') ? null : wfTimeBillable);
    var pwfTimeOT = ((typeof wfTimeOT === 'undefined') ? null : wfTimeOT);
    var ptimeLogModel = ((typeof timeLogModel === 'undefined') ? null : timeLogModel);
    var ptimeLogSeq = ((typeof timeLogSeq === 'undefined') ? null : timeLogSeq);
    var pdateLogged = ((typeof dateLogged === 'undefined') ? null : dateLogged);
    var pstartTime = ((typeof startTime === 'undefined') ? null : startTime);
    var pendTime = ((typeof endTime === 'undefined') ? null : endTime);
    var ptimeElapsedHours = ((typeof timeElapsedHours === 'undefined') ? null : timeElapsedHours);
    var ptimeElapsedMin = ((typeof timeElapsedMin === 'undefined') ? null : timeElapsedMin);

    //Run simulate the WTUA event for the child record
    logDebug("***Begin WTUA Sim");

    vScriptName = "function: runWTUAForWFTaskWFStatus";
    vEventName = "WorkflowTaskUpdateAfter";

    prefix = 'WTUA';

    //Clear global variables so that they can be set with the supplied
    capId = null;
    cap = null;
    capIDString = "";
    appTypeResult = null;
    appTypeString = "";
    appTypeArray = new Array();
    capName = null;
    capStatus = null;
    fileDateObj = null;
    fileDate = null;
    fileDateYYYYMMDD = null;
    parcelArea = 0;
    estValue = 0;
    balanceDue = 0;
    houseCount = 0;
    feesInvoicedTotal = 0;
    capDetail = "";
    AInfo = new Array();
    partialCap = false;
    parentCapId = null;
    CreatedByACA = 'N';

    //Clear event specific variables;
    //wfTask = null;
    wfTaskObj = null;
    wfStatus = null;
    wfDate = null;
    wfDateMMDDYYYY = null;
    wfProcessID = null;
    wfStep = null;
    wfComment = null;
    wfNote = null;
    wfDue = null;
    wfHours = null;
    wfProcess = null;
    wfObj = null;
    wfStaffUserID = null;
    timeAccountingArray = null;
    wfTimeBillable = null;
    wfTimeOT = null;
    timeLogModel = null;
    timeLogSeq = null;
    dateLogged = null;
    startTime = null;
    endTime = null;
    timeElapsedHours = null;
    timeElapsedMin = null;

    //Set capId to the vCapId variable provided
    capId = vCapId;
    //Update global variables based on child capId
    if (capId !== null) {
        parentCapId = pcapId;
        servProvCode = capId.getServiceProviderCode();
        capIDString = capId.getCustomID();
        cap = aa.cap.getCap(capId).getOutput();
        appTypeResult = cap.getCapType();
        appTypeString = appTypeResult.toString();
        appTypeArray = appTypeString.split("/");
        if (appTypeArray[0].substr(0, 1) != "_") {
            var currentUserGroupObj = aa.userright.getUserRight(appTypeArray[0], currentUserID).getOutput();
            if (currentUserGroupObj)
                currentUserGroup = currentUserGroupObj.getGroupName();
        }
        capName = cap.getSpecialText();
        capStatus = cap.getCapStatus();
        partialCap = !cap.isCompleteCap();
        fileDateObj = cap.getFileDate();
        fileDate = "" + fileDateObj.getMonth() + "/" + fileDateObj.getDayOfMonth() + "/" + fileDateObj.getYear();
        fileDateYYYYMMDD = dateFormatted(fileDateObj.getMonth(), fileDateObj.getDayOfMonth(), fileDateObj.getYear(), "YYYY-MM-DD");
        var valobj = aa.finance.getContractorSuppliedValuation(capId, null).getOutput();
        if (valobj.length) {
            estValue = valobj[0].getEstimatedValue();
            calcValue = valobj[0].getCalculatedValue();
            feeFactor = valobj[0].getbValuatn().getFeeFactorFlag();
        }

        var capDetailObjResult = aa.cap.getCapDetail(capId);
        if (capDetailObjResult.getSuccess()) {
            capDetail = capDetailObjResult.getOutput();
            houseCount = capDetail.getHouseCount();
            feesInvoicedTotal = capDetail.getTotalFee();
            balanceDue = capDetail.getBalance();
        }
        loadAppSpecific(AInfo);
        loadTaskSpecific(AInfo);
        loadParcelAttributes(AInfo);
        loadASITables();

        CreatedByACA = 'N';

        logDebug("<B>EMSE Script Results for " + capIDString + "</B>");
        logDebug("capId = " + capId.getClass());
        logDebug("cap = " + cap.getClass());
        logDebug("currentUserID = " + currentUserID);
        logDebug("currentUserGroup = " + currentUserGroup);
        logDebug("systemUserObj = " + systemUserObj.getClass());
        logDebug("appTypeString = " + appTypeString);
        logDebug("capName = " + capName);
        logDebug("capStatus = " + capStatus);
        logDebug("fileDate = " + fileDate);
        logDebug("fileDateYYYYMMDD = " + fileDateYYYYMMDD);
        logDebug("sysDate = " + sysDate.getClass());
        logDebug("parcelArea = " + parcelArea);
        logDebug("estValue = " + estValue);
        logDebug("calcValue = " + calcValue);
        logDebug("feeFactor = " + feeFactor);

        logDebug("houseCount = " + houseCount);
        logDebug("feesInvoicedTotal = " + feesInvoicedTotal);
        logDebug("balanceDue = " + balanceDue);
    }

    //set WTUA specific variables
    wfTask = vTaskName; // Workflow Task Triggered event
    wfStatus = vStatus; // Status of workflow that triggered event
    wfComment = vComment;
    wfDate = sysDate.getYear() + '-' + sysDate.getMonth() + '-' + sysDate.getDayOfMonth(); // date of status of workflow that triggered event
    wfDateMMDDYYYY = wfDate.substr(5, 2) + "/" + wfDate.substr(8, 2) + "/" + wfDate.substr(0, 4); // date of status of workflow that triggered event in format MM/DD/YYYY
    // Go get other task details
    wfObj = aa.workflow.getTasks(capId).getOutput();
    for (i in wfObj) {
        fTask = wfObj[i];
        //if (fTask.getTaskDescription() == wfTask && fTask.getProcessID() == vProcessID && fTask.getStepNumber() == vStepNum) {
        logDebug("fTask.getTaskDescription():" + fTask.getTaskDescription());
        logDebug("fTask.getProcessCode():" + fTask.getProcessCode());
        if (fTask.getTaskDescription().toString().toUpperCase() == wfTask.toString().toUpperCase()) {
            wfStep = fTask.getStepNumber();
            wfProcess = fTask.getProcessCode();
            wfProcessID = fTask.getProcessID();
            //wfComment = fTask.getDispositionComment();
            wfNote = fTask.getDispositionNote();
            wfDue = fTask.getDueDate();
            wfHours = fTask.getHoursSpent();
            wfTaskObj = fTask
        }
    }
    if (!wfTaskObj) {
        logDebug("WARNING: Could not find WF Task: " + wfTask + " on the record: " + capIDString);
        return false;
    }
    logDebug("wfTask = " + wfTask);
    logDebug("wfTaskObj = " + wfTaskObj.getClass());
    logDebug("wfStatus = " + wfStatus);
    logDebug("wfDate = " + wfDate);
    logDebug("wfDateMMDDYYYY = " + wfDateMMDDYYYY);
    logDebug("wfStep = " + wfStep);
    logDebug("wfComment = " + wfComment);
    logDebug("wfProcess = " + wfProcess);
    logDebug("wfProcessID = " + wfProcessID);
    logDebug("wfNote = " + wfNote);

    /* Added for version 1.7 */
    wfStaffUserID = aa.env.getValue("StaffUserID");
    timeAccountingArray = new Array()
    if (aa.env.getValue("TimeAccountingArray") != "") {
        timeAccountingArray = aa.env.getValue("TimeAccountingArray");
    }
    wfTimeBillable = aa.env.getValue("Billable");
    wfTimeOT = aa.env.getValue("Overtime");

    logDebug("wfStaffUserID = " + wfStaffUserID);
    logDebug("wfTimeBillable = " + wfTimeBillable);
    logDebug("wfTimeOT = " + wfTimeOT);
    logDebug("wfHours = " + wfHours);

    if (timeAccountingArray != null || timeAccountingArray != '') {
        for (var i = 0; i < timeAccountingArray.length; i++) {
            timeLogModel = timeAccountingArray[i];
            timeLogSeq = timeLogModel.getTimeLogSeq();
            dateLogged = timeLogModel.getDateLogged();
            startTime = timeLogModel.getStartTime();
            endTime = timeLogModel.getEndTime();
            timeElapsedHours = timeLogModel.getTimeElapsed().getHours();
            timeElapsedMin = timeLogModel.getTimeElapsed().getMinutes();

            logDebug("TAtimeLogSeq = " + timeLogSeq);
            logDebug("TAdateLogged = " + dateLogged);
            logDebug("TAstartTime = " + startTime);
            logDebug("TAendTime = " + endTime);
            logDebug("TAtimeElapsedHours = " + timeElapsedHours);
            logDebug("TAtimeElapsedMin = " + timeElapsedMin);
        }
    }
    //

    //Run WTUA scripts for the variables provided
    doScriptActions();

    //Reset global variables to the original records
    vScriptName = pvScriptName;
    vEventName = pvEventName;
    prefix = pprefix;
    capId = pcapId;
    cap = pcap;
    capIDString = pcapIDString;
    appTypeResult = pappTypeResult;
    appTypeString = pappTypeString;
    appTypeArray = pappTypeArray;
    capName = pcapName;
    capStatus = pcapStatus;
    fileDateObj = pfileDateObj;
    fileDate = pfileDate;
    fileDateYYYYMMDD = pfileDateYYYYMMDD;
    parcelArea = pparcelArea;
    estValue = pestValue;
    feesInvoicedTotal = pfeesInvoicedTotal;
    balanceDue = pbalanceDue;
    houseCount = phouseCount;
    feesInvoicedTotal = pfeesInvoicedTotal;
    capDetail = pcapDetail;
    AInfo = pAInfo;
    partialCap = ppartialCap;
    parentCapId = pparentCapId;
    CreatedByACA = pCreatedByACA;

    //Reset WTUA Specific variables.
    wfTask = pwfTask;
    wfTaskObj = pwfTaskObj;
    wfStatus = pwfStatus;
    wfDate = pwfDate;
    wfDateMMDDYYYY = pwfDateMMDDYYYY;
    wfProcessID = pwfProcessID;
    wfStep = pwfStep;
    wfComment = pwfComment;
    wfNote = pwfNote;
    wfDue = pwfDue;
    wfHours = pwfHours;
    wfProcess = pwfProcess;
    wfObj = pwfObj;
    wfStaffUserID = pwfStaffUserID;
    timeAccountingArray = ptimeAccountingArray;
    wfTimeBillable = pwfTimeBillable;
    wfTimeOT = pwfTimeOT;
    timeLogModel = ptimeLogModel;
    timeLogSeq = ptimeLogSeq;
    dateLogged = pdateLogged;
    startTime = pstartTime;
    endTime = pendTime;
    timeElapsedHours = ptimeElapsedHours;
    timeElapsedMin = ptimeElapsedMin;

    logDebug("***End WTUA Sim");

}
/*--------------------------------------------------------------------------------------------------------------------/
| End ETW 06/13/14 Custom functions for runWTUA
/--------------------------------------------------------------------------------------------------------------------*/