import ImageKit from "imagekit";
import 'dotenv/config';

console.log("ImageKit ENV:", {
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

imagekit.listFiles({}, function(error, result) {
  if(error) console.log("ImageKit error:", error);
  else console.log("ImageKit success:", result);
});
