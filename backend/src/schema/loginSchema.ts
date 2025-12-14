export const login_schema: ValidationSchema = {
  email: {
    errorMessage: "please enter a valid email",
    isEmail: true,
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
