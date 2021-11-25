import passport from 'passport'
import { Profile, Strategy as GoogleStrategy, VerifyCallback } from 'passport-google-oauth20'

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, OAUTH_CALLBACK_URL } = process.env

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: OAUTH_CALLBACK_URL
    },
    StrategyHandler
  )
)

passport.serializeUser(function (user, cb) {
  cb(null, user)
})

passport.deserializeUser(function (obj, cb) {
  cb(null, obj)
})

function StrategyHandler(_: string, __: string, profile: Profile, callback: VerifyCallback) {
  const account = {
    name: profile.displayName,
    email: profile.emails[0].value,
    googleId: profile.id
  }
  console.log(account)
  callback(null, profile)
}

export { passport }
