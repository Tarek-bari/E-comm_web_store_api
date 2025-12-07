export const register_schema: ValidationSchema = {
  userName: {
    errorMessage: "please enter a valid userName",
    trim: true,
    isLength: {
      options: { min: 3 },
      errorMessage: "userName must be at least 3 characters long",
    },
    isString: true,
  },
  email: {
    errorMessage: "please enter a valid email",
    isEmail: true,
    trim: true,
  },
  phone: {
    optional: true,
    isMobilePhone: {
      options: ["ar-DZ"],
      errorMessage: "please enter a valid phone number",
    },
    isString: true,
    trim: true,
  },
  password: {
    errorMessage: "please enter a valid password",
    notEmpty: true,
    isLength: {
      options: { min: 6, max: 20 },
      errorMessage:
        "password must be at least 6 characters long and at most 20 chasracters long",
    },
    isString: true,
  },
};
