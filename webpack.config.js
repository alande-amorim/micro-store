module.exports = (options) => {
  return {
    ...options,
    devtool: 'inline-source-map',
  };
};
