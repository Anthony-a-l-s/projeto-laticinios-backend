import express from 'express'
import { ensureAuthenticate } from '../http/middlewares/ensureAuthenticated'
import multer from "multer";


import uploadConfig from "../../../config/upload";
import { ensureAdmin } from '../http/middlewares/ensureAdmin';
import { ensureAuditorFiscal } from '../http/middlewares/ensureAuditorFiscal';
import { ensureResponsavelFisico } from '../http/middlewares/ensureResponsavelFisico';
import { ensureResponsavelJuridico } from '../http/middlewares/ensureResponsavelJuridico';
import { ensureConsultoriaJuridico } from '../http/middlewares/ensureConsultoriaJuridico';
import { ensureConsultoriaFisica } from '../http/middlewares/ensureConsultoriaFisica';

const routes = express.Router()

//CONTROLLERS
const UserController = require('../controllers/UsersController')
const AddressController = require('../../../modules/controllers/AddressesController')
const LoginController = require('../controllers/LoginsController')
const TypePersonController = require('../../../modules/controllers/TypePersonsController')
const AcessController = require('../../../modules/controllers/AcessController')
const NaturalPersonController = require('../../../modules/controllers/NaturalPersonsController')
const LegalPersonController = require('../../../modules/controllers/LegalPersonsController')
const NotificationController = require('../../../modules/controllers/NotificationsController')
const Responsibles_Technician_Quality_Control = require('../../../modules/controllers/Responsibles_Technician_Quality_ControlController')
const Responsibles_Technician_Quality_Control_Crmv = require('../../../modules/controllers/Responsibles_Technician_Quality_Control_CrmvController')
const ConsultancyController = require('../../../modules/controllers/ConsultancysController')
const TaxAuditorController = require('../../../modules/controllers/TaxAuditorsController') 
const AuthenticationController = require('../../../modules/controllers/AuthenticationController')
const checklistController = require('../controllers/ChecklistController')
const QuestionsController = require('../controllers/QuestionsController')
const RespostasController = require('../../../modules/controllers/RespostasController')
const ResponseImagesController = require('../../../modules/controllers/ResponseImagesController')
const TopicsController = require("../controllers/TopicsController")
const PerfilController = require('../../../modules/controllers/PerfilController')
const EntityController = require('../../../modules/controllers/EntityController')
const CompanyController = require('../../../modules/controllers/CompanyController')
const ProductcategoryController = require('../../../modules/controllers/ProductCategoryController')
const ProductProviderController = require('../../../modules/controllers/ProductProviderController')
const ProductsController = require('../../../modules/controllers/ProductsController')
const InstrumentController = require('../../../modules/controllers/InstrumentController')
const PdaRefTableController = require('../controllers/PdaRefTableController')
const PdaTableController = require('../controllers/PdaTableController')
const CalibrationControlController = require('../../infra/controllers/CalibrationControlController')
const StockCategoriesController = require('../controllers/StockCategoriesController')
const StockItemsComntroller = require('../controllers/StockItemsController')
const ProfileController = require('../controllers/ProfileController')
const QestionImagesController = require('../controllers/QuestionImagesController')

var cors = require('cors')
const uploadResponsesImages = multer(uploadConfig.upload("./tmp/responseImages"));


//LOGINS ROUTES
routes.get("/login",ensureAuthenticate ,LoginController.index)
routes.post("/login", LoginController.create) 
routes.put("/login/:loginId", LoginController.update)
routes.delete("/login/:loginId", LoginController.delete)
routes.get("/login",LoginController.login)

//USER ROUTES
routes.get("/users",/*ensureAdmin ,*/UserController.index)
routes.get("/user/:userId",UserController.umUser)
routes.post("/users_create", UserController.create)
routes.put("/user_edit/:userId", UserController.update)
routes.delete("/user_delete/:userId", UserController.delete)

//PERFILS
routes.post('/perfile/:userId/:loginId',cors(),ProfileController.perfilCreation)
routes.get("/profiles",ensureResponsavelJuridico, ProfileController.index)
routes.get("/profile/:profileId", ProfileController.oneProfile)
routes.get("/profile_users/:userId", ProfileController.profilesByUser)
routes.post("/profile_create/:userId", ProfileController.create)
routes.put("/profile_edit/:profileId", ProfileController.update)
routes.delete("/perfil_delete/:profileId", ProfileController.delete)
routes.get("/profile_autenticate/:profileId", ProfileController.getToken)
routes.get("/teste/")


//CHECKLIST ROUTES
routes.get('/checklists'/*,ensureAuditorFiscal*/,checklistController.index)
//Pegando os dados de um checklist especifico pelo id
routes.get('/checklists/:checklistId' ,checklistController.UmChecklist)
routes.post("/checklists_create/:userId", checklistController.create)
routes.put("/checklists_edit/:checklistId", checklistController.update)
routes.put("/checklists_respond/:checklistId", checklistController.responded)
routes.delete("/checklists_delete/:checklistId", checklistController.delete)

//TOPIC ROUTES
routes.get('/topics', TopicsController.index)
//Pegando os topicos de um checklist
routes.get('/topics/:checklistId', TopicsController.lista)
routes.post("/topics_create/:checklistId", TopicsController.create)
routes.put("/topics_edit/:topicId", TopicsController.update)
routes.delete("/topics_delete/:topicId", TopicsController.delete)

//PDA_REF_TABLE ROUTES
routes.get("/pda_ref_tables", PdaRefTableController.index)
routes.get("/pda_ref_tables/:pdaRefTableId", PdaRefTableController.umPdaRefTable)
routes.post("/pda_ref_tables", PdaRefTableController.create)
routes.put("/pda_ref_tables/:pdaRefTableId", PdaRefTableController.update)
routes.delete("/pda_ref_tables/:pdaRefTableId", PdaRefTableController.delete)

//PDA_TABLE ROUTES
routes.get("/pda_tables", PdaTableController.index)
routes.get("/pda_tables/:pdaTableId", PdaTableController.UmPdaTable)
routes.post("/pda_tables_create/:pdaRefTableId", PdaTableController.create)
routes.put("/pda_tables_edit/:pdaTableId", PdaTableController.update)
routes.delete("/pda_tables_delete/:pdaTableId", PdaTableController.delete)


//QUESTIONS ROUTES
routes.get("/allQuestions", QuestionsController.index)
//Pegando as perguntas de um topico
routes.get("/questions/:topicId", QuestionsController.questionsOfAnTopic)
routes.get("/question/:questionId", QuestionsController.oneQuestion)
routes.post("/questions_create/:topicId", QuestionsController.create)
routes.put("/questions_edit/:questionId", QuestionsController.update)
routes.delete("/question_delete/:questionId", QuestionsController.delete)

//QUESTIONS IMAGES ROUTES
routes.get("/questions_images", QestionImagesController.index)
//Pegando as imagens de uma pergunta
routes.get("/questions_images/:questionId", QestionImagesController.imagesforQuestion)
routes.get("/questions_images/:questionImageId", QestionImagesController.oneQestionImage)
routes.post("/questions_images/:questionId", QestionImagesController.create)
routes.put("/questions_images/:questionImageId", QuestionsController.update)
routes.delete("/questions_images/:questionImageId", QuestionsController.delete)

//CALIBRATION CONTROL ROUTES
routes.get("/calibration_controls", CalibrationControlController.index)
routes.get("/calibration_control/:calibrationControlId", CalibrationControlController.UmCalibrationControl)
routes.post("/calibration_control/", CalibrationControlController.create)
routes.put("/calibration_control_edit/:calibrationControlId", CalibrationControlController.update)
routes.delete("/calibration_control_delete/:calibrationControlId", CalibrationControlController.delete)

//STOCK CATEGORIES ROUTES
routes.get("/stock_categories", StockCategoriesController.index)
routes.get("/stock_category/:stockCategoryId", StockCategoriesController.UmStockCategory)
routes.post("/stock_category_create/", StockCategoriesController.create)
routes.put("/stock_category_edit/:stockCategoryId", StockCategoriesController.update)
routes.delete("/stock_category_delete/:stockCategoryId", StockCategoriesController.delete)

//STOCK ITEMS ROUTES
routes.get("/stock_items", StockItemsComntroller.index)
routes.get("/stock_item/:stockItemId", StockItemsComntroller.UmStockItem)
routes.get("/stock_items/:stockCategoryId", StockItemsComntroller.stockItemByCategory)
routes.post("/stock_items_create/", StockItemsComntroller.create)
routes.put("/stock_items_edit/:stockItemId", StockItemsComntroller.update)
routes.delete("/stock_items_delete/:stockItemId", StockItemsComntroller.delete)

//RESPONSES ROUTES
routes.get("/responses", RespostasController.index)
//Rota para pegar as respostas de um usuario
routes.get("/responses/:userId", RespostasController.userResponses)
routes.post("/responses/:questionId/:userId", RespostasController.create)
routes.put("/responses/:responseId", RespostasController.update)
routes.delete("/responses/:responseId", RespostasController.delete)

//IMAGES OF RESPONSE
// Ao fazer o upload, o label dos arquivos deve ter o mesmo Nome que esse objeto 
// recebido pela funcao array
routes.post("/responsesImages/:responseId", uploadResponsesImages.array("images"), ResponseImagesController.create)



//ADDRESSES ROUTES
routes.get("/address", AddressController.index)
routes.post("/address/:userId", AddressController.create) 
routes.put("/address/:addressId", AddressController.update)
routes.delete("/address/:addressId", AddressController.delete)


//TYPE PERSON ROUTES
routes.get("/typePerson", TypePersonController.index)
routes.post("/typePerson/:userId", TypePersonController.create) 
routes.put("/typePerson/:typePersonId", TypePersonController.update)
routes.delete("/typePerson/:typePersonId", TypePersonController.delete)

// ACESS ROUTES
routes.get("/acess", AcessController.index)
routes.post("/acess/:loginId", AcessController.create) 
routes.put("/acess/:loginId", AcessController.update)
routes.delete("/acess/:acessId", AcessController.delete)

//NATURAL PERSONS ROUTES
routes.get("/naturalPerson", NaturalPersonController.index)
routes.post("/naturalPerson/:userId", NaturalPersonController.create) 
routes.put("/naturalPerson/:naturalPersonId", NaturalPersonController.update)
routes.delete("/naturalPerson/:naturalPersonId", NaturalPersonController.delete)

//LEGAL PERSONS ROUTES
routes.get("/legalPerson", LegalPersonController.index)
routes.post("/legalPerson/:userId", LegalPersonController.create) 
routes.put("/legalPerson/:legalPersonId", LegalPersonController.update)
routes.delete("/legalPerson/:legalPersonId", LegalPersonController.delete)

// NOTIFICATION ROUTES
routes.get("/notification", NotificationController.index)
routes.post("/notification/:userId", NotificationController.create) 
routes.put("/notification/:notificationId", NotificationController.update)
routes.delete("/notification/:notificationId", NotificationController.delete)

// Responsibles_Technician_Quality_Control ROUTES
routes.get("/rtqc", Responsibles_Technician_Quality_Control.index)
routes.post("/rtqc/:userId", Responsibles_Technician_Quality_Control.create) 
routes.put("/rtqc/:responsibleId", Responsibles_Technician_Quality_Control.update)
routes.delete("/rtqc/:responsibleId", Responsibles_Technician_Quality_Control.delete)

//Responsibles_Technician_Quality_Contro_Crmv ROUTES
routes.get("/rtqccrmv", Responsibles_Technician_Quality_Control_Crmv.index)
routes.post("/rtqccrmv/:userId", Responsibles_Technician_Quality_Control_Crmv.create) 
routes.put("/rtqccrmv/:responsibleId", Responsibles_Technician_Quality_Control_Crmv.update)
routes.delete("/rtqccrmv/:responsibleId", Responsibles_Technician_Quality_Control_Crmv.delete)

// Consultancys ROUTES 
routes.get("/consultancys", ConsultancyController.index)
routes.post("/consultancys/:userId", ConsultancyController.create) 
routes.put("/consultancys/:consultancyId", ConsultancyController.update)
routes.delete("/consultancys/:consultancyId", ConsultancyController.delete)

//TaxAuditors ROUTES
routes.get("/taxauditors", TaxAuditorController.index)
routes.post("/taxAuditor/:userId", TaxAuditorController.create) 
routes.put("/taxAuditor/:taxAuditorId", TaxAuditorController.update)
routes.delete("/taxAuditor/:taxAuditorId", TaxAuditorController.delete)

//ROTAS DE LOGIN
routes.post('/authentication',cors(),AuthenticationController.authentication)

//ROTAS DE COMPANY
routes.get("/company", CompanyController.index)
routes.post("/company/:userId", CompanyController.create) 
routes.put("/company/:legalPersonId", CompanyController.update)
routes.delete("/company/:legalPersonId", CompanyController.delete)

//ROTAS DE product Category
routes.get("/productCategory", ProductcategoryController.index)
routes.post("/productCategory", ProductcategoryController.create) 
routes.put("/productCategory/:productcategoryId", ProductcategoryController.update)
routes.delete("/productCategory/:productcategoryId", ProductcategoryController.delete)

//ROTAS DE product Provider
routes.get("/productProvider", ProductProviderController.index)
routes.post("/productProvider", ProductProviderController.create) 
routes.put("/productProvider/:productProviderId", ProductProviderController.update)
routes.delete("/productProvider/:productProviderId", ProductProviderController.delete)

//Products ROUTES
routes.get("/products", ProductsController.index)
routes.post("/products/:productProviderId/:productCategoryId", ProductsController.create)
routes.put("/products/:productId", ProductsController.update)
routes.delete("/products/:productId", ProductsController.delete)

//ROTAS DE instrumentos
routes.get("/instrument", InstrumentController.index)
routes.post("/instrument", InstrumentController.create) 
routes.put("/instrument/:instrumentId", InstrumentController.update)
routes.delete("/instrument/:instrumentId", InstrumentController.delete)


routes.options('*', cors())

module.exports = routes;
