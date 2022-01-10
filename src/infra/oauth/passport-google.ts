import { makeGoogleStrategyHandler } from '@/app/factory/controllers/google-strategy-handler'
import { GoogleAccountData } from '@/modules/accounts/domain/entities/google-account'
import { CreateGoogleAccount } from '@/modules/accounts/usecases/create-google-account'
import passport from 'passport'
import { Profile, Strategy as GoogleStrategy, VerifyCallback } from 'passport-google-oauth20'

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, OAUTH_CALLBACK_URL } = process.env

export class GoogleStrategyHandler {
  constructor(private readonly createGoogleAccount: CreateGoogleAccount) {}
  public async handle(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    callback: VerifyCallback
  ) {
    const googleAccount: GoogleAccountData = {
      name: profile.displayName,
      email: profile.emails[0].value,
      googleId: profile.id
    }
    const googleAccountResult = await this.createGoogleAccount.create(googleAccount)
    // TODO: the following if returns an error, came from the usecase. Need some way of capturing this error in the route handler, the same way googleAccount data is been captured.
    if (googleAccountResult.isLeft()) return callback(googleAccountResult.value)

    const { id, name, email, googleId, createdAt } = googleAccountResult.value
    const responseUser: Express.Request['googleAccount'] = {
      id,
      name,
      email,
      googleId,
      createdAt,
      googleAccessToken: accessToken,
      googleRefreshToken: refreshToken
    }

    return callback(null, responseUser)
  }
}

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: OAUTH_CALLBACK_URL
    },
    (accessToken, refreshToken, profile, cb) => {
      const googleStrategyHandler = makeGoogleStrategyHandler()
      return googleStrategyHandler.handle(accessToken, refreshToken, profile, cb)
    }
  )
)

passport.serializeUser(function (user, cb) {
  cb(null, user)
})

passport.deserializeUser(function (obj, cb) {
  cb(null, obj)
})

export { passport }
