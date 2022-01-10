declare namespace Express {
  export interface Request {
    googleAccount: {
      id: string
      googleId: string
      name: string
      email: string
      createdAt: Date
      googleAccessToken: string
      googleRefreshToken: string
    }
  }
}
