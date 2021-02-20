import apiEngine from "./apiEngine";
import { GET, POST, PUT } from "./methods";

export default {
  list: ({ page }) => apiEngine(GET,'/api/users', { params: { page } }),
  loginWithGoogle: () => {
    apiEngine.get(
      '/api/auth/google'
      // {
      //   params: {
      //     next: nextLocation
      //   }
      // }
    )

  },
  loginWithFacebook: () => apiEngine(
    GET,
    '/api/auth/facebook'
    // {
    //   params: {
    //     next: nextLocation
    //   }
    // }
  ),
  phoneLogin: user => apiEngine(POST,'/api/users/phone_login', { data: user }),
  phoneRegisterGetOtp: user => apiEngine(POST, '/api/users/phone_register', { data: user }),
  verifyPhoneRegister: user => apiEngine(POST, '/api/users/verify_phone_register', { data: user }),
  emailLogin: user => apiEngine(POST,'/api/users/emaillogin', { data: user }),
  emailRegister: user => apiEngine(POST,'/api/users', { data: user }),
  verifyEmail: ({ token }) =>
    apiEngine.post('/api/users/email/verify', {
      data: { verifyEmailToken: token }
    }),
  emailAvailable: value => apiEngine(GET,'/api/users/usernameAvailable'),
  requestVerifyEmail: form =>
    apiEngine(POST, '/api/users/email/request-verify', { data: form }),

  appSocialLogin: facebookToken =>
    apiEngine(POST, '/auth/facebook/native', { data: facebookToken }),

  requestResetPassword: form =>
    apiEngine(POST, '/api/users/password/request-reset', { data: form }),
  resetPassword: ({ token, ...form }) =>
    apiEngine(PUT, '/api/users/password', {
      data: {
        resetPasswordToken: token,
        ...form
      }
    }),
  logout: () => apiEngine(GET,'/api/users/logout'),
  readSelf: () => apiEngine(GET,'/api/users/me'),
  update: user => apiEngine(PUT, '/api/users/me', { data: user }),
  updateAvatarURL: form =>
    apiEngine(PUT, '/api/users/me/avatarURL', {
      data: form
    }),
  updatePassword: form =>
    apiEngine(PUT, '/api/users/me/password', {
      data: form
    }),
  uploadAvatar: avatar =>
    apiEngine(POST, '/api/users/me/avatar', { files: { avatar } })
};
