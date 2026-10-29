export const dummyAuthMiddleware = (req,res,next) => {
  // Authorization ichina - ivvakapoina - Edi ichina - accept
  req.user = { id: 'dummy-user-123', email: 'srija@purpy.com' };
  next();
};
export const AUTH_MODE = 'DUMMY'; // Future lo 'REAL' ani marchali