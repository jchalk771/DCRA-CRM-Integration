var r = {
  "Complaint/Property Maintenance/NA/NA": [
    {
      "Task": [
        "Intake"
      ],
      "Status": [
        "Accepted"
      ],
      "Propogation_Rules_Other_Records": [
        {
          "Record_Type": "ServiceRequest/CRM/CRM/NA",
          "Record_Types_Excluded": null,
          "Propogation_Rules": [
            {
              "WF_Process": "SR_CRM2",
              "Task": "Investigation",
              "Activate_Task": false,
              "Assign_Task": null,
              "Make_Public": true,
              "Copy_To_Record_Comments": true,
              "Fire_WTUA_Event": true,
              "Set_Comment_Static": "Your Property Maintenance Request has been accepted. Complaint Record# $$altID$$",
              "Set_Status": "Work Order",
              "Disposition": "CLOSE",
              "Copy_wfComment_On_Fire_WTUA_Event": true
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
        "Duplicated"
      ],
      "Propogation_Rules_Other_Records": [
        {
          "Record_Type": "ServiceRequest/CRM/CRM/NA",
          "Record_Types_Excluded": null,
          "Propogation_Rules": [
            {
              "WF_Process": "SR_CRM2",
              "Task": "Investigation",
              "Activate_Task": false,
              "Assign_Task": null,
              "Make_Public": true,
              "Copy_To_Record_Comments": true,
              "Set_Comment_Static": "Your Property Maintenance Request has been received. Complaint Record# $$altID$$ has been determined to be a duplicate and has been closed.",
              "Set_Status": "Close",
              "Disposition": "CLOSE",
              "Copy_wfComment_On_Fire_WTUA_Event": true,
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
        "Referred, Complaint Closed"
      ],
      "Propogation_Rules_Other_Records": [
        {
          "Record_Type": "ServiceRequest/CRM/CRM/NA",
          "Record_Types_Excluded": null,
          "Propogation_Rules": [
            {
              "WF_Process": "SR_CRM2",
              "Task": "Investigation",
              "Activate_Task": false,
              "Assign_Task": null,
              "Make_Public": true,
              "Copy_To_Record_Comments": true,
              "Set_Comment_Static": "Property Maintenance Request # $$altID$$ has been completed.",
              "Set_Status": "Close",
              "Disposition": "CLOSE",
              "Copy_wfComment_On_Fire_WTUA_Event": true,
              "Fire_WTUA_Event": true
            },
            {
              "WF_Process": "SR_CRM2",
              "Task": "Work Order",
              "Activate_Task": false,
              "Assign_Task": null,
              "Make_Public": true,
              "Set_Status": "Close",
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
        "Investigation"
      ],
      "Status": [
        "No Violation, Corrected By Owner, Legal Decision, Referred to Another Agency"
      ],
      "Propogation_Rules_Other_Records": [
        {
          "Record_Type": "ServiceRequest/CRM/CRM/NA",
          "Record_Types_Excluded": null,
          "Propogation_Rules": [
            {
              "WF_Process": "SR_CRM2",
              "Task": "Investigation",
              "Activate_Task": false,
              "Assign_Task": null,
              "Make_Public": true,
              "Copy_To_Record_Comments": true,
              "Set_Comment_Static": "Property Maintenance Request # $$altID$$ has been completed.",
              "Set_Status": "Close",
              "Disposition": "CLOSE",
              "Copy_wfComment_On_Fire_WTUA_Event": true,
              "Fire_WTUA_Event": true
            },
            {
              "WF_Process": "SR_CRM2",
              "Task": "Work Order",
              "Activate_Task": false,
              "Assign_Task": null,
              "Make_Public": true,
              "Set_Status": "Close",
              "Disposition": "CLOSE",
              "Copy_wfComment_On_Fire_WTUA_Event": true,
              "Fire_WTUA_Event": true
            }
          ]
        }
      ]
    }
  ],
  "Complaint/Housing/Noise/NA": [
    {
      "Task": [
        "Intake"
      ],
      "Status": [
        "Accepted"
      ],
      "Propogation_Rules_Other_Records": [
        {
          "Record_Type": "ServiceRequest/CRM/CRM/NA",
          "Record_Types_Excluded": null,
          "Propogation_Rules": [
            {
              "WF_Process": "SR_CRM2",
              "Task": "Investigation",
              "Activate_Task": false,
              "Assign_Task": null,
              "Make_Public": true,
              "Copy_To_Record_Comments": true,
              "Fire_WTUA_Event": true,
              "Set_Comment_Static": "Your Noise Report has been accepted. Complaint Record# $$altID$$",
              "Set_Status": "Work Order",
              "Disposition": "CLOSE",
              "Copy_wfComment_On_Fire_WTUA_Event": true
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
        "Duplicated"
      ],
      "Propogation_Rules_Other_Records": [
        {
          "Record_Type": "ServiceRequest/CRM/CRM/NA",
          "Record_Types_Excluded": null,
          "Propogation_Rules": [
            {
              "WF_Process": "SR_CRM2",
              "Task": "Investigation",
              "Activate_Task": false,
              "Assign_Task": null,
              "Make_Public": true,
              "Copy_To_Record_Comments": true,
              "Set_Comment_Static": "Your Noice Report has been received. Complaint Record# $$altID$$ has been determined to be a duplicate and has been closed.",
              "Set_Status": "Close",
              "Disposition": "CLOSE",
              "Copy_wfComment_On_Fire_WTUA_Event": true,
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
        "Referred, Complaint Closed"
      ],
      "Propogation_Rules_Other_Records": [
        {
          "Record_Type": "ServiceRequest/CRM/CRM/NA",
          "Record_Types_Excluded": null,
          "Propogation_Rules": [
            {
              "WF_Process": "SR_CRM2",
              "Task": "Investigation",
              "Activate_Task": false,
              "Assign_Task": null,
              "Make_Public": true,
              "Copy_To_Record_Comments": true,
              "Set_Comment_Static": "Noise Report # $$altID$$ has been completed.",
              "Set_Status": "Close",
              "Disposition": "CLOSE",
              "Copy_wfComment_On_Fire_WTUA_Event": true,
              "Fire_WTUA_Event": true
            },
            {
              "WF_Process": "SR_CRM2",
              "Task": "Work Order",
              "Activate_Task": false,
              "Assign_Task": null,
              "Make_Public": true,
              "Set_Status": "Close",
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
        "Investigation"
      ],
      "Status": [
        "No Violation, Corrected By Owner, Legal Decision, Referred to Another Agency"
      ],
      "Propogation_Rules_Other_Records": [
        {
          "Record_Type": "ServiceRequest/CRM/CRM/NA",
          "Record_Types_Excluded": null,
          "Propogation_Rules": [
            {
              "WF_Process": "SR_CRM2",
              "Task": "Investigation",
              "Activate_Task": false,
              "Assign_Task": null,
              "Make_Public": true,
              "Copy_To_Record_Comments": true,
              "Set_Comment_Static": "Noise Report # $$altID$$ has been completed.",
              "Set_Status": "Close",
              "Disposition": "CLOSE",
              "Copy_wfComment_On_Fire_WTUA_Event": true,
              "Fire_WTUA_Event": true
            },
            {
              "WF_Process": "SR_CRM2",
              "Task": "Work Order",
              "Activate_Task": false,
              "Assign_Task": null,
              "Make_Public": true,
              "Set_Status": "Close",
              "Disposition": "CLOSE",
              "Copy_wfComment_On_Fire_WTUA_Event": true,
              "Fire_WTUA_Event": true
            }
          ]
        }
      ]
    }
  ],
  "Complaint/Housing/Broken Pipe/NA": [
    {
      "Task": [
        "Intake"
      ],
      "Status": [
        "Accepted"
      ],
      "Propogation_Rules_Other_Records": [
        {
          "Record_Type": "ServiceRequest/CRM/CRM/NA",
          "Record_Types_Excluded": null,
          "Propogation_Rules": [
            {
              "WF_Process": "SR_CRM2",
              "Task": "Investigation",
              "Activate_Task": false,
              "Assign_Task": null,
              "Make_Public": true,
              "Copy_To_Record_Comments": true,
              "Fire_WTUA_Event": true,
              "Set_Comment_Static": "Your Broken Pipe Report has been accepted. Complaint Record# $$altID$$",
              "Set_Status": "Work Order",
              "Disposition": "CLOSE",
              "Copy_wfComment_On_Fire_WTUA_Event": true
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
        "Duplicated"
      ],
      "Propogation_Rules_Other_Records": [
        {
          "Record_Type": "ServiceRequest/CRM/CRM/NA",
          "Record_Types_Excluded": null,
          "Propogation_Rules": [
            {
              "WF_Process": "SR_CRM2",
              "Task": "Investigation",
              "Activate_Task": false,
              "Assign_Task": null,
              "Make_Public": true,
              "Copy_To_Record_Comments": true,
              "Set_Comment_Static": "Your Broken Pipe Report has been received. Complaint Record# $$altID$$ has been determined to be a duplicate and has been closed.",
              "Set_Status": "Close",
              "Disposition": "CLOSE",
              "Copy_wfComment_On_Fire_WTUA_Event": true,
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
        "Referred, Complaint Closed"
      ],
      "Propogation_Rules_Other_Records": [
        {
          "Record_Type": "ServiceRequest/CRM/CRM/NA",
          "Record_Types_Excluded": null,
          "Propogation_Rules": [
            {
              "WF_Process": "SR_CRM2",
              "Task": "Investigation",
              "Activate_Task": false,
              "Assign_Task": null,
              "Make_Public": true,
              "Copy_To_Record_Comments": true,
              "Set_Comment_Static": "Broken Pipe Report # $$altID$$ has been completed.",
              "Set_Status": "Close",
              "Disposition": "CLOSE",
              "Copy_wfComment_On_Fire_WTUA_Event": true,
              "Fire_WTUA_Event": true
            },
            {
              "WF_Process": "SR_CRM2",
              "Task": "Work Order",
              "Activate_Task": false,
              "Assign_Task": null,
              "Make_Public": true,
              "Set_Status": "Close",
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
        "Investigation"
      ],
      "Status": [
        "No Violation, Corrected By Owner, Legal Decision, Referred to Another Agency"
      ],
      "Propogation_Rules_Other_Records": [
        {
          "Record_Type": "ServiceRequest/CRM/CRM/NA",
          "Record_Types_Excluded": null,
          "Propogation_Rules": [
            {
              "WF_Process": "SR_CRM2",
              "Task": "Investigation",
              "Activate_Task": false,
              "Assign_Task": null,
              "Make_Public": true,
              "Copy_To_Record_Comments": true,
              "Set_Comment_Static": "Broken Pipe Report # $$altID$$ has been completed.",
              "Set_Status": "Close",
              "Disposition": "CLOSE",
              "Copy_wfComment_On_Fire_WTUA_Event": true,
              "Fire_WTUA_Event": true
            },
            {
              "WF_Process": "SR_CRM2",
              "Task": "Work Order",
              "Activate_Task": false,
              "Assign_Task": null,
              "Make_Public": true,
              "Set_Status": "Close",
              "Disposition": "CLOSE",
              "Copy_wfComment_On_Fire_WTUA_Event": true,
              "Fire_WTUA_Event": true
            }
          ]
        }
      ]
    }
  ],
  "Complaint/Housing/Sewer Back-Up/NA": [
    {
      "Task": [
        "Intake"
      ],
      "Status": [
        "Accepted"
      ],
      "Propogation_Rules_Other_Records": [
        {
          "Record_Type": "ServiceRequest/CRM/CRM/NA",
          "Record_Types_Excluded": null,
          "Propogation_Rules": [
            {
              "WF_Process": "SR_CRM2",
              "Task": "Investigation",
              "Activate_Task": false,
              "Assign_Task": null,
              "Make_Public": true,
              "Copy_To_Record_Comments": true,
              "Fire_WTUA_Event": true,
              "Set_Comment_Static": "Your Sewer Backup Report has been accepted. Complaint Record# $$altID$$",
              "Set_Status": "Work Order",
              "Disposition": "CLOSE",
              "Copy_wfComment_On_Fire_WTUA_Event": true
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
        "Duplicated"
      ],
      "Propogation_Rules_Other_Records": [
        {
          "Record_Type": "ServiceRequest/CRM/CRM/NA",
          "Record_Types_Excluded": null,
          "Propogation_Rules": [
            {
              "WF_Process": "SR_CRM2",
              "Task": "Investigation",
              "Activate_Task": false,
              "Assign_Task": null,
              "Make_Public": true,
              "Copy_To_Record_Comments": true,
              "Set_Comment_Static": "Your Sewer Backup Report has been received. Complaint Record# $$altID$$ has been determined to be a duplicate and has been closed.",
              "Set_Status": "Close",
              "Disposition": "CLOSE",
              "Copy_wfComment_On_Fire_WTUA_Event": true,
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
        "Referred, Complaint Closed"
      ],
      "Propogation_Rules_Other_Records": [
        {
          "Record_Type": "ServiceRequest/CRM/CRM/NA",
          "Record_Types_Excluded": null,
          "Propogation_Rules": [
            {
              "WF_Process": "SR_CRM2",
              "Task": "Investigation",
              "Activate_Task": false,
              "Assign_Task": null,
              "Make_Public": true,
              "Copy_To_Record_Comments": true,
              "Set_Comment_Static": "Sewer Backup Report # $$altID$$ has been completed.",
              "Set_Status": "Close",
              "Disposition": "CLOSE",
              "Copy_wfComment_On_Fire_WTUA_Event": true,
              "Fire_WTUA_Event": true
            },
            {
              "WF_Process": "SR_CRM2",
              "Task": "Work Order",
              "Activate_Task": false,
              "Assign_Task": null,
              "Make_Public": true,
              "Set_Status": "Close",
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
        "Investigation"
      ],
      "Status": [
        "No Violation, Corrected By Owner, Legal Decision, Referred to Another Agency"
      ],
      "Propogation_Rules_Other_Records": [
        {
          "Record_Type": "ServiceRequest/CRM/CRM/NA",
          "Record_Types_Excluded": null,
          "Propogation_Rules": [
            {
              "WF_Process": "SR_CRM2",
              "Task": "Investigation",
              "Activate_Task": false,
              "Assign_Task": null,
              "Make_Public": true,
              "Copy_To_Record_Comments": true,
              "Set_Comment_Static": "Sewer Backup Report # $$altID$$ has been completed.",
              "Set_Status": "Close",
              "Disposition": "CLOSE",
              "Copy_wfComment_On_Fire_WTUA_Event": true,
              "Fire_WTUA_Event": true
            },
            {
              "WF_Process": "SR_CRM2",
              "Task": "Work Order",
              "Activate_Task": false,
              "Assign_Task": null,
              "Make_Public": true,
              "Set_Status": "Close",
              "Disposition": "CLOSE",
              "Copy_wfComment_On_Fire_WTUA_Event": true,
              "Fire_WTUA_Event": true
            }
          ]
        }
      ]
    }
  ],
  "Complaint/Housing/No Utilities/NA": [
    {
      "Task": [
        "Intake"
      ],
      "Status": [
        "Accepted"
      ],
      "Propogation_Rules_Other_Records": [
        {
          "Record_Type": "ServiceRequest/CRM/CRM/NA",
          "Record_Types_Excluded": null,
          "Propogation_Rules": [
            {
              "WF_Process": "SR_CRM2",
              "Task": "Investigation",
              "Activate_Task": false,
              "Assign_Task": null,
              "Make_Public": true,
              "Copy_To_Record_Comments": true,
              "Fire_WTUA_Event": true,
              "Set_Comment_Static": "Your No Utility Report has been accepted. Complaint Record# $$altID$$",
              "Set_Status": "Work Order",
              "Disposition": "CLOSE",
              "Copy_wfComment_On_Fire_WTUA_Event": true
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
        "Duplicated"
      ],
      "Propogation_Rules_Other_Records": [
        {
          "Record_Type": "ServiceRequest/CRM/CRM/NA",
          "Record_Types_Excluded": null,
          "Propogation_Rules": [
            {
              "WF_Process": "SR_CRM2",
              "Task": "Investigation",
              "Activate_Task": false,
              "Assign_Task": null,
              "Make_Public": true,
              "Copy_To_Record_Comments": true,
              "Set_Comment_Static": "Your No Utility Report has been received. Complaint Record# $$altID$$ has been determined to be a duplicate and has been closed.",
              "Set_Status": "Close",
              "Disposition": "CLOSE",
              "Copy_wfComment_On_Fire_WTUA_Event": true,
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
        "Referred, Complaint Closed"
      ],
      "Propogation_Rules_Other_Records": [
        {
          "Record_Type": "ServiceRequest/CRM/CRM/NA",
          "Record_Types_Excluded": null,
          "Propogation_Rules": [
            {
              "WF_Process": "SR_CRM2",
              "Task": "Investigation",
              "Activate_Task": false,
              "Assign_Task": null,
              "Make_Public": true,
              "Copy_To_Record_Comments": true,
              "Set_Comment_Static": "No Utility Report # $$altID$$ has been completed.",
              "Set_Status": "Close",
              "Disposition": "CLOSE",
              "Copy_wfComment_On_Fire_WTUA_Event": true,
              "Fire_WTUA_Event": true
            },
            {
              "WF_Process": "SR_CRM2",
              "Task": "Work Order",
              "Activate_Task": false,
              "Assign_Task": null,
              "Make_Public": true,
              "Set_Status": "Close",
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
        "Investigation"
      ],
      "Status": [
        "No Violation, Corrected By Owner, Legal Decision, Referred to Another Agency"
      ],
      "Propogation_Rules_Other_Records": [
        {
          "Record_Type": "ServiceRequest/CRM/CRM/NA",
          "Record_Types_Excluded": null,
          "Propogation_Rules": [
            {
              "WF_Process": "SR_CRM2",
              "Task": "Investigation",
              "Activate_Task": false,
              "Assign_Task": null,
              "Make_Public": true,
              "Copy_To_Record_Comments": true,
              "Set_Comment_Static": "No Utility Report # $$altID$$ has been completed.",
              "Set_Status": "Close",
              "Disposition": "CLOSE",
              "Copy_wfComment_On_Fire_WTUA_Event": true,
              "Fire_WTUA_Event": true
            },
            {
              "WF_Process": "SR_CRM2",
              "Task": "Work Order",
              "Activate_Task": false,
              "Assign_Task": null,
              "Make_Public": true,
              "Set_Status": "Close",
              "Disposition": "CLOSE",
              "Copy_wfComment_On_Fire_WTUA_Event": true,
              "Fire_WTUA_Event": true
            }
          ]
        }
      ]
    }
  ],
  "Complaint/Housing/Infestation/NA": [
    {
      "Task": [
        "Intake"
      ],
      "Status": [
        "Accepted"
      ],
      "Propogation_Rules_Other_Records": [
        {
          "Record_Type": "ServiceRequest/CRM/CRM/NA",
          "Record_Types_Excluded": null,
          "Propogation_Rules": [
            {
              "WF_Process": "SR_CRM2",
              "Task": "Investigation",
              "Activate_Task": false,
              "Assign_Task": null,
              "Make_Public": true,
              "Copy_To_Record_Comments": true,
              "Fire_WTUA_Event": true,
              "Set_Comment_Static": "Your Infestation Report has been accepted. Complaint Record# $$altID$$",
              "Set_Status": "Work Order",
              "Disposition": "CLOSE",
              "Copy_wfComment_On_Fire_WTUA_Event": true
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
        "Duplicated"
      ],
      "Propogation_Rules_Other_Records": [
        {
          "Record_Type": "ServiceRequest/CRM/CRM/NA",
          "Record_Types_Excluded": null,
          "Propogation_Rules": [
            {
              "WF_Process": "SR_CRM2",
              "Task": "Investigation",
              "Activate_Task": false,
              "Assign_Task": null,
              "Make_Public": true,
              "Copy_To_Record_Comments": true,
              "Set_Comment_Static": "Your Infestation Report has been received. Complaint Record# $$altID$$ has been determined to be a duplicate and has been closed.",
              "Set_Status": "Close",
              "Disposition": "CLOSE",
              "Copy_wfComment_On_Fire_WTUA_Event": true,
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
        "Referred, Complaint Closed"
      ],
      "Propogation_Rules_Other_Records": [
        {
          "Record_Type": "ServiceRequest/CRM/CRM/NA",
          "Record_Types_Excluded": null,
          "Propogation_Rules": [
            {
              "WF_Process": "SR_CRM2",
              "Task": "Investigation",
              "Activate_Task": false,
              "Assign_Task": null,
              "Make_Public": true,
              "Copy_To_Record_Comments": true,
              "Set_Comment_Static": "Infestation Report # $$altID$$ has been completed.",
              "Set_Status": "Close",
              "Disposition": "CLOSE",
              "Copy_wfComment_On_Fire_WTUA_Event": true,
              "Fire_WTUA_Event": true
            },
            {
              "WF_Process": "SR_CRM2",
              "Task": "Work Order",
              "Activate_Task": false,
              "Assign_Task": null,
              "Make_Public": true,
              "Set_Status": "Close",
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
        "Investigation"
      ],
      "Status": [
        "No Violation, Corrected By Owner, Legal Decision, Referred to Another Agency"
      ],
      "Propogation_Rules_Other_Records": [
        {
          "Record_Type": "ServiceRequest/CRM/CRM/NA",
          "Record_Types_Excluded": null,
          "Propogation_Rules": [
            {
              "WF_Process": "SR_CRM2",
              "Task": "Investigation",
              "Activate_Task": false,
              "Assign_Task": null,
              "Make_Public": true,
              "Copy_To_Record_Comments": true,
              "Set_Comment_Static": "Infestation Report # $$altID$$ has been completed.",
              "Set_Status": "Close",
              "Disposition": "CLOSE",
              "Copy_wfComment_On_Fire_WTUA_Event": true,
              "Fire_WTUA_Event": true
            },
            {
              "WF_Process": "SR_CRM2",
              "Task": "Work Order",
              "Activate_Task": false,
              "Assign_Task": null,
              "Make_Public": true,
              "Set_Status": "Close",
              "Disposition": "CLOSE",
              "Copy_wfComment_On_Fire_WTUA_Event": true,
              "Fire_WTUA_Event": true
            }
          ]
        }
      ]
    }
  ],
  "Complaint/Housing/Routine Maintenance/NA": [
    {
      "Task": [
        "Intake"
      ],
      "Status": [
        "Accepted"
      ],
      "Propogation_Rules_Other_Records": [
        {
          "Record_Type": "ServiceRequest/CRM/CRM/NA",
          "Record_Types_Excluded": null,
          "Propogation_Rules": [
            {
              "WF_Process": "SR_CRM2",
              "Task": "Investigation",
              "Activate_Task": false,
              "Assign_Task": null,
              "Make_Public": true,
              "Copy_To_Record_Comments": true,
              "Fire_WTUA_Event": true,
              "Set_Comment_Static": "Your Routine Maintenance Issue has been accepted. Complaint Record# $$altID$$",
              "Set_Status": "Work Order",
              "Disposition": "CLOSE",
              "Copy_wfComment_On_Fire_WTUA_Event": true
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
        "Duplicated"
      ],
      "Propogation_Rules_Other_Records": [
        {
          "Record_Type": "ServiceRequest/CRM/CRM/NA",
          "Record_Types_Excluded": null,
          "Propogation_Rules": [
            {
              "WF_Process": "SR_CRM2",
              "Task": "Investigation",
              "Activate_Task": false,
              "Assign_Task": null,
              "Make_Public": true,
              "Copy_To_Record_Comments": true,
              "Set_Comment_Static": "Your Routine Maintence Issue has been received. Complaint Record# $$altID$$ has been determined to be a duplicate and has been closed.",
              "Set_Status": "Close",
              "Disposition": "CLOSE",
              "Copy_wfComment_On_Fire_WTUA_Event": true,
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
        "Referred, Complaint Closed"
      ],
      "Propogation_Rules_Other_Records": [
        {
          "Record_Type": "ServiceRequest/CRM/CRM/NA",
          "Record_Types_Excluded": null,
          "Propogation_Rules": [
            {
              "WF_Process": "SR_CRM2",
              "Task": "Investigation",
              "Activate_Task": false,
              "Assign_Task": null,
              "Make_Public": true,
              "Copy_To_Record_Comments": true,
              "Set_Comment_Static": "Routine Maintenance Issue # $$altID$$ has been completed.",
              "Set_Status": "Close",
              "Disposition": "CLOSE",
              "Copy_wfComment_On_Fire_WTUA_Event": true,
              "Fire_WTUA_Event": true
            },
            {
              "WF_Process": "SR_CRM2",
              "Task": "Work Order",
              "Activate_Task": false,
              "Assign_Task": null,
              "Make_Public": true,
              "Set_Status": "Close",
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
        "Investigation"
      ],
      "Status": [
        "No Violation, Corrected By Owner, Legal Decision, Referred to Another Agency"
      ],
      "Propogation_Rules_Other_Records": [
        {
          "Record_Type": "ServiceRequest/CRM/CRM/NA",
          "Record_Types_Excluded": null,
          "Propogation_Rules": [
            {
              "WF_Process": "SR_CRM2",
              "Task": "Investigation",
              "Activate_Task": false,
              "Assign_Task": null,
              "Make_Public": true,
              "Copy_To_Record_Comments": true,
              "Set_Comment_Static": "Routine Maintenance Issue # $$altID$$ has been completed.",
              "Set_Status": "Close",
              "Disposition": "CLOSE",
              "Copy_wfComment_On_Fire_WTUA_Event": true,
              "Fire_WTUA_Event": true
            },
            {
              "WF_Process": "SR_CRM2",
              "Task": "Work Order",
              "Activate_Task": false,
              "Assign_Task": null,
              "Make_Public": true,
              "Set_Status": "Close",
              "Disposition": "CLOSE",
              "Copy_wfComment_On_Fire_WTUA_Event": true,
              "Fire_WTUA_Event": true
            }
          ]
        }
      ]
    }
  ],
  "Complaint/Illegal Construction/NA/NA": [
    {
      "Task": [
        "Intake"
      ],
      "Status": [
        "Accepted"
      ],
      "Propogation_Rules_Other_Records": [
        {
          "Record_Type": "ServiceRequest/CRM/CRM/NA",
          "Record_Types_Excluded": null,
          "Propogation_Rules": [
            {
              "WF_Process": "SR_CRM2",
              "Task": "Investigation",
              "Activate_Task": false,
              "Assign_Task": null,
              "Make_Public": true,
              "Copy_To_Record_Comments": true,
              "Fire_WTUA_Event": true,
              "Set_Comment_Static": "Your Illegal Construction Report has been accepted. Complaint Record# $$altID$$",
              "Set_Status": "Work Order",
              "Disposition": "CLOSE",
              "Copy_wfComment_On_Fire_WTUA_Event": true
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
        "Duplicated"
      ],
      "Propogation_Rules_Other_Records": [
        {
          "Record_Type": "ServiceRequest/CRM/CRM/NA",
          "Record_Types_Excluded": null,
          "Propogation_Rules": [
            {
              "WF_Process": "SR_CRM2",
              "Task": "Investigation",
              "Activate_Task": false,
              "Assign_Task": null,
              "Make_Public": true,
              "Copy_To_Record_Comments": true,
              "Set_Comment_Static": "Your Illegal Construction Report has been received. Complaint Record# $$altID$$ has been determined to be a duplicate and has been closed.",
              "Set_Status": "Close",
              "Disposition": "CLOSE",
              "Copy_wfComment_On_Fire_WTUA_Event": true,
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
        "Referred, Complaint Closed"
      ],
      "Propogation_Rules_Other_Records": [
        {
          "Record_Type": "ServiceRequest/CRM/CRM/NA",
          "Record_Types_Excluded": null,
          "Propogation_Rules": [
            {
              "WF_Process": "SR_CRM2",
              "Task": "Investigation",
              "Activate_Task": false,
              "Assign_Task": null,
              "Make_Public": true,
              "Copy_To_Record_Comments": true,
              "Set_Comment_Static": "Illegal Construction Report # $$altID$$ has been completed.",
              "Set_Status": "Close",
              "Disposition": "CLOSE",
              "Copy_wfComment_On_Fire_WTUA_Event": true,
              "Fire_WTUA_Event": true
            },
            {
              "WF_Process": "SR_CRM2",
              "Task": "Work Order",
              "Activate_Task": false,
              "Assign_Task": null,
              "Make_Public": true,
              "Set_Status": "Close",
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
        "Investigation"
      ],
      "Status": [
        "No Violation, Corrected By Owner, Legal Decision, Referred to Another Agency"
      ],
      "Propogation_Rules_Other_Records": [
        {
          "Record_Type": "ServiceRequest/CRM/CRM/NA",
          "Record_Types_Excluded": null,
          "Propogation_Rules": [
            {
              "WF_Process": "SR_CRM2",
              "Task": "Investigation",
              "Activate_Task": false,
              "Assign_Task": null,
              "Make_Public": true,
              "Copy_To_Record_Comments": true,
              "Set_Comment_Static": "Illegal Construction Report # $$altID$$ has been completed.",
              "Set_Status": "Close",
              "Disposition": "CLOSE",
              "Copy_wfComment_On_Fire_WTUA_Event": true,
              "Fire_WTUA_Event": true
            },
            {
              "WF_Process": "SR_CRM2",
              "Task": "Work Order",
              "Activate_Task": false,
              "Assign_Task": null,
              "Make_Public": true,
              "Set_Status": "Close",
              "Disposition": "CLOSE",
              "Copy_wfComment_On_Fire_WTUA_Event": true,
              "Fire_WTUA_Event": true
            }
          ]
        }
      ]
    }
  ]
};