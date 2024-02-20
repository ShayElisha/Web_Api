const router= require('express').Router()
const auth= require('../middlewares/auth')



const {getAllUsers,GetUserByID,AddNewUser,UpdateUser,deleteUser,register,Login}=require('../controllers/user')

router.get('/',getAllUsers);
router.get('/:id',GetUserByID);
router.post('/',auth,AddNewUser);
router.post('/register',register);
router.post('/Login',Login)
router.patch('/:id',auth,UpdateUser);
router.delete('/:id',auth,deleteUser);


module.exports=router