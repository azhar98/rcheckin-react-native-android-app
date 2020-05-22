//import { doGet, doDelete, doPut, doPost } from '../api/utils';
import { USER_TYPE } from '../constants/actionReducerConstants';
import { URI } from '../constants';

// ================ For Update State ====================
export function updateState(payload) {
  return {
    type: USER_TYPE.UPDATE_STATE,
    payload
  };
}

// ================ For Login ====================
export function userLogin() {
  return (dispatch, getState) => {
    const { userDetails } = getState().userState;
    fetch(`${URI.login}`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        usernameOrEmailAddress: userDetails.usernameOrEmailAddress,
        password: userDetails.password
      })
    }).then(response => response.json())
      .then(data => dispatch(userLoginSuccess(data)))
      .catch(error => dispatch(userLoginFailure(error)));
  }
}
export function userLoginSuccess(payload) {
  console.log('payload', payload)
  return {
    type: USER_TYPE.LOGIN_USER_SUCCESS,
    payload,
  };
}
export function userLoginFailure(error) {
  console.log('error', error)
  return {
    type: USER_TYPE.LOGIN_USER_FAILURE,
    error,
  };
}

// ================ For Registation ====================
export function userRegistration() {
  debugger
  return (dispatch, getState) => {
    const { userDetails } = getState().userState;
    fetch(`${URI.registration}`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        tenancyName: userDetails.tenancyName,
        phoneNo: userDetails.phoneNo,
        userName: userDetails.userName,
        password: userDetails.password
        // tenancyName: "bwacsys",
        // phoneNo: "9126342121",
        // userName: "Tubaib",
        // password: "123456"
      })
    })
      .then(response => response.json())
      .then(data => dispatch(userRegistrationSuccess(data)))
      .catch(error => dispatch(userRegistrationFailure(error)));
  }
}
export function userRegistrationSuccess(payload) {
  console.log('payload', payload);
  return {
    type: USER_TYPE.REGISTER_USER_SUCCESS,
    payload,
  };
}
export function userRegistrationFailure(error) {
  console.log('error', error);
  return {
    type: USER_TYPE.REGISTER_USER_FAILURE,
    error,
  };
}

// ================ For CheckIn ====================
export function userCheckIn(state) {
  console.log('state', state)
  debugger
  return (dispatch, getState) => {
    const { userDetails, coords } = getState().userState;
    fetch(`${URI.checkInOrOut}`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json','Authorization':'Bearer '+userDetails.ticket },
      body: JSON.stringify({
        appType: 1,
        eventType: 10,
        trackTime: new Date().toISOString(),
        latitude: coords.latitude,
        longitude: coords.longitude,
        employeeId: userDetails.employeeId,
        tagType:state.tagType,
        tagValue:state.data
      })
    }).then(response => response.json())
      .then(data => dispatch(userCheckInSuccess(data)))
      .catch(error => dispatch(userCheckInFailure(error)));
  }
}
export function userCheckInSuccess(payload) {
  console.log('payload', payload)
  return {
    type: USER_TYPE.CHECKIN_USER_SUCCESS,
    payload,
  };
}
export function userCheckInFailure(error) {
  console.log('error', error)
  return {
    type: USER_TYPE.CHECKIN_USER_FAILURE,
    error,
  };
}

// ================ For CheckOut ====================
export function userCheckOut(state) {
  console.log('state', state)
  return (dispatch, getState) => {
    const { userDetails, coords } = getState().userState;
    fetch(`${URI.checkInOrOut}`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json','Authorization':'Bearer '+userDetails.ticket },
      body: JSON.stringify({
        appType: 1,
        eventType: 20,
        trackTime: new Date().toISOString(),
        latitude: coords.latitude,
        longitude: coords.longitude,
        employeeId: userDetails.employeeId,
        tagType:state.tagType,
        tagValue:state.data
      })
    }).then(response => response.json())
      .then(data => dispatch(userCheckOutSuccess(data)))
      .catch(error => dispatch(userCheckOutFailure(error)));
  }
}
export function userCheckOutSuccess(payload) {
  console.log('payload', payload)
  return {
    type: USER_TYPE.CHECKOUT_USER_SUCCESS,
    payload,
  };
}
export function userCheckOutFailure(error) {
  console.log('error', error)
  return {
    type: USER_TYPE.CHECKOUT_USER_FAILURE,
    error,
  };
}

// ================ For BeginVisit ====================
export function userBeginVisit(state) {
  console.log('state', state)
  
  return (dispatch, getState) => {
    const { userDetails, coords } = getState().userState;
    fetch(`${URI.visitSite}`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json','Authorization':'Bearer '+userDetails.ticket },
      body: JSON.stringify({
        appType: 1,
        eventType: 30,
        trackTime: new Date().toISOString(),
        latitude: coords.latitude,
        longitude: coords.longitude,
        employeeId: userDetails.employeeId,
        tagType:state.tagType,
        tagValue:state.data
      })
    }).then(response => response.json())
      .then(data => dispatch(userBeginVisitSuccess(data)))
      .catch(error => dispatch(userBeginVisitFailure(error)));
  }
}
export function userBeginVisitSuccess(payload) {
  console.log('payload', payload)
  return {
    type: USER_TYPE.BEGINVISIT_USER_SUCCESS,
    payload,
  };
}
export function userBeginVisitFailure(error) {
  console.log('error', error)
  return {
    type: USER_TYPE.BEGINVISIT_USER_FAILURE,
    error,
  };
}

// ================ For EndVisit ====================
export function userEndVisit(state) {
  console.log('state', state)
  debugger
  return (dispatch, getState) => {
    const { userDetails, coords } = getState().userState;
    fetch(`${URI.visitSite}`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json','Authorization':'Bearer '+userDetails.ticket },
      body: JSON.stringify({
        appType: 1,
        eventType: 20,
        trackTime: new Date().toISOString(),
        latitude: coords.latitude,
        longitude: coords.longitude,
        employeeId: userDetails.employeeId,
        tagType:state.tagType,
        tagValue:state.data
      })
    }).then(response => response.json())
      .then(data => dispatch(userEndVisitSuccess(data)))
      .catch(error => dispatch(userEndVisitFailure(error)));
  }
}
export function userEndVisitSuccess(payload) {
  console.log('payload', payload)
  return {
    type: USER_TYPE.ENDVISIT_USER_SUCCESS,
    payload,
  };
}
export function userEndVisitFailure(error) {
  console.log('error', error)
  return {
    type: USER_TYPE.ENDVISIT_USER_FAILURE,
    error,
  };
}

// ================ For UploadScannedTag ====================
export function userUploadScannedTag(state) {
  ;
  console.log('state', state)
  return (dispatch, getState) => {
    const { userDetails,tag, coords } = getState().userState;
    fetch(`${URI.uploadScannedTad}`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json','Authorization':'Bearer '+userDetails.ticket },
      body: JSON.stringify({
        employeeId: userDetails.employeeId,
        scannedTime: new Date().toISOString(),
        setName: state.setName,
        tagId: state.setName,
        tagKind: 0,
        description: tag.newTag,
        tagType: state.tagValue,
        eventType: 90
      })
    }).then(response => response.json())
      .then(data => dispatch(userUploadScannedTagSuccess(data)))
      .catch(error => dispatch(userUploadScannedTagFailure(error)));
  }
}
export function userUploadScannedTagSuccess(payload) {
  console.log('userUploadScannedTagpayload', payload)
  return {
    type: USER_TYPE.UPLOADSCANNEDTAG_USER_SUCCESS,
    payload,
  };
}
export function userUploadScannedTagFailure(error) {
  console.log('error', error)
  return {
    type: USER_TYPE.UPLOADSCANNEDTAG_USER_FAILURE,
    error,
  };
}


// ================ For Patrol ====================
export function userPatrol(state) {
  console.log('state', state)
  
  return (dispatch, getState) => {
    const { userDetails, coords } = getState().userState;
    fetch(`${URI.patrol}`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json','Authorization':'Bearer '+userDetails.ticket },
      body: JSON.stringify({
        appType: 1,
        eventType: 60,
        trackTime: new Date().toISOString(),
        latitude: coords.latitude,
        longitude: coords.longitude,
        employeeId: userDetails.employeeId,
        tagType:state.tagType,
        tagValue:state.data
      })
    }).then(response => response.json())
      .then(data => dispatch(userPatrolSuccess(data)))
      .catch(error => dispatch(userPatrolFailure(error)));
  }
}
export function userPatrolSuccess(payload) {
  console.log('payload', payload)
  return {
    type: USER_TYPE.PATROL_USER_SUCCESS,
    payload,
  };
}
export function userPatrolFailure(error) {
  console.log('error', error)
  return {
    type: USER_TYPE.PATROL_USER_FAILURE,
    error,
  };
}



// ================ For Incident ====================
export function userIncident(state) {
  console.log('state', state)
  
  return (dispatch, getState) => {
    const { userDetails, coords } = getState().userState;
    fetch(`${URI.incident}`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json','Authorization':'Bearer '+userDetails.ticket },
      body: JSON.stringify({
        appType: 1,
        eventType: 50,
        trackTime: new Date().toISOString(),
        latitude: coords.latitude,
        longitude: coords.longitude,
        employeeId: userDetails.employeeId,
        textValue: state.Subject+'.'+state.Content
      })
    }).then(response => response.json())
      .then(data => dispatch(userIncidentSuccess(data)))
      .catch(error => dispatch(userIncidentFailure(error)));
  }
}
export function userIncidentSuccess(payload) {
  console.log('payload', payload)
  return {
    type: USER_TYPE.INCIDENT_USER_SUCCESS,
    payload,
  };
}
export function userIncidentFailure(error) {
  console.log('error', error)
  return {
    type: USER_TYPE.INCIDENT_USER_FAILURE,
    error,
  };
}



