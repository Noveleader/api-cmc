let totalSupply = 1000000000;
module.exports = (req, res) => {
    try {
      res.send(totalSupply.toString());
    } catch (error) {
      res.status(500).send('Error fetching total supply');
    }
};