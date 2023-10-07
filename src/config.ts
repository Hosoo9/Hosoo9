const config = {
  jwtSecret: process.env.JWT_SECRET || 'secret',
  awsRegion: process.env.AWS_REGION || 'aws-ses-v2-local',
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  awsEndpoint: process.env.AWS_ENDPOINT || 'http://localhost:8005',
  emailName: process.env.EMAIL_NAME || 'GARUDAHASHIRA',
  emailNoReply: process.env.EMAIL_NAME || 'no-reply@garudahashira.com',
  platformName: process.env.PLATFORM_NAME || 'GARUDAHASHIRA',
  appDomain: process.env.APP_DOMAIN || 'http://localhost:3000',
  uploadFilePath: process.env.UPLOAD_FILE_PATH || '/tmp/ariel',
  userDefaultPassword: process.env.USER_DEFAULT_PASSWORD || "somepassword"
}

export default config
