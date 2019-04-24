export const uploadImage = async image => {
  const logoName = image.name;
  const md5 = image.md5;
  const path = `public/${md5}_${Date.now()}_${logoName}`;
  const logoUrl = `http://localhost:${process.env.PORT}/${path}`;
  await image.mv(path, err => {
    if (err) {
      throw new Error(`Upload image is failed: ${err.message}`);
    }
  });
  return { logoUrl, logoName };
};
