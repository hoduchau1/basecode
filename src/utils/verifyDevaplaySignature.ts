import crypto from 'crypto';

const publicKey = process.env.PUBLIC_KEY_CALLBACK_EVO_B!.replace(/\\n/g, '\n');

export const verifyDevaplaySignature = (authorizationHeader: string, method: string, url: string): boolean => {
  try {
    if (!authorizationHeader.startsWith('DEVAPLAY-SHA256-RSA2048')) return false;

    const [, authContent] = authorizationHeader.split('DEVAPLAY-SHA256-RSA2048 ');
    const [agentCode, timestamp, nonce, signature] = authContent.split(',');

    const stringToVerify = `${method.toUpperCase()} ${url.toLowerCase()} ${timestamp} ${nonce}`;
    const verifier = crypto.createVerify('RSA-SHA256');
    verifier.update(stringToVerify);
    verifier.end();

    const isValid = verifier.verify(publicKey, signature, 'base64');
    return isValid;
  } catch (error) {
    console.error('[Verify Signature Error]', error);
    return false;
  }
};
