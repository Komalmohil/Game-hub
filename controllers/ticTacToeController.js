exports.playComputer = (req, res) => {
    res.render("ticTacToeComputer", { user: req.user });
};

exports.playSelf = (req, res) => {
    const user = req.user; 
    res.render("ticTacToeSelf", { user }); 
};


exports.playOnline = (req, res) => {
  const user = req.user;
  if (!user) return res.redirect("/login");
  res.render("ticTacToeOnline", { user });
};
