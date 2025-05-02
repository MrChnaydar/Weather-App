console.log('test 2');
module.exports = (req: any, res: any) => {
  console.log('test 1');
  res.status(200).json({ msg: 'Plain JS test working' });
};
