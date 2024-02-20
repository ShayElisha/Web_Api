const router= require('express').Router()
const auth= require('../middlewares/auth')
const session= require('../middlewares/authSession')

const {getAllProducts,GetProductByID,AddNewProduct,UpdateProduct,deleteProduct}=require('../controllers/product')

router.get('/',getAllProducts);
router.get('/:id',GetProductByID);
router.post('/',session,AddNewProduct)
router.patch('/:id',session,UpdateProduct)
router.delete('/:id',session,deleteProduct)


module.exports=router