import apiEngine from "../apiEngine";
import { GET, POST, PUT } from "../methods";

export default {
  list: () => apiEngine(GET,'/users'),
  loginWithGoogle: () => {
    apiEngine.get(
      '/auth/google'
      // {
      //   params: {
      //     next: nextLocation
      //   }
      // }
    )

  },
  loginWithFacebook: () => apiEngine(
    GET,
    '/auth/facebook'
    // {
    //   params: {
    //     next: nextLocation
    //   }
    // }
  ),
  phoneLogin: user => apiEngine(POST,'/users/login/phone', { data: user }),
  phoneRegisterGetOtp: user => apiEngine(POST, '/users/phone_register', { data: user }),
  verifyPhoneRegister: user => apiEngine(POST, '/users/verify_phone_register', { data: user }),
  emailLogin: user => apiEngine(POST,'/users/login/email', { data: user }),
  emailRegister: user => apiEngine(POST,'/users', { data: user }),
  verifyEmail: ({ token }) =>
    apiEngine.post('/users/email/verify', {
      data: { verifyEmailToken: token }
    }),
  emailAvailable: value => apiEngine(GET,'/users/usernameAvailable'),
  requestVerifyEmail: form =>
    apiEngine(POST, '/users/email/request-verify', { data: form }),

  appSocialLogin: facebookToken =>
    apiEngine(POST, '/auth/facebook/native', { data: facebookToken }),

  requestResetPassword: form =>
    apiEngine(POST, '/users/password/request-reset', { data: form }),
  resetPassword: ({ token, ...form }) =>
    apiEngine(PUT, '/users/password', {
      data: {
        resetPasswordToken: token,
        ...form
      }
    }),
  logout: () => apiEngine(GET,'/users/logout'),
  readSelf: () => apiEngine(GET,'/users/me'),
  update: user => apiEngine(PUT, '/users/me', { data: user }),
  updateAvatarURL: form =>
    apiEngine(PUT, '/users/me/avatarURL', {
      data: form
    }),
  updatePassword: form =>
    apiEngine(PUT, '/users/me/password', {
      data: form
    }),
  uploadAvatar: avatar =>
    apiEngine(POST, '/users/me/avatar', { files: { avatar } })
};
