const General = (function () {
  function General() {}
  General.units = 500;
  return General;
})();

const GeneralMsgs = (function () {
  function GeneralMsgs() {}
  GeneralMsgs.validationError = "Validation Error";
  GeneralMsgs.emailEmpty = "Please enter a valid email";
  GeneralMsgs.emailExists = "Sorry, email already exists";
  GeneralMsgs.adminCreated = "Admin created";
  GeneralMsgs.creationError = "Entity not created";
  GeneralMsgs.adminCreationFail = "Error in creating admin";
  GeneralMsgs.tokenCreationFail = "Error in creating token";
  GeneralMsgs.invalidEmail = "Sorry, invalid email";
  GeneralMsgs.invalidPassword = "Sorry, invalid password";
  GeneralMsgs.internalServerError = "Internal server error";
  GeneralMsgs.entityCreated = "Entity created!";
  GeneralMsgs.departmentNotFound = "No department found";
  GeneralMsgs.resourceFound = "Resource found";
  GeneralMsgs.departmentCreationFail = "Fire Department not created";
  GeneralMsgs.fetchingDataFail = "Fetching data from api fails";
  GeneralMsgs.resourceUpdated = "Resource updated";
  GeneralMsgs.resourceUpdateFailed = "Resource update failed";
  GeneralMsgs.fillStationCreationFailed = "Error in creating Fill Station";
  GeneralMsgs.cylinderCreationFailed = "Error in creating Cylinder";
  GeneralMsgs.fireFighterCreationFailed = "Error in creating Fire Department";
  GeneralMsgs.cylinderAssignmentFailed = "Error in assigning cylinder";
  GeneralMsgs.cylinderNotFound = "Sorry, no cylinder found";
  GeneralMsgs.fireFighterNotFound = "No Fire Fighters found";
  GeneralMsgs.adminNotFound = "Sorry, admin found";
  GeneralMsgs.fillStationNotFound = "No Fill Station found";
  GeneralMsgs.recordDeletionFail = "Record Deletion Fail";
  GeneralMsgs.fireDepartmentDeleted =
    "Fire Department has been deleted successfully";
  GeneralMsgs.authenticationFail = "Invalid Token";

  return GeneralMsgs;
})();

const ValidationMsgs = (function () {
  function ValidationMsgs() {}
  ValidationMsgs.emailEmpty = "Please enter email";
  ValidationMsgs.idEmpty = "No record found";
  ValidationMsgs.passwordEmpty = "Please enter password";
  ValidationMsgs.nameEmpty = "Please enter name";
  ValidationMsgs.mobileEmpty = "Please enter mobile";
  ValidationMsgs.addressEmpty = "Please enter address";
  ValidationMsgs.ageEmpty = "Please enter age";
  ValidationMsgs.qtyEmpty = "Please enter quantity";
  ValidationMsgs.unitsEmpty = "Please enter units";
  ValidationMsgs.uniqueIdEmpty = "Please enter uniqueId";
  ValidationMsgs.fillStationEmpty = "Please enter fill station";
  ValidationMsgs.fireDepartmentEmpty = "Please enter fire department";
  ValidationMsgs.fireFighterEmpty = "Please enter fire fighter";
  ValidationMsgs.cylinderEmpty = "Please enter cylinder";
  ValidationMsgs.adminEmpty = "Please enter admin";
  ValidationMsgs.emailInvalid = "Please enter a valid email";
  ValidationMsgs.nameInvalid = "Name cannot exceed 20 characters";
  ValidationMsgs.mobileInvalid =
    "Invalid mobile number. It must contain only numeric digits";
  ValidationMsgs.authFail = "Please authenticate!";
  ValidationMsgs.invalidUnits = "Please enter valid units!";
  ValidationMsgs.accountNotRegistered = "Account not registered!";
  ValidationMsgs.passwordInvalid = "Please enter valid password!";
  ValidationMsgs.InvalidPassResetCode = "Invalid Password Reset Code";
  ValidationMsgs.passResetCodeEmpty = "Please enter password reset code";
  ValidationMsgs.newPasswordEmpty = "Please enter new password ";
  ValidationMsgs.isOccupied = "Please select cylider in use or not";
  return ValidationMsgs;
})();

const TableFields = (function () {
  function TableFields() {}
  TableFields.ID = "_id";
  TableFields._name = "name";
  TableFields.email = "email";
  TableFields.password = "password";
  TableFields.mobile = "mobile";
  TableFields.age = "age";
  TableFields.units = "units";
  TableFields.uniqueId = "uniqueId";
  TableFields.fireDepartment = "fireDepartment";
  TableFields.fillStation = "fillStation";
  TableFields.fireFighter = "fireFighter";
  TableFields.createdBy = "createdBy";
  TableFields.address = "address";
  TableFields.cylinderAssigned = "cylinderAssigned";
  TableFields.cylinderUsedQty = "cylinderUsedQty";
  TableFields.cylindersQty = "cylindersQty";
  TableFields.isOccupied = "isOccupied";
  TableFields.isDeleted = "isDeleted";
  TableFields.deletedAt = "deletedAt";
  TableFields.assignedTo = "assignedTo";
  TableFields.assignedAt = "assignedAt";
  TableFields.cylinder = "cylinder";
  TableFields.assigned = "assigned";
  TableFields.randomId = "randomId";
  TableFields.admin = "admin";
  TableFields.token = "token";
  TableFields.tokens = "tokens";
  TableFields.fillStationDetail = "fillStationDetail";
  TableFields.passwordResetToken = "passwordResetToken";
  return TableFields;
})();

const TableNames = (function () {
  function TableNames() {}
  TableNames.admin = "Admin";
  TableNames.fireDepartment = "FireDepartment";
  TableNames.fireFighter = "FireFighter";
  TableNames.fillStation = "FillStation";
  TableNames.cylinder = "Cylinder";
  TableNames.cylinderHistory = "CylinderHistory";
  return TableNames;
})();

const ApiResponseCode = (function () {
  function ApiResponseCode() {}
  ApiResponseCode.ResponseFail = 0;
  ApiResponseCode.ResponseSuccess = 200;
  ApiResponseCode.Ok = 200;
  ApiResponseCode.Created = 201;
  ApiResponseCode.ClientOrServerError = 400;
  ApiResponseCode.Unauthorized = 401;
  ApiResponseCode.AuthError = 401;
  ApiResponseCode.AccountDeleted = 403;
  ApiResponseCode.NotFound = 404;
  ApiResponseCode.Conflict = 409;
  ApiResponseCode.ValidationMsg = 422;
  ApiResponseCode.ForceUpdate = 426;
  ApiResponseCode.InternalServerError = 500;
  ApiResponseCode.UnderMaintanance = 503;
  return ApiResponseCode;
})();

const prefix = (function () {
  function prefix() {}
  prefix.admin = "/admin";
  prefix.fireDepartment = "/firedepartment";
  prefix.fillStation = "/fillstation";
  prefix.cylinder = "/cylinder";
  prefix.fireFighter = "/firefighter";
  return prefix;
})();

module.exports = {
  TableFields,
  TableNames,
  ApiResponseCode,
  prefix,
  GeneralMsgs,
  General,
  ValidationMsgs,
};
