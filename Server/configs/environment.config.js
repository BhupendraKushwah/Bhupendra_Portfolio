/**
 * Ensure Every Environment Variables
 * to be present which is required to
 * run application in that particular environment.
 */
require('dotenv').config();


try {
    const errors = [];
  
    const { NODE_ENV } = process.env;
    if (!NODE_ENV) errors.push('NODE Environment is not defined');
    /**
     * Extracting all variables from environment
     */
    const {
      DB_URL,
      DB_NAME,
      MAIL_USERNAME,
      MAIL_PASSWORD,
      MAIL_HOST,
      MAIL_PORT,
      JWT_TOKEN,
    } = process.env;
  
    /**
     * Ensuring Mandatory variables
     * to run server
     */
  
    if (!DB_URL || !DB_NAME) errors.push('Database URL is not found on Environment');
  
    if (!JWT_TOKEN) errors.push('JWT key not found');
  
    /**
     * Ensuring Staging & Production
     * variables
     */
  
    if (NODE_ENV !== 'development') {
  
      if (!MAIL_HOST || !MAIL_PASSWORD || !MAIL_USERNAME || !MAIL_PORT)
        errors.push('Sending E-mail not configured');
  
    }
  
    if (errors.length > 0) {
      throw new Error(errors.join(', '));
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
  