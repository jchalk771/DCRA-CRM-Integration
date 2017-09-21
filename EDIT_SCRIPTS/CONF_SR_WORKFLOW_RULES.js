var r = {
  "ServiceRequest/*/*/*": [
    {
      "Task": [
        "Intake"
      ],
      "Status": [
        "Closed"
      ],
      "Propogation_Rules_Other_Records": [
        {
          "Record_Type": "ServiceRequest/CRM/CRM/NA",
          "Record_Types_Excluded": null,
          "Propogation_Rules": [
            {
              "WF_Process": "SR_CRM",
              "Task": "Investigation",
              "Activate_Task": false,
              "Assign_Task": null,
              "Make_Public": true,
              "Copy_To_Record_Comments": true,
              "Set_Comment_Static": "Your service request has been received. Service Request # $$altID$$",
              "Set_Status": "Work Order",
              "Disposition": "CLOSE",
              "Copy_wfComment_On_Fire_WTUA_Event": true,
              "Fire_WTUA_Event": true
            }
          ]
        }
      ]
    },
    {
      "Task": [
        "Intake"
      ],
      "Status": [
        "Closed - Duplicate"
      ],
      "Propogation_Rules_Other_Records": [
        {
          "Record_Type": "ServiceRequest/CRM/CRM/NA",
          "Record_Types_Excluded": null,
          "Propogation_Rules": [
            {
              "WF_Process": "SR_CRM",
              "Task": "Investigation",
              "Activate_Task": false,
              "Assign_Task": null,
              "Make_Public": true,
              "Copy_To_Record_Comments": true,
              "Set_Comment_Static": "Your service request has been received. Service Request # $$altID$$ has been determined to be a duplicate and has been closed.",
              "Set_Status": "Close",
              "Disposition": "CLOSE",
              "Copy_wfComment_On_Fire_WTUA_Event": false,
              "Fire_WTUA_Event": true
            },
            {
              "WF_Process": "SR_CRM",
              "Task": "Work Order",
              "Activate_Task": false,
              "Assign_Task": null,
              "Make_Public": true,
              "Set_Status": "Close",
              "Disposition": "CLOSE",
              "Copy_wfComment_On_Fire_WTUA_Event": false,
              "Fire_WTUA_Event": true
            }
          ]
        }
      ]
    },
    {
      "Task": [
        "Intake"
      ],
      "Status": [
        "Closed - Referred"
      ],
      "Propogation_Rules_Other_Records": [
        {
          "Record_Type": "ServiceRequest/CRM/CRM/NA",
          "Record_Types_Excluded": null,
          "Propogation_Rules": [
            {
              "WF_Process": "SR_CRM",
              "Task": "Investigation",
              "Activate_Task": false,
              "Assign_Task": null,
              "Make_Public": true,
              "Copy_To_Record_Comments": true,
              "Set_Comment_Static": "Service Request # $$altID$$ has been completed.",
              "Set_Status": "Close",
              "Disposition": "CLOSE",
              "Copy_wfComment_On_Fire_WTUA_Event": false,
              "Fire_WTUA_Event": true
            },
            {
              "WF_Process": "SR_CRM",
              "Task": "Work Order",
              "Activate_Task": false,
              "Assign_Task": null,
              "Make_Public": true,
              "Set_Status": "Close",
              "Disposition": "CLOSE",
              "Copy_wfComment_On_Fire_WTUA_Event": false,
              "Fire_WTUA_Event": true
            }
          ]
        }
      ]
    }
  ]
};