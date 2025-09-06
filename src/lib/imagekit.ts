import ImageKit from 'imagekit';

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY || 'public_0vKRiE5ybPhdxTm+HVagm5o5Z/Q=',
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || 'private_wa9qXbOG8Voy23k0qRtXmXW6JNE=',
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || 'https://ik.imagekit.io/2c0oz10ww1',
});

export default imagekit;
