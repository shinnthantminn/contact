module.exports = {
  images: async (req, res, next) => {
    if (req.files) {
      const file = req.files.file;
      const name = new Date().valueOf() + "" + file.name;
      req.body.image = name;
      await file.mv(`./upload/${name}`);
      next();
    } else next();
  },
};
