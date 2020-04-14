import { createReducer } from './utils';
import { USER_TYPE } from '../constants/actionReducerConstants';
//import { setAsyncStorage, resetUserDetails } from '../Utils';

const initialState = {
  userDetails: {
    company_url: '',
    telephone: '',
    usernameOrEmailAddress: '',
    password: '',
    login: true,
    ticket: '',
    tenancyName: '',
    userName: '',
    firstName: '',
    lastName: '',
    employeeId: '',
    tagReadingSettings: '',
    features: '',
    mobilGpsCfg: '',
    Subject: '',
    Content: '',
    tagType: 0,
    tagValue: ''
  },
  coords: {
    altitude: null,
    heading: null,
    longitude: null,
    speed: null,
    latitude: null,
    accuracy: null,
  },
  responseTriggerred: false,
  successMessage: '',
  failureMessage: '',
  login: true,
  result: '',
  targetUrl: '',
  success: false,

  //====CheckBox in Petrol Screen======//
  checkGps: true,
  checkQRCode: false,
  checkNfc: false,
  petrolGps: true,
  petrolQRCode: false,
  petrolNfc: true,
  siteVisitGps: true,
  siteVisitQRCode: false,
  siteVisitNfc: true,
  calendericon: 'date-range',
  clockicon: 'timer',

  list: [],

  taglist: [],

  visitlist: [],

  patrollist: [],

  history: [],

  accountButton: [
    {
      name: 'Edit Login Details',
    },
    {
      name: 'Your Location',
    },
    {
      name: 'Blocked Droners',
    }
  ],

  mainButton: [
    {
      name: 'Days to keep History',
    },
    {
      name: 'Scan Tags to be Defined',
    }
  ],

  tag:{
    newTag:''
  },

  call911:true,
 



};

const handlers = {
  [USER_TYPE.UPDATE_STATE]: (_, action) => (action.payload),

  // For Login
  [USER_TYPE.LOGIN_USER]: () => {
    return {
      successMessage: '',
      failureMessage: '',
      responseTriggerred: false,
      login: true,
    };
  },
  [USER_TYPE.LOGIN_USER_SUCCESS]: (state, action) => {
    const { userDetails } = state;
    debugger
    if (action.payload.success) {
      successMessage = 'LoginSuccess';
      userDetails.ticket = action.payload.result.ticket;
      userDetails.userName = action.payload.result.userName;
      userDetails.firstName = action.payload.result.firstName;
      userDetails.lastName = action.payload.result.lastName;
      userDetails.employeeId = action.payload.result.employeeId;
      userDetails.tagReadingSettings = action.payload.result.tagReadingSettings;
      userDetails.features = action.payload.result.features;
      userDetails.mobilGpsCfg = action.payload.result.mobilGpsCfg;
      return {

        successMessage,
        responseTriggerred: true,
      };

    } else {
      failureMessage = "Failure";
      return {

        failureMessage,
        responseTriggerred: true,
      };
    }
    
  },

  [USER_TYPE.LOGIN_USER_FAILUTE]: (_, action) => {
    return {
      userDetails: null,
      loading: false,
      loggedIn: false,
      responseTriggerred: false,
    };
  },

  // For SignUp
  [USER_TYPE.REGISTER_USER]: () => {
    return {
      successMessage: '',
      failureMessage: '',
      responseTriggerred: false,
      login: true,
    };
  },
  [USER_TYPE.REGISTER_USER_SUCCESS]: (state, action) => {
    const { userDetails } = state;
    if (action.payload.success == true) {
      successMessage = 'RegistrationSuccess';
      result = action.payload.result,
        targetUrl = action.payload.targetUrl,
        success = action.payload.success
      return {
        successMessage,
        responseTriggerred: true,
      };
    } else {
      failureMessage = "Failure";
      return {
        failureMessage: "",
        responseTriggerred: true,
      };
    }

  },

  [USER_TYPE.REGISTER_USER_FAILURE]: (_, action) => {
    // console.log(action.payload)
    return {
      successMessage: "",
      failureMessage,
      responseTriggerred: true,
    };
  },


  //For CheckIn
  [USER_TYPE.CHECKIN_USER]: () => {
    return {
      successMessage: '',
      failureMessage: '',
      responseTriggerred: false,
      login: true,
    };
  },
  [USER_TYPE.CHECKIN_USER_SUCCESS]: (state, action) => {
    console.log(action)
    const { list,history } = state;
    if (action.payload.success == true) {
      successMessage = 'CHECKINSuccess';
      result = action.payload.result,
        targetUrl = action.payload.targetUrl,
        success = action.payload.success,
        list.push({"date": new Date().getDate()+'/'+new Date().getMonth()+'/'+new Date().getFullYear(), "time": new Date().getHours()+':'+new Date().getMinutes()+':'+new Date().getSeconds()});
        history.push({"date": new Date().getDate()+'/'+new Date().getMonth()+'/'+new Date().getFullYear(), "time": new Date().getHours()+':'+new Date().getMinutes()+':'+new Date().getSeconds(),"subtitle":'(CheckIN)'});
        console.log('list',list)
        //list[0].date=new Date()
      return {
        successMessage,
        responseTriggerred: true,
      };
    } else {
      failureMessage = "CHECKINFailure";
      return {
        failureMessage: "",
        responseTriggerred: true,
      };
    }

  },

  [USER_TYPE.CHECKIN_USER_FAILURE]: (_, action) => {
    console.log(action.payload)
    return {
      successMessage: "",
      failureMessage,
      responseTriggerred: true,
    };
  },



  //For CheckOUt
  [USER_TYPE.CHECKOUT_USER]: () => {
    return {
      successMessage: '',
      failureMessage: '',
      responseTriggerred: false,
      login: true,
    };
  },
  [USER_TYPE.CHECKOUT_USER_SUCCESS]: (state, action) => {
    console.log(action)
    const { list,history } = state;
    if (action.payload.success == true) {
      successMessage = 'CHECKOUTSuccess';
      result = action.payload.result,
        targetUrl = action.payload.targetUrl,
        success = action.payload.success,
        list.push({"date": new Date().getDate()+'/'+new Date().getMonth()+'/'+new Date().getFullYear(), "time": new Date().getHours()+':'+new Date().getMinutes()+':'+new Date().getSeconds()});
        history.push({"date": new Date().getDate()+'/'+new Date().getMonth()+'/'+new Date().getFullYear(), "time": new Date().getHours()+':'+new Date().getMinutes()+':'+new Date().getSeconds(),"subtitle":'(CheckOUT)'});
        console.log('list',list)
        //list[0].date=new Date()
      return {
        successMessage,
        responseTriggerred: true,
      };
    } else {
      failureMessage = "CHECKOUTFailure";
      return {
        failureMessage: "",
        successMessage,
        responseTriggerred: true,
      };
    }

  },

  [USER_TYPE.CHECKOUT_USER_FAILURE]: (_, action) => {
    console.log(action.payload)
    return {
      successMessage: "",
      failureMessage,
      responseTriggerred: true,
    };
  },


  //For UploadScanned
 [USER_TYPE.UPLOADSCANNEDTAG_USER]: () => {
  return {
    successMessage: '',
    failureMessage: '',
    responseTriggerred: false,
    login: true,
  };
},
[USER_TYPE.UPLOADSCANNEDTAG_USER_SUCCESS]: (state, action) => {
  debugger
  console.log(action)
  const { taglist,history } = state;
  if (action.payload.success == true) {
    successMessage = 'UploadScannedTagSuccess';
    result = action.payload.result,
      targetUrl = action.payload.targetUrl,
      success = action.payload.success,
      taglist.push({"date": new Date().getDate()+'/'+new Date().getMonth()+'/'+new Date().getFullYear(), "time": new Date().getHours()+':'+new Date().getMinutes()+':'+new Date().getSeconds()});
      history.push({"date": new Date().getDate()+'/'+new Date().getMonth()+'/'+new Date().getFullYear(), "time": new Date().getHours()+':'+new Date().getMinutes()+':'+new Date().getSeconds(),"subtitle":'(UploadTAG)'});
      console.log('list',taglist)
      //list[0].date=new Date()
    return {
      successMessage,
      responseTriggerred: true,
    };
  } else {
    failureMessage = "UploadScannedTagFailure";
    return {
      failureMessage: "",
      successMessage,
      responseTriggerred: true,
    };
  }

},

[USER_TYPE.CHECKOUT_USER_FAILURE]: (_, action) => {
  console.log(action.payload)
  return {
    failureMessage,
    responseTriggerred: true,
  };
},


//For BeginVisit
[USER_TYPE.BEGINVISIT_USER]: () => {
  return {
    successMessage: '',
    failureMessage: '',
    responseTriggerred: false,
    login: true,
  };
},
[USER_TYPE.BEGINVISIT_USER_SUCCESS]: (state, action) => {
  console.log(action)
  const { visitlist,history } = state;
  if (action.payload.success == true) {
    successMessage = 'BeginVisitSuccess';
    result = action.payload.result,
      targetUrl = action.payload.targetUrl,
      success = action.payload.success,
      visitlist.push({"date": new Date().getDate()+'/'+new Date().getMonth()+'/'+new Date().getFullYear(), "time": new Date().getHours()+':'+new Date().getMinutes()+':'+new Date().getSeconds()});
      history.push({"date": new Date().getDate()+'/'+new Date().getMonth()+'/'+new Date().getFullYear(), "time": new Date().getHours()+':'+new Date().getMinutes()+':'+new Date().getSeconds(),"subtitle":'(BeginVISIT)'});
      console.log('list',visitlist)
      //list[0].date=new Date()
    return {
      successMessage,
      responseTriggerred: true,
    };
  } else {
    failureMessage = "BeginVisitFailure";
    return {
      failureMessage: "",
      successMessage,
      responseTriggerred: true,
    };
  }

},

[USER_TYPE.BEGINVISIT_USER_FAILURE]: (_, action) => {
  console.log(action.payload)
  return {
    successMessage: "",
    failureMessage,
    responseTriggerred: true,
  };
},



//For EndVisit
[USER_TYPE.ENDVISIT_USER]: () => {
  return {
    successMessage: '',
    failureMessage: '',
    responseTriggerred: false,
    login: true,
  };
},
[USER_TYPE.ENDVISIT_USER_SUCCESS]: (state, action) => {
  console.log(action)
  const { visitlist,history } = state;
  if (action.payload.success == true) {
    successMessage = 'EndVisitSuccess';
    result = action.payload.result,
      targetUrl = action.payload.targetUrl,
      success = action.payload.success,
      visitlist.push({"date": new Date().getDate()+'/'+new Date().getMonth()+'/'+new Date().getFullYear(), "time": new Date().getHours()+':'+new Date().getMinutes()+':'+new Date().getSeconds()});
      history.push({"date": new Date().getDate()+'/'+new Date().getMonth()+'/'+new Date().getFullYear(), "time": new Date().getHours()+':'+new Date().getMinutes()+':'+new Date().getSeconds(),"subtitle":'(EndVISIT)'});
      console.log('list',visitlist)
      //list[0].date=new Date()
    return {
      successMessage,
      responseTriggerred: true,
    };
  } else {
    failureMessage = "EndVisitFailure";
    return {
      failureMessage: "",
      successMessage,
      responseTriggerred: true,
    };
  }

},

[USER_TYPE.ENDVISIT_USER_FAILURE]: (_, action) => {
  console.log(action.payload)
  return {
    successMessage: "",
    failureMessage,
    responseTriggerred: true,
  };
},


//For Patrol
[USER_TYPE.PATROL_USER]: () => {
  return {
    successMessage: '',
    failureMessage: '',
    responseTriggerred: false,
    login: true,
  };
},
[USER_TYPE.PATROL_USER_SUCCESS]: (state, action) => {
  console.log(action)
  const { patrollist,history } = state;
  if (action.payload.success == true) {
    successMessage = 'PatrolSuccess';
    result = action.payload.result,
      targetUrl = action.payload.targetUrl,
      success = action.payload.success,
      patrollist.push({"date": new Date().getDate()+'/'+new Date().getMonth()+'/'+new Date().getFullYear(), "time": new Date().getHours()+':'+new Date().getMinutes()+':'+new Date().getSeconds()});
      history.push({"date": new Date().getDate()+'/'+new Date().getMonth()+'/'+new Date().getFullYear(), "time": new Date().getHours()+':'+new Date().getMinutes()+':'+new Date().getSeconds(),"subtitle":'(Patrol)'});
      console.log('patrollist',patrollist)
      //list[0].date=new Date()
    return {
      successMessage,
      responseTriggerred: true,
    };
  } else {
    failureMessage = "PatrolFailure";
    return {
      failureMessage: "",
      successMessage,
      responseTriggerred: true,
    };
  }

},

[USER_TYPE.PATROL_USER_FAILURE]: (_, action) => {
  console.log(action.payload)
  return {
    failureMessage,
    responseTriggerred: true,
  };
},


//For Incident
[USER_TYPE.INCIDENT_USER]: () => {
  return {
    successMessage: '',
    failureMessage: '',
    responseTriggerred: false,
    login: true,
  };
},
[USER_TYPE.INCIDENT_USER_SUCCESS]: (state, action) => {
  console.log(action)
  if (action.payload.success == true) {
    successMessage = 'IncidentSuccess';
    result = action.payload.result,
      targetUrl = action.payload.targetUrl,
      success = action.payload.success
    return {
      successMessage,
      responseTriggerred: true,
    };
  } else {
    failureMessage = "IncidentFailure";
    return {
      failureMessage: "",
      successMessage,
      responseTriggerred: true,
    };
  }

},

[USER_TYPE.INCIDENT_USER_FAILURE]: (_, action) => {
  console.log(action.payload)
  return {
    failureMessage,
    responseTriggerred: true,
  };
},



};

 

export default createReducer(initialState, handlers);