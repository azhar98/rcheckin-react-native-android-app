export const Constants = {};

export const HOST_NAME = 'http://test.bwacsys.com/api/';

export const URI = {

  login: `${HOST_NAME}Login`, // For Login Api
  registration: `${HOST_NAME}services/bwac/employeeRegister/RegisterEmployeeAsNewUser`, // For User registration
  checkInOrOut:`${HOST_NAME}services/bwac/mobileGpsPatrol/CheckInOrOut`,
  visitSite:`${HOST_NAME}services/bwac/mobileGpsPatrol/VisitSite`,
  uploadScannedTad:`${HOST_NAME}services/bwac/mobileTagScratchPad/UploadScannedTagId`,
  patrol:`${HOST_NAME}services/bwac/mobileGpsPatrol/MobilePatrol`,  
  incident:`${HOST_NAME}services/bwac/mobileGpsPatrol/Incident`,  
}
