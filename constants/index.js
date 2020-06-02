import store from '../store/index';
export const Constants = {};

export const PROTOCAL = 'http://';
export const HOST_NAME = '.bwacsys.com/api/';

export const URI = {

  login: `${HOST_NAME}Login`, // For Login Api
  registration: `${HOST_NAME}services/bwac/employeeRegister/RegisterEmployeeAsNewUser`, // For User registration
  checkInOrOut:`${HOST_NAME}services/bwac/mobileGpsPatrol/CheckInOrOut`,
  visitSite:`${HOST_NAME}services/bwac/mobileGpsPatrol/VisitSite`,
  uploadScannedTad:`${HOST_NAME}services/bwac/mobileTagScratchPad/UploadScannedTagId`,
  patrol:`${HOST_NAME}services/bwac/mobileGpsPatrol/MobilePatrol`,  
  incident:`${HOST_NAME}services/bwac/mobileGpsPatrol/Incident`,  
  uploadCurrentUserLocation:`${HOST_NAME}services/bwac/mobileGpsTrack/UploadCurrentUserLocation`,  
}
