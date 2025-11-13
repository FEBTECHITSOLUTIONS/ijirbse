import { Router } from "express";
import { register, sendOTP, signin, verifyOTP } from '../services/auth.js'
import authMiddleware from "../middleware/auth.js";
import { upload } from "../config/multer.js";
import { constactUs, getPublishedArticles, publishArticle, updateArticleStatus, uploadarticle } from "../controller/user.js";
import adminMiddleware from "../middleware/admin.js";
import { deleteUser, getAllUploadedArticles, getAllUsers, updateUser } from "../controller/admin.js";
import { getArchivedIssues, getLatestIssue } from "../controller/issueController.js";


const routes = Router()

routes.post('/signin'  , signin)

routes.post('/sendotp'  , sendOTP)
routes.post('/resetpassword'  , verifyOTP)
routes.post('/uploadarticle' , upload.single('article') , uploadarticle)
routes.get('/getalluser', getAllUsers);
routes.post('/constactUs', constactUs);
routes.get("/getalluploads", getAllUploadedArticles);
routes.put("/update-status/:id", updateArticleStatus);
routes.post("/publisharticle", authMiddleware, publishArticle);
routes.get("/publishedarticles", getPublishedArticles);
routes.get("/latest-issue", getLatestIssue);
routes.get("/archivedissues", getArchivedIssues);
// ============================== admin routes ===============================================

routes.use(adminMiddleware)
routes.post('/register',  register)
routes.delete('/:id',  deleteUser);
routes.put('/updateuser/:id', updateUser);
export default routes