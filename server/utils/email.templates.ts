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
