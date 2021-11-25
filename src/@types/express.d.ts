declare namespace Express {
  export interface Request {
    googleAccount: {
      googleId: string
      name: string
      email: string
    }
  }
}
