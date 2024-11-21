import crypto from 'crypto';

export function encrypt(data: string, encryptionKey: string) {
  const iv = crypto.randomBytes(16);
  //@ts-ignore
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    Buffer.from(encryptionKey, 'hex'),
    iv,
  );
  let encryptedData = cipher.update(data, 'utf8', 'hex');
  encryptedData += cipher.final('hex');
  const ivHex = iv.toString('hex');
  const encryptedDataWithIv = ivHex + encryptedData;

  return encryptedDataWithIv;
}

export function decrypt(encryptedData: string, encryptionKey: string) {
  const iv = Buffer.from(encryptedData.slice(0, 32), 'hex');
  const encryptedText = encryptedData.slice(32);
  //@ts-ignore
  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    Buffer.from(encryptionKey, 'hex'),
    iv,
  );
  let decryptedData = decipher.update(encryptedText, 'hex', 'utf8');
  decryptedData += decipher.final('utf8');
  return decryptedData;
}
