// to get the current user we can do
router.get('/:id')
// but in this approach anyone can pass the id of any user and get access to data that they probably shouldn't

// instead what we can do is something like this
router.get('/me')

// here we will get the current user from the json web token
// so any user cannot impersonate another

router.get('/me', auth, async (req, res) => {
    const user = User.findById(req.user._id).select('-password');
    res.send(user);
});