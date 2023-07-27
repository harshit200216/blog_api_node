function createResourceNotFoundError(resourceName, fieldName, fieldValue) {
    const error = new Error(`${resourceName} not found with ${fieldName} : ${fieldValue}`);
    error.name = 'ResourceNotFoundException';
    error.resourceName = resourceName;
    error.fieldName = fieldName;
    error.fieldValue = fieldValue;
    return error;
  }
  
export default createResourceNotFoundError;
  