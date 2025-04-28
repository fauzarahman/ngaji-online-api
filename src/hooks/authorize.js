// authorize.js
export const authorize = (allowedRoles) => {
  return async context => {
    const { user } = context.params;
    if (!user || !allowedRoles.includes(user.role)) {
      throw new Error('Access Denied');
    }
    return context;
  };
};
