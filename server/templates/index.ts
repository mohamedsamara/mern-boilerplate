export function signupEmail(profile: any) {
  const message = {
    subject: 'Account Registration',
    text:
      `Hi ${profile.firstName} ${profile.lastName}! Thank you for creating an account with Us!. \n\n` +
      `If you did not request this change, please contact us immediately.`,
  };

  return message;
}

export function passwordChanged() {
  const message = {
    subject: 'Password Changed',
    text:
      `You are receiving this email because you changed your password. \n\n` +
      `If you did not request this change, please contact us immediately.`,
  };

  return message;
}

export function resetPassword(req: any, token: string) {
  const message = {
    subject: 'Reset Password',
    text:
      `${'You are receiving this because you have requested to reset your password for your account.\n\n' +
        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
        'http://'}${req.headers.host}/reset-password/${token}\n\n` +
      `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
  };

  return message;
}
