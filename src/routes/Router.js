import { Route, Routes } from 'react-router-dom';
import React, { lazy } from 'react';
import Loadable from '../layouts/loader/Loadable';
import UserToken from '../components/UserToken';

const FullLayout = Loadable(lazy(() => import('../layouts/FullLayout')));
/***** Pages ****/

// Modals

const PdfData = Loadable(lazy(() => import('../views/smartconTables/Tickets')));
const PdfNext = Loadable(lazy(() => import('../views/smartconTables/GeneratePdf')));

const TicketsComponent = Loadable(lazy(() => import('../views/smartconTables/TicketsComponent')));
const Classic = Loadable(lazy(() => import('../views/dashboards/Cubosale')));
const Crypto = Loadable(lazy(() => import('../views/dashboards/Crypto')));
const Ecommerce = Loadable(lazy(() => import('../views/dashboards/Ecommerce')));
const General = Loadable(lazy(() => import('../views/dashboards/General')));
const Extra = Loadable(lazy(() => import('../views/dashboards/Extra')));
const About = Loadable(lazy(() => import('../views/About')));

/***** Apps ****/
const Notes = Loadable(lazy(() => import('../views/apps/notes/Notes')));
const Chat = Loadable(lazy(() => import('../views/apps/chat/Chat')));
const Contacts = Loadable(lazy(() => import('../views/apps/contacts/Contacts')));
const Calendar = Loadable(lazy(() => import('../views/apps/calendar/CalendarApp')));
const Email = Loadable(lazy(() => import('../views/apps/email/Email')));
const Shop = Loadable(lazy(() => import('../views/apps/ecommerce/Shop')));
const ShopDetail = Loadable(lazy(() => import('../views/apps/ecommerce/ShopDetail')));
const Treeview = Loadable(lazy(() => import('../views/apps/treeview/TreeView')));
const TicketList = Loadable(lazy(() => import('../views/apps/ticket/TicketList')));
const TicketDetail = Loadable(lazy(() => import('../views/apps/ticket/TicketDetail')));

/***** Ui Elements ****/
const Alerts = Loadable(lazy(() => import('../views/ui/Alerts')));
const Badges = Loadable(lazy(() => import('../views/ui/Badges')));
const Buttons = Loadable(lazy(() => import('../views/ui/Buttons')));
const Cards = Loadable(lazy(() => import('../views/ui/Cards')));
const Grid = Loadable(lazy(() => import('../views/ui/Grid')));
const Tables = Loadable(lazy(() => import('../views/ui/Tables')));
const Forms = Loadable(lazy(() => import('../views/ui/Forms')));
const Breadcrumbs = Loadable(lazy(() => import('../views/ui/Breadcrumbs')));
const Dropdowns = Loadable(lazy(() => import('../views/ui/DropDown')));
const BtnGroup = Loadable(lazy(() => import('../views/ui/BtnGroup')));
const Collapse = Loadable(lazy(() => import('../views/ui/Collapse')));
const ListGroup = Loadable(lazy(() => import('../views/ui/ListGroup')));
const Modal = Loadable(lazy(() => import('../views/ui/Modal')));
const Navbar = Loadable(lazy(() => import('../views/ui/Navbar')));
const Nav = Loadable(lazy(() => import('../views/ui/Nav')));
const Pagination = Loadable(lazy(() => import('../views/ui/Pagination')));
const Popover = Loadable(lazy(() => import('../views/ui/Popover')));
const Progress = Loadable(lazy(() => import('../views/ui/Progress')));
const Spinner = Loadable(lazy(() => import('../views/ui/Spinner')));
const Tabs = Loadable(lazy(() => import('../views/ui/Tabs')));
const Toasts = Loadable(lazy(() => import('../views/ui/Toasts')));
const Tooltip = Loadable(lazy(() => import('../views/ui/Tooltip')));

/***** Form Layout Pages ****/
const FormBasic = Loadable(lazy(() => import('../views/form-layouts/FormBasic')));
const FormGrid = Loadable(lazy(() => import('../views/form-layouts/FormGrid')));
const FormGroup = Loadable(lazy(() => import('../views/form-layouts/FormGroup')));
const FormInput = Loadable(lazy(() => import('../views/form-layouts/FormInput')));

/***** Form Pickers Pages ****/
const Datepicker = Loadable(lazy(() => import('../views/form-pickers/DateTimePicker')));
const TagSelect = Loadable(lazy(() => import('../views/form-pickers/TagSelect')));

/***** Form Validation Pages ****/
const FormValidate = Loadable(lazy(() => import('../views/form-validation/FormValidation')));
const FormSteps = Loadable(lazy(() => import('../views/form-steps/Steps')));
const FormEditor = Loadable(lazy(() => import('../views/form-editor/FormEditor')));
/***** Table Pages ****/
const Basictable = Loadable(lazy(() => import('../views/tables/TableBasic')));
const CustomReactTable = Loadable(lazy(() => import('../views/tables/CustomReactTable')));
const ReactBootstrapTable = Loadable(lazy(() => import('../views/tables/ReactBootstrapTable')));

/***** Chart Pages ****/
const ApexCharts = Loadable(lazy(() => import('../views/charts/ApexCharts')));
const ChartJs = Loadable(lazy(() => import('../views/charts/ChartJs')));

/***** Sample Pages ****/
const StarterKit = Loadable(lazy(() => import('../views/sample-pages/StarterKit')));
const Profile = Loadable(lazy(() => import('../views/sample-pages/Profile')));
const Gallery = Loadable(lazy(() => import('../views/sample-pages/Gallery')));
const SearchResult = Loadable(lazy(() => import('../views/sample-pages/SearchResult')));
const HelperClass = Loadable(lazy(() => import('../views/sample-pages/HelperClass')));

/***** Icon Pages ****/
const Bootstrap = Loadable(lazy(() => import('../views/icons/Bootstrap')));
const Feather = Loadable(lazy(() => import('../views/icons/Feather')));

/***** Map Pages ****/
const CustomVectorMap = Loadable(lazy(() => import('../views/maps/CustomVectorMap')));

/***** Widget Pages ****/
const Widget = Loadable(lazy(() => import('../views/widget/Widget')));

/***** CASL Access Control ****/
const CASL = Loadable(lazy(() => import('../views/apps/accessControlCASL/AccessControl')));

// Accounts
const AccountMap = Loadable(lazy(() => import('../views/smartconTables/AccountMap')));
const ChartOfAccounts = Loadable(lazy(() => import('../views/smartconTables/ChartOfAccounts')));
const Journal = Loadable(lazy(() => import('../views/smartconTables/Journal')));
const Ledger = Loadable(lazy(() => import('../views/smartconTables/Ledger')));
const CreditNote = Loadable(lazy(() => import('../views/smartconTables/CreditNote')));
const DebitNote = Loadable(lazy(() => import('../views/smartconTables/DebitNote')));
const VATReturn = Loadable(lazy(() => import('../views/smartconTables/VATReturn')));

const ChartOfAccountDetails = Loadable(lazy(() => import('../views/DetailTable/ChartOfAccountDetails')));
const JournalDetails = Loadable(lazy(() => import('../views/DetailTable/JournalDetails')));
const ChartofACEdit = Loadable(lazy(() => import('../views/EditData/ChartofACEdit')));
const JournalEdit = Loadable(lazy(() => import('../views/EditData/JournalEdit')));

/***** Auth Pages ****/
const Error = Loadable(lazy(() => import('../views/auth/Error')));
const LoginFormik = Loadable(lazy(() => import('../views/auth/LoginFormik')));

const DataTable = Loadable(lazy(() => import('../views/cubosale/Projects')));
const Reports = Loadable(lazy(() => import('../views/cubosale/Reports')));

const AddProjects = Loadable(lazy(() => import('../views/cubosale/AddProjects')));
const EditProject = Loadable(lazy(() => import('../views/cubosale/EditProject')));

// Tender
const TenderTable = Loadable(lazy(() => import('../views/smartconTables/Enquiry')));
const TradingDashboard = Loadable(lazy(() => import('../views/smartconTables/TradingDashboard')));
const PayrollDashboard = Loadable(lazy(() => import('../views/smartconTables/PayrollDashboard')));
const ProjectDashboard = Loadable(lazy(() => import('../views/smartconTables/ProjectDashboard')));
const OrderTable = Loadable(lazy(() => import('../views/smartconTables/SalesOrder')));
const SalesInvoice = Loadable(lazy(() => import('../views/smartconTables/SalesInvoice')));
const ProjectOrder = Loadable(lazy(() => import('../views/smartconTables/ProjectOrder')));
const Pos = Loadable(lazy(() => import('../views/smartconTables/Pos')));
const SalesReturn = Loadable(lazy(() => import('../views/smartconTables/SalesReturn')));
const SalesReceipt = Loadable(lazy(() => import('../views/smartconTables/SalesReceipt')));
const MakeSupplier = Loadable(lazy(() => import('../views/smartconTables/MakeSupplier')));
const OpportunityTable = Loadable(lazy(() => import('../views/smartconTables/Opportunity')));
const ProjectSalesInvoice = Loadable(lazy(() => import('../views/smartconTables/ProjectSalesInvoice')));
const ProjectEnquiryTable = Loadable(lazy(() => import('../views/smartconTables/ProjectEnquiry')));
const InvoiceTable = Loadable(lazy(() => import('../views/smartconTables/Invoice')));
const TaskTable = Loadable(lazy(() => import('../views/smartconTables/Task')));
const PurchaseRequestTable = Loadable(lazy(() => import('../views/smartconTables/PurchaseRequest')));
const ProjectTaskTable = Loadable(lazy(() => import('../views/smartconTables/ProjectTask')));
const DocumentTable = Loadable(lazy(() => import('../views/smartconTables/Document')));
const PurchaseInvoiceTable = Loadable(lazy(() => import('../views/smartconTables/PurchaseInvoice')));
const ProjectSalesReturn = Loadable(lazy(() => import('../views/smartconTables/ProjectSalesReturn')));

const ProjectSalesReceipt = Loadable(lazy(() => import('../views/smartconTables/ProjectSalesReceipt')));

const Attendance = Loadable(lazy(() => import('../views/smartconTables/Attendance')));
const ProjectTable = Loadable(lazy(() => import('../views/smartconTables/Project')));
const ClientTable = Loadable(lazy(() => import('../views/smartconTables/Client')));
const BookingTable = Loadable(lazy(() => import('../views/smartconTables/Booking')));
const ProposalTable = Loadable(lazy(() => import('../views/smartconTables/Proposal')));
const UomTable = Loadable(lazy(() => import('../views/smartconTables/uom')));
const TradingQuotationTable = Loadable(lazy(() => import('../views/smartconTables/TradingQuotation')));
const ProjectQuotationTable = Loadable(lazy(() => import('../views/smartconTables/ProjectQuotation')));
const ProjectJobOrderTable = Loadable(lazy(() => import('../views/smartconTables/ProjectJobOrder')));
const GoodsDeliveryTable = Loadable(lazy(() => import('../views/smartconTables/GoodsDelivery')));
const ProjectGoodsDelivery = Loadable(lazy(() => import('../views/smartconTables/ProjectGoodsDelivery')));
const TimesheetTable = Loadable(lazy(() => import('../views/smartconTables/Timesheet')));
const ProductTable = Loadable(lazy(() => import('../views/smartconTables/product')));
const Planning = Loadable(lazy(() => import('../views/smartconTables/Planning')));
const PriceList = Loadable(lazy(() => import('../views/smartconTables/PriceList')));
const SupplierPriceList = Loadable(lazy(() => import('../views/smartconTables/SupplierPriceList')));
const LabourRequest = Loadable(lazy(() => import('../views/smartconTables/LabourRequest')));
const PurchaseReturn = Loadable(lazy(() => import('../views/smartconTables/PurchaseReturn')));
const MaterialRequest = Loadable(lazy(() => import('../views/smartconTables/MaterialRequest')));
const MaterialIssue = Loadable(lazy(() => import('../views/smartconTables/MaterialIssue')));
const EquipmentRequest = Loadable(lazy(() => import('../views/smartconTables/EquipmentRequest')));
const EquipmentIssue = Loadable(lazy(() => import('../views/smartconTables/EquipmentIssue')));
const BillOfMaterials = Loadable(lazy(() => import('../views/smartconTables/BillOfMaterials')));
const BillOfMaterialsShortage = Loadable(lazy(() => import('../views/smartconTables/BillOfMaterialsShortage')));
const TestTable = Loadable(lazy(() => import('../views/smartconTables/Test')));
const PurchaseOrderTable = Loadable(lazy(() => import('../views/smartconTables/PurchaseOrder')));
const PurchaseOrderDashboardTable = Loadable(lazy(() => import('../views/smartconTables/PurchaseOrderDashboard')));
const StatementofAccountsReport = Loadable(
  lazy(() => import('../views/Reports/StatementofAccountsReport')),
);
const AccountsDashboard = Loadable(lazy(() => import('../views/smartconTables/AccountsDashboard')));
const InventoryDashboard = Loadable(lazy(() => import('../views/smartconTables/InventoryDashboard')));
const NewStatementsOfAcc = Loadable(lazy(() => import('../views/Reports/NewStatementsOfAcc')));
const AgingReportsTable = Loadable(lazy(() => import('../views/smartconTables/AgingReports')));
const InvoiceByMonth = Loadable(lazy(() => import('../views/smartconTables/InvoiceByMonth')));

// const IR8AReport = Loadable(lazy(() => import('../views/smartconTables/IR8AReport')));
const ProfitLossReport = Loadable(lazy(() => import('../views/Reports/ProfitLossReport')));
const BalanceSheetReport = Loadable(lazy(() => import('../views/Reports/BalanceSheetReport')));


 

// Details Table
const TenderDetailsTable = Loadable(lazy(() => import('../views/DetailTable/TenderDetails')));
const EnquiryDetails = Loadable(lazy(() => import('../views/DetailTable/EnquiryDetails')));
const SalesOrderDetails = Loadable(lazy(() => import('../views/DetailTable/SalesOrderDetails')));
const ProjectOrderDetails = Loadable(lazy(() => import('../views/DetailTable/ProjectOrderDetails')));
const InvoiceDetails = Loadable(lazy(() => import('../views/DetailTable/InvoiceDetails')));
const ReturnDetails = Loadable(lazy(() => import('../views/DetailTable/ReturnDetails')));
const ProjectReturnDetails = Loadable(lazy(() => import('../views/DetailTable/ProjectReturnDetails')));

const ReceiptDetails = Loadable(lazy(() => import('../views/DetailTable/ReceiptDetails')));
const MakeSupplierDetails = Loadable(lazy(() => import('../views/DetailTable/MakeSupplierDetails')));
const ProjectEnquiryDetails = Loadable(lazy(() => import('../views/DetailTable/ProjectEnquiryDetails')));
const TradingQuotationDetails = Loadable(lazy(() => import('../views/DetailTable/TradingQuotationDetails')));
const ProjectQuotationDetails = Loadable(lazy(() => import('../views/DetailTable/ProjectQuotationDetails')));
const ProjectJobOrderDetails = Loadable(lazy(() => import('../views/DetailTable/ProjectJobOrderDetails')));
const GoodsDeliveryDetails = Loadable(lazy(() => import('../views/DetailTable/GoodsDeliveryDetails')));
const ProjectGoodsDeliveryDetails = Loadable(lazy(() => import('../views/DetailTable/ProjectGoodsDeliveryDetails')));
const ProductDetailsTable = Loadable(lazy(() => import('../views/DetailTable/ProductDetails')));
const PlanningDetails = Loadable(lazy(() => import('../views/DetailTable/PlanningDetails')));
const PriceListDetails = Loadable(lazy(() => import('../views/DetailTable/PriceListDetails')));
const SupplierPriceListDetails = Loadable(lazy(() => import('../views/DetailTable/SupplierPriceListDetails')));
const LabourRequestDetails = Loadable(lazy(() => import('../views/DetailTable/LabourRequestDetails')));
const PurchaseReturnDetails = Loadable(lazy(() => import('../views/DetailTable/PurchaseReturnDetails')));
const MaterialRequestDetails = Loadable(lazy(() => import('../views/DetailTable/MaterialRequestDetails')));
const MaterialIssueDetails = Loadable(lazy(() => import('../views/DetailTable/MaterialIssueDetails')));
const ClientDetailsTable = Loadable(lazy(() => import('../views/DetailTable/ClientDetails')));
const EquipmentRequestDetails = Loadable(lazy(() => import('../views/DetailTable/EquipmentRequestDetails')));
const EquipmentIssueDetails = Loadable(lazy(() => import('../views/DetailTable/EquipmentIssueDetails')));
const BookingDetails = Loadable(lazy(() => import('../views/DetailTable/BookingDetails')));
const ProposalDetails = Loadable(lazy(() => import('../views/DetailTable/ProposalDetails')));
const ProjectListDetails = Loadable(lazy(() => import('../views/DetailTable/ProjectListDetails')));
const TimesheetDetailsTable = Loadable(lazy(() => import('../views/DetailTable/TimesheetDetails')));
const GoodsReceivedTable = Loadable(lazy(() => import('../views/smartconTables/GoodsReceived')));
const ChangeRequestTable = Loadable(lazy(() => import('../views/smartconTables/ChangeRequest')));
const UomDetails = Loadable(lazy(() => import('../views/DetailTable/UomDetails')));
const ProjectReceiptDetails = Loadable(lazy(() => import('../views/DetailTable/ProjectReceiptDetails')));
const ProjectSalesInvoiceDetails = Loadable(lazy(() => import('../views/DetailTable/ProjectSalesInvoiceDetails')));

// Finance Admin
const FinanceTable = Loadable(lazy(() => import('../views/smartconTables/Finance')));
const AccountsTable = Loadable(lazy(() => import('../views/smartconTables/Accounts')));
const AccountDetails = Loadable(lazy(() => import('../views/DetailTable/AccountDetails')));
const ExpenseHeadTable = Loadable(lazy(() => import('../views/smartconTables/ExpenseHead')));
const ExpenseHeadDetails = Loadable(lazy(() => import('../views/DetailTable/ExpenseHeadDetails')));
const IncomeHeadTable = Loadable(lazy(() => import('../views/smartconTables/IncomeHead')));
const IncomeHeadDetails = Loadable(lazy(() => import('../views/DetailTable/IncomeHeadDetails')));
const SupplierTable = Loadable(lazy(() => import('../views/smartconTables/Supplier')));
const SupplierDetailsTable = Loadable(lazy(() => import('../views/DetailTable/SupplierDetails')));
const SubConTable = Loadable(lazy(() => import('../views/smartconTables/Subcon')));
const SubConDetailsTable = Loadable(lazy(() => import('../views/DetailTable/SubConDetails')));
const InventoryTable = Loadable(lazy(() => import('../views/smartconTables/Inventory')));
const VehicleTable = Loadable(lazy(() => import('../views/smartconTables/Vehicle')));
const VehicleDetails = Loadable(lazy(() => import('../views/DetailTable/VehicleDetails')));
const PurchaseRequestDetailsTable = Loadable(lazy(() => import('../views/DetailTable/PurchaseRequestDetails')));
const ProjectTaskDetailsTable = Loadable(lazy(() => import('../views/DetailTable/ProjectTaskDetails')));
const GoodsReceiptDetailsTable = Loadable(lazy(() => import('../views/DetailTable/GoodsReceiptDetails')));
const ChangeRequestDetailsTable = Loadable(lazy(() => import('../views/DetailTable/ChangeRequestDetails')));
const DocumentDetailsTable = Loadable(lazy(() => import('../views/DetailTable/DocumentDetails')));
const PurchaseInvoiceDetailsTable = Loadable(lazy(() => import('../views/DetailTable/PurchaseInvoiceDetails')));

// const ChangeRequestDetailsTable = Loadable(lazy(() => import('../views/DetailTable/ChangeRequestDetails')));

// PayrollHR
const LeaveTable = Loadable(lazy(() => import('../views/smartconTables/Leave')));
const LeaveDetailsTable = Loadable(lazy(() => import('../views/DetailTable/LeaveDetails')));
const LoanTable = Loadable(lazy(() => import('../views/smartconTables/Loan')));
const LoanDeatilsTable = Loadable(lazy(() => import('../views/DetailTable/LoanDetails')));
const TrainingTable = Loadable(lazy(() => import('../views/smartconTables/Training')));
const TrainingDetailsTable = Loadable(lazy(() => import('../views/DetailTable/TrainingDetails')));
const JobInformationTable = Loadable(lazy(() => import('../views/smartconTables/JobInformation')));
const JobInformationDetailsTable = Loadable(
  lazy(() => import('../views/DetailTable/JobInformationDetails')),
);
const PayrollManagementTable = Loadable(
  lazy(() => import('../views/smartconTables/PayrollManagement')),
);
const Employee = Loadable(lazy(() => import('../views/smartconTables/Employee')));
const EmployeeDetailsTable = Loadable(lazy(() => import('../views/DetailTable/EmployeeDetails')));
const EmployeeEdit = Loadable(
  lazy(() => import('../views/EditData/EmployeeEdit')),
);
const PayrollManagementDetails = Loadable(
  lazy(() => import('../views/DetailTable/PayrollManagementDetails')),
);
const CPFCalculatorTable = Loadable(lazy(() => import('../views/smartconTables/CPFCalculator')));
const CPFCalculatorDetails = Loadable(
  lazy(() => import('../views/DetailTable/CPFCalculatorDetails')),
);
const CPFCalculatorEdit = Loadable(
  lazy(() => import('../views/EditData/CpfCalculatorEdit')),
);
// Admin
const StaffTable = Loadable(lazy(() => import('../views/smartconTables/Staff')));
const StaffDetailsTable = Loadable(lazy(() => import('../views/DetailTable/StaffDetails')));
const AttendanceEdit = Loadable(lazy(() => import('../views/EditData/AttendanceEdit')));
const Content = Loadable(lazy(() => import('../views/smartconTables/Content')));
const ContentDetailsTable = Loadable(lazy(() => import('../views/DetailTable/ContentDetails')));
const SubCategoryTable = Loadable(lazy(() => import('../views/smartconTables/SubCategory')));
const SubCategoryDetailsTable = Loadable(
  lazy(() => import('../views/DetailTable/SubCategoryDetails')),
);
const ValuelistTable = Loadable(lazy(() => import('../views/smartconTables/Valuelist')));
const ValuelistDetailsTable = Loadable(lazy(() => import('../views/DetailTable/ValuelistDetails')));
const SettingTable = Loadable(lazy(() => import('../views/smartconTables/Setting')));
const Section = Loadable(lazy(() => import('../views/smartconTables/Section')));
const SectionDetails = Loadable(lazy(() => import('../views/DetailTable/SectionDetails')));
const SettingDetails = Loadable(lazy(() => import('../views/DetailTable/SettingDetails')));
const CategoryTable = Loadable(lazy(() => import('../views/smartconTables/Category')));
const TranslationDetails = Loadable(lazy(() => import('../views/DetailTable/TranslationDetails')));
const CategoryDetails = Loadable(lazy(() => import('../views/DetailTable/CategoryDetails')));
const UserGroupTable = Loadable(lazy(() => import('../views/smartconTables/UserGroup')));
const UserGroupDetails = Loadable(lazy(() => import('../views/DetailTable/UserGroupDetails')));
const Support = Loadable(lazy(() => import('../views/smartconTables/Support')));
const Translation = Loadable(lazy(() => import('../views/smartconTables/Translation')));
const RequestForQuoteTable = Loadable(lazy(() => import('../views/smartconTables/RequestForQuote')));
const RequestForQuoteDetails = Loadable(lazy(() => import('../views/DetailTable/RequestForQuoteDetails')));


//SupplierModal
const SupplierHistory = Loadable(lazy(() => import('../components/SupplierModal/SupplierHistory')));
const SubConHistory = Loadable(lazy(() => import('../components/SubConModal/SubConHistory')));
const SupportDetails = Loadable(lazy(() => import('../views/DetailTable/SupportDetails')));
const PurchaseOrderDetails = Loadable(
  lazy(() => import('../views/DetailTable/PurchaseOrderDetails')),
);

// Table Edit's
const TenderEdit = Loadable(lazy(() => import('../views/EditData/TenderEdit')));
const EnquiryEdit = Loadable(lazy(() => import('../views/EditData/EnquiryEdit')));
const OrdersEdit = Loadable(lazy(() => import('../views/EditData/OrdersEdit')));
const ProjectOrderEdit = Loadable(lazy(() => import('../views/EditData/ProjectOrderEdit')));
const InvoiceEdit = Loadable(lazy(() => import('../views/EditData/InvoiceEdit')));
const ReturnEdit = Loadable(lazy(() => import('../views/EditData/ReturnEdit')));
const ReceiptEdit = Loadable(lazy(() => import('../views/EditData/ReceiptEdit')));
const ProjectEnquiryEdit = Loadable(lazy(() => import('../views/EditData/ProjectEnquiryEdit')));
const ProductEdit = Loadable(lazy(() => import('../views/EditData/ProductEdit')));
const FinanceEdit = Loadable(lazy(() => import('../views/EditData/FinanceEdit')));
const TrainingEdit = Loadable(lazy(() => import('../views/EditData/TrainingEdit')));
const ProjectEdit = Loadable(lazy(() => import('../views/EditData/ProjectEdit')));
const ProposalEdit = Loadable(lazy(() => import('../views/EditData/ProposalEdit')));
const BookingEdit = Loadable(lazy(() => import('../views/EditData/BookingEdit')));
const TradingQuotationEdit = Loadable(lazy(() => import('../views/EditData/TradingQuotationEdit')));
const ProjectQuotationEdit = Loadable(lazy(() => import('../views/EditData/ProjectQuotationEdit')));
const ProjectJobOrderEdit = Loadable(lazy(() => import('../views/EditData/ProjectJobOrderEdit')));
const GoodsDeliveryEdit = Loadable(lazy(() => import('../views/EditData/GoodsDeliveryEdit')));
const ProjectGoodsDeliveryEdit = Loadable(lazy(() => import('../views/EditData/ProjectGoodsDeliveryEdit')));
const ClientEdit = Loadable(lazy(() => import('../views/EditData/ClientEdit')));
const VehicleEdit = Loadable(lazy(() => import('../views/EditData/VehicleEdit')));
const ContentEdit = Loadable(lazy(() => import('../views/EditData/ContentEdit')));
const ExpenseHeadEdit = Loadable(lazy(() => import('../views/EditData/ExpenseHeadEdit')));
const IncomeHeadEdit = Loadable(lazy(() => import('../views/EditData/IncomeHeadEdit')));
const SectionEdit = Loadable(lazy(() => import('../views/EditData/SectionEdit')));
const LoanEdit = Loadable(lazy(() => import('../views/EditData/LoanEdit')));
const LeavesEdit = Loadable(lazy(() => import('../views/EditData/LeavesEdit')));
const SubConEdit = Loadable(lazy(() => import('../views/EditData/SubConEdit')));
const SupplierEdit = Loadable(lazy(() => import('../views/EditData/SupplierEdit')));
const JobInformationEdit = Loadable(lazy(() => import('../views/EditData/JobInformationEdit')));
const TranslationEdit = Loadable(lazy(() => import('../views/EditData/TranslationEdit')));
const StaffEdit = Loadable(lazy(() => import('../views/EditData/StaffEdit')));
const Login = Loadable(lazy(() => import('../views/DetailTable/Login')));
const ValueListEdit = Loadable(lazy(() => import('../views/EditData/ValueListEdit')));
const PlanningEdit = Loadable(lazy(() => import('../views/EditData/PlanningEdit')));
const PriceListEdit = Loadable(lazy(() => import('../views/EditData/PriceListEdit')));
const SupplierPriceListEdit = Loadable(lazy(() => import('../views/EditData/SupplierPriceListEdit')));
const LabourRequestEdit = Loadable(lazy(() => import('../views/EditData/LabourRequestEdit')));
const PurchaseReturnEdit = Loadable(lazy(() => import('../views/EditData/PurchaseReturnEdit')));
const MaterialRequestEdit = Loadable(lazy(() => import('../views/EditData/MaterialRequestEdit')));
const MaterialIssueEdit = Loadable(lazy(() => import('../views/EditData/MaterialIssueEdit')));
const EquipmentRequestEdit = Loadable(lazy(() => import('../views/EditData/EquipmentRequestEdit')));
const EquipmentIssueEdit = Loadable(lazy(() => import('../views/EditData/EquipmentIssueEdit')));
const SubCategoryEdit = Loadable(lazy(() => import('../views/EditData/SubCategoryEdit')));
const AccountsEdit = Loadable(lazy(() => import('../views/EditData/AccountsEdit')));
const TimesheetEdit = Loadable(lazy(() => import('../views/EditData/TimesheetEdit')));
const CategoryEdit = Loadable(lazy(() => import('../views/EditData/CategoryEdit')));
const SupportEdit = Loadable(lazy(() => import('../views/EditData/SupportEdit')));
const SettingEdit = Loadable(lazy(() => import('../views/EditData/SettingEdit')));
const InventoryEdit = Loadable(lazy(() => import('../views/EditData/InventoryEdit')));
const UserGroupEdit = Loadable(lazy(() => import('../views/EditData/UserGroupEdit')));
const PurchaseOrderEdit = Loadable(lazy(() => import('../views/EditData/PurchaseOrderEdit')));
const RequestForQuoteEdit = Loadable(lazy(() => import('../views/EditData/RequestForQuoteEdit')));

const PurchaseRequestEdit = Loadable(lazy(() => import('../views/EditData/PurchaseRequestEdit')));
const ProjectTaskEdit = Loadable(lazy(() => import('../views/EditData/ProjectTaskEdit')));
const GoodsReceiptEdit = Loadable(lazy(() => import('../views/EditData/GoodsReceiptEdit')));
const ChangeRequestEdit = Loadable(lazy(() => import('../views/EditData/ChangeRequestEdit')));
const DocumentEdit = Loadable(lazy(() => import('../views/EditData/DocumentEdit')));
const PurchaseInvoiceEdit = Loadable(lazy(() => import('../views/EditData/PurchaseInvoiceEdit')));
const UomEdit = Loadable(lazy(() => import('../views/EditData/UomEdit')));
const ProjectSalesInvoiceEdit = Loadable(lazy(() => import('../views/EditData/ProjectSalesInvoiceEdit')));
const ProjectReturnEdit = Loadable(lazy(() => import('../views/EditData/ProjectReturnEdit')));


//Reports
const ProjectReportTable = Loadable(lazy(() => import('../views/Reports/ProjectReport')));
const OverallSalesReportTable = Loadable(
  lazy(() => import('../views/Reports/OverAllSalesSummaryReport')),
);
const InvoiceByYearTable = Loadable(lazy(() => import('../views/Reports/InvoiceByYear')));
const SupportNewTable = Loadable(lazy(() => import('../views/smartconTables/SupportNew')));

//Reports
// const CpfSummaryReports = Loadable(lazy(() => import('../views/smartconTables/CpfSummaryReports')));
const PurchaseGstReport = Loadable(lazy(() => import('../views/smartconTables/PurchaseGstReport')));

const Routernew = () => {
  const { token, setToken } = UserToken();

  if (!token) {
    return <LoginFormik setToken={setToken} />;
  }
  return (
    <div>
      <Routes>
        <Route path="/" element={<FullLayout></FullLayout>}>
          {/* Table Edit's */}
          <Route path="/AttendanceEdit/:id" name="attendancedata" element={<AttendanceEdit />}></Route>
          <Route path="/TenderEdit/:id" name="clienttdata" element={<TenderEdit />}></Route>
          <Route path="/ProductEdit/:id" name="clienttdata" element={<ProductEdit />}></Route>
          <Route path="/EnquiryEdit/:id" name="clienttdata" element={<EnquiryEdit />}></Route>
          <Route path="/OrdersEdit/:insertedDataId/:quoteId" name="clienttdata" element={<OrdersEdit />}></Route>
          <Route path="/ProjectOrderEdit/:insertedDataId/:quoteId" name="clienttdata" element={<ProjectOrderEdit />}></Route>
          <Route path="/InvoiceEdit/:insertedDataId/:orderId" name="clienttdata" element={<InvoiceEdit />}></Route>
          <Route path="/ReturnEdit/:insertedDataId/:invoiceId" name="clienttdata" element={<ReturnEdit />}></Route>
          <Route path="/PurchaseReturnEdit/:insertedDataId/:PurchaseOrderId" name="clienttdata" element={<PurchaseReturnEdit />}></Route>
          <Route path="/ProjectEnquiryEdit/:id" name="clienttdata" element={<ProjectEnquiryEdit />}></Route>
          <Route path="/ReceiptEdit/:id" name="clienttdata" element={<ReceiptEdit />}></Route>
          <Route path="/FinanceEdit/:id" name="clienttdata" element={<FinanceEdit />}></Route>
          <Route path="/TrainingEdit/:id" name="clienttdata" element={<TrainingEdit />}></Route>
          <Route path="/PlanningEdit/:id" name="clienttdata" element={<PlanningEdit />}></Route>
          <Route path="/PriceListEdit/:id" name="clienttdata" element={<PriceListEdit />}></Route>
          <Route path="/SupplierPriceListEdit/:id" name="clienttdata" element={<SupplierPriceListEdit />}></Route>
          <Route path="/LabourRequestEdit/:id/:projectId" name="clienttdata" element={<LabourRequestEdit />}></Route>
          <Route path="/MaterialRequestEdit/:id" name="clienttdata" element={<MaterialRequestEdit />}></Route>
          <Route path="/MaterialIssueEdit/:id" name="clienttdata" element={<MaterialIssueEdit />}></Route>
          <Route path="/EquipmentRequestEdit/:id" name="clienttdata" element={<EquipmentRequestEdit />}></Route>
          <Route path="/EquipmentIssueEdit/:id" name="clienttdata" element={<EquipmentIssueEdit />}></Route>
          <Route path="/ContentEdit/:id" name="clienttdata" element={<ContentEdit />}></Route>
          <Route path="/VehicleEdit/:id" name="clienttdata" element={<VehicleEdit />}></Route>
          <Route path="/projectEdit/:id/:proposalId" name="clienttdata" element={<ProjectEdit />}></Route>
          <Route path="/clientEdit/:id" name="clienttdata" element={<ClientEdit />}></Route>
          <Route path="/sectionEdit/:id" name="clienttdata" element={<SectionEdit />}></Route>
          <Route path="/AccountsEdit/:id" name="clienttdata" element={<AccountsEdit />}></Route>
          <Route path="/LeavesEdit/:id" name="clienttdata" element={<LeavesEdit />}></Route>
          <Route path="/TranslationEdit/:id" name="translationdata" element={<TranslationEdit />}></Route>
          <Route path="/BookingEdit/:id" name="clienttdata" element={<BookingEdit />}></Route>
          <Route path="/TradingQuotationEdit/:id" name="clienttdata" element={<TradingQuotationEdit />}></Route>
          <Route path="/ProjectQuotationEdit/:id" name="clienttdata" element={<ProjectQuotationEdit />}></Route>
          <Route path="/ProjectJobOrderEdit/:id" name="clienttdata" element={<ProjectJobOrderEdit />}></Route>
          <Route path="/GoodsDeliveryEdit/:id/:OrderId" name="clienttdata" element={<GoodsDeliveryEdit />}></Route>
          <Route path="/ProjectGoodsDeliveryEdit/:insertedDataId/:OrderId" name="goodsdeliverydata" element={<ProjectGoodsDeliveryEdit />}></Route>
          <Route path="/ProjectTaskEdit/:id" name="tenderdata" element={<ProjectTaskEdit />}></Route>
          <Route path="/GoodsReceiptEdit/:id" name="tenderdata" element={<GoodsReceiptEdit />}></Route>
          <Route path="/TradingQuotationEdit/:id" name="clienttdata" element={<TradingQuotationEdit />}></Route>
          {/* <Route path="/GoodsDeliveryEdit/:id/:OrderId" name="clienttdata" element={<GoodsDeliveryEdit />}></Route> */}
          <Route path="/ChangeRequestEdit/:id" name="tenderdata" element={<ChangeRequestEdit />}></Route>
          <Route path="/DocumentEdit/:id" name="tenderdata" element={<DocumentEdit />}></Route>
          <Route path="/PurchaseInvoiceEdit/:id" name="tenderdata" element={<PurchaseInvoiceEdit />}></Route>
          <Route path="/ProposalEdit/:id" name="clienttdata" element={<ProposalEdit />}></Route>
          <Route path="/UomEdit/:id" name="clienttdata" element={<UomEdit />}></Route>
          <Route path="/ProjectReturnEdit/:insertedDataId/:invoiceId" name="clienttdata" element={<ProjectReturnEdit />}></Route>

          <Route
            path="/expenseHeadEdit/:id"
            name="clienttdata"
            element={<ExpenseHeadEdit />}
          ></Route>
          <Route
            path="/incomeHeadEdit/:id"
            name="clienttdata"
            element={<IncomeHeadEdit />}
          ></Route>
        <Route path="/LoanEdit/:id/:employeeId" element={<LoanEdit />} />
        <Route path="/SubConEdit/:id" name="clienttdata" element={<SubConEdit />}></Route>
          <Route path="/SupplierEdit/:id" name="clienttdata" element={<SupplierEdit />}></Route>
          <Route
            path="/JobInformationEdit/:id"
            name="clienttdata"
            element={<JobInformationEdit />}
          ></Route>
          <Route path="/StaffEdit/:id" name="clienttdata" element={<StaffEdit />}></Route>
          <Route path="/Login/:id" name="clienttdata" element={<Login />}></Route>
          <Route path="/ValueListEdit/:id" name="clienttdata" element={<ValueListEdit />}></Route>
          <Route
            path="/SubCategoryEdit/:id"
            name="clienttdata"
            element={<SubCategoryEdit />}
          ></Route>
          <Route path="/CategoryEdit/:id" name="clienttdata" element={<CategoryEdit />}></Route>
          <Route path="/SupportEdit/:id" name="clienttdata" element={<SupportEdit />}></Route>
          <Route path="/SettingEdit/:id" name="clienttdata" element={<SettingEdit />}></Route>
          <Route path="/Inventory" name="clienttdata" element={<InventoryTable />}></Route>
          <Route path="/inventoryEdit/:id" name="clienttdata" element={<InventoryEdit />}></Route>
          <Route path="/UserGroupEdit/:id" name="clienttdata" element={<UserGroupEdit />}></Route>
          <Route
            path="/PurchaseOrderEdit/:id"
            name="clienttdata"
            element={<PurchaseOrderEdit />}
          ></Route>
            <Route
            path="/RequestForQuoteEdit/:id"
            name="clienttdata"
            element={<RequestForQuoteEdit />}
            ></Route>
          <Route
            path="/PurchaseRequestEdit/:id"
            name="clienttdata"
            element={<PurchaseRequestEdit />}
          ></Route>
          <Route
            path="/ProjectTaskEdit/:id"
            name="clienttdata"
            element={<ProjectTaskEdit />}
          ></Route>

          {/* Supplier Modal */}
          <Route
            path="/SupplierHistory/:id"
            name="clienttdata"
            element={<SupplierHistory />}
          ></Route>
          <Route path="/SubConHistory/:id" name="clienttdata" element={<SubConHistory />}></Route>
          <Route path="/TimesheetEdit/:id" name="clienttdata" element={<TimesheetEdit />}></Route>
          <Route
            path="/JobInformationEdit/:id"
            name="clienttdata"
            element={<JobInformationEdit />}
          ></Route>

          <Route path="/pdf/:id" name="pdfData" element={<PdfData />}></Route>
          <Route path="/pdfnext" name="pdfData" element={<PdfNext />}></Route>
          <Route path="/TicketsComponent" name="pdfData" element={<TicketsComponent />}></Route>
          <Route path="/projects" element={<DataTable />} />
          <Route path="/" element={<Classic />} />
          <Route path="/dashboards/crypto" name="Classic" element={<Crypto />}></Route>
          <Route path="/dashboards/ecommerce" name="ecommerce" element={<Ecommerce />}></Route>
          <Route path="/dashboards/general" name="general" element={<General />}></Route>
          <Route path="/dashboards/extra" name="extra" element={<Extra />}></Route>
          <Route path="/about" name="about" element={<About />}></Route>
          <Route path="/apps/notes" name="notes" element={<Notes />}></Route>
          <Route path="/apps/chat" name="chat" element={<Chat />}></Route>
          <Route path="/apps/contacts" name="contacts" element={<Contacts />}></Route>
          <Route path="/apps/calendar" name="calendar" element={<Calendar />}></Route>
          <Route path="/apps/email" name="email" element={<Email />}></Route>
          <Route path="/ecom/shop" name="email" element={<Shop />}></Route>
          <Route path="/ecom/shopdetail" name="email" element={<ShopDetail />}></Route>
          <Route path="/tickt/ticket-list" name="ticket list" element={<TicketList />}></Route>
          <Route
            path="/tickt/ticket-detail"
            name="ticket detail"
            element={<TicketDetail />}
          ></Route>
          <Route path="/apps/treeview" name="email" element={<Treeview />}></Route>
          <Route path="/ui/alerts" name="alerts" element={<Alerts />}></Route>
          <Route path="/ui/badges" name="badges" element={<Badges />}></Route>
          <Route path="/ui/buttons" name="buttons" element={<Buttons />}></Route>
          <Route path="/ui/cards" name="cards" element={<Cards />}></Route>
          <Route path="/ui/grid" name="grid" element={<Grid />}></Route>
          <Route path="/ui/table" name="table" element={<Tables />}></Route>
          <Route path="/ui/forms" name="forms" element={<Forms />}></Route>
          <Route path="/ui/breadcrumbs" name="breadcrumbs" element={<Breadcrumbs />}></Route>
          <Route path="/ui/dropdown" name="dropdown" element={<Dropdowns />}></Route>
          <Route path="/ui/button-group" name="button group" element={<BtnGroup />}></Route>
          <Route path="/ui/collapse" name="collapse" element={<Collapse />}></Route>
          <Route path="/ui/list-group" name="list-group" element={<ListGroup />}></Route>
          <Route path="/ui/modal" name="modal" element={<Modal />}></Route>
          <Route path="/ui/navbar" name="navbar" element={<Navbar />}></Route>
          <Route path="/ui/nav" name="nav" element={<Nav />}></Route>
          <Route path="/ui/pagination" name="pagination" element={<Pagination />}></Route>
          <Route path="/ui/popover" name="popover" element={<Popover />}></Route>
          <Route path="/ui/progress" name="progress" element={<Progress />}></Route>
          <Route path="/ui/spinner" name="spinner" element={<Spinner />}></Route>
          <Route path="/ui/tabs" name="tabs" element={<Tabs />}></Route>
          <Route path="/ui/toasts" name="toasts" element={<Toasts />}></Route>
          <Route path="/ui/tooltip" name="tooltip" element={<Tooltip />}></Route>
          <Route path="/form-layout/form-basic" name="form-basic" element={<FormBasic />}></Route>
          <Route path="/form-layout/form-grid" name="form-grid" element={<FormGrid />}></Route>
          <Route path="/form-layout/form-group" name="form-group" element={<FormGroup />}></Route>
          <Route path="/form-layout/form-input" name="form-input" element={<FormInput />}></Route>
          <Route path="/form-pickers/datepicker" name="datepicker" element={<Datepicker />} />
          <Route path="/form-pickers/tag-select" name="tag-select" element={<TagSelect />}></Route>
          <Route path="/form-validation" name="form-validation" element={<FormValidate />}></Route>
          <Route path="/form-steps" name="form-steps" element={<FormSteps />}></Route>
          <Route path="/form-editor" name="form-editor" element={<FormEditor />}></Route>

          <Route path="/tables/basic-table" name="basic-table" element={<Basictable />}></Route>
          <Route path="/tables/react-table" name="react-table" element={<CustomReactTable />} />
          <Route path="/tables/data-table" name="data-table" element={<ReactBootstrapTable />} />
          <Route path="/charts/apex" name="apex" element={<ApexCharts />}></Route>
          <Route path="/charts/chartjs" name="chartjs" element={<ChartJs />}></Route>
          <Route path="/sample-pages/profile" name="profile" element={<Profile />}></Route>
          <Route path="/sample-pages/helper-class" name="helper-class" element={<HelperClass />} />
          <Route path="/sample-pages/starterkit" name="starterkit" element={<StarterKit />} />
          <Route path="/sample-pages/gallery" name="gallery" element={<Gallery />}></Route>
          <Route
            path="/sample-pages/search-result"
            name="search-result"
            element={<SearchResult />}
          />
          <Route path="/icons/bootstrap" name="bootstrap" element={<Bootstrap />}></Route>
          <Route path="/icons/feather" name="feather" element={<Feather />}></Route>
          <Route path="/map/vector" name="vector" element={<CustomVectorMap />}></Route>
          <Route path="/widget" name="widget" element={<Widget />}></Route>
          <Route path="/casl" name="casl" element={<CASL />}></Route>
          <Route path="/auth/404" name="404" element={<Error />}></Route>
          <Route path="/projects/addproject" name="addproject" element={<AddProjects />}></Route>
          <Route
            path="/projects/editproject/:id"
            name="editproject"
            element={<EditProject />}
          ></Route>
          <Route path="/projects/projectreport" name="projectreport" element={<Reports />}></Route>
          <Route
            path="/OverAllSalesSummaryReport"
            name="clienttdata"
            element={<OverallSalesReportTable />}
          ></Route>
          <Route path="/InvoiceByYear" name="clienttdata" element={<InvoiceByYearTable />}></Route>
          {/* Tender */}
          <Route path="/Enquiry" name="tenderdata" element={<TenderTable />}></Route>
          <Route path="/ProjectOrder" name="tenderdata" element={<ProjectOrder />}></Route>
          <Route path="/Pos" name="tenderdata" element={<Pos />}></Route>
          <Route path="/TradingDashboard" name="tradingdata" element={<TradingDashboard />}></Route>
          <Route path="/PayrollDashboard" name="tradingdata" element={<PayrollDashboard />}></Route>
          <Route path="/ProjectDashboard" name="tradingdata" element={<ProjectDashboard />}></Route>
          <Route path="/SalesOrder" name="tenderdata" element={<OrderTable />}></Route>
          <Route path="/SalesInvoice" name="tenderdata" element={<SalesInvoice />}></Route>
          <Route path="/SalesReturn" name="tenderdata" element={<SalesReturn />}></Route>
          <Route path="/SalesReceipt" name="tenderdata" element={<SalesReceipt />}></Route>
          <Route path="/MakeSupplier" name="tenderdata" element={<MakeSupplier />}></Route>
          <Route path="/Opportunity" name="clienttdata" element={<OpportunityTable />}></Route>
          <Route path="/ProjectEnquiry" name="clienttdata" element={<ProjectEnquiryTable />}></Route>
          <Route path="/Task" name="tenderdata" element={<TaskTable />}></Route>
          <Route path="/PurchaseRequest" name="tenderdata" element={<PurchaseRequestTable />}></Route>
          <Route path="/ProjectTask" name="tenderdata" element={<ProjectTaskTable />}></Route>
          <Route path="/GoodsReceived" name="tenderdata" element={<GoodsReceivedTable />}></Route>
          <Route path="/ChangeRequest" name="tenderdata" element={<ChangeRequestTable />}></Route>
          <Route path="/Document" name="tenderdata" element={<DocumentTable />}></Route>
          <Route path="/PurchaseInvoice" name="tenderdata" element={<PurchaseInvoiceTable />}></Route>
          <Route path="/ProjectSalesInvoice" name="tenderdata" element={<ProjectSalesInvoice />}></Route>
          <Route path="/ProjectSalesInvoiceDetails" name="tenderdata" element={<ProjectSalesInvoiceDetails />}></Route>
          <Route path="/ProjectSalesInvoiceEdit/:insertedDataId/:orderId" name="tenderdata" element={<ProjectSalesInvoiceEdit />}></Route>
          <Route path="/ProjectSalesReceipt" name="tenderdata" element={<ProjectSalesReceipt />}></Route>
          <Route path="/ProjectSalesReturn" name="tenderdata" element={<ProjectSalesReturn />}></Route>

          <Route path="/Attendance" name="tenderdata" element={<Attendance />}></Route>
          <Route path="/TenderDetails" name="tenderdata" element={<TenderDetailsTable />}></Route>
          <Route path="/TranslationDetails" name="translationdetailsdata" element={<TranslationDetails />}></Route>
          <Route path="/Translation" name="translationdata" element={<Translation />}></Route>
          <Route path="/EnquiryDetails" name="clienttdata" element={<EnquiryDetails />}></Route>
          <Route path="/SalesOrderDetails" name="clienttdata" element={<SalesOrderDetails />}></Route>
          <Route path="/ProjectOrderDetails" name="clienttdata" element={<ProjectOrderDetails />}></Route>
          <Route path="/InvoiceDetails" name="clienttdata" element={<InvoiceDetails />}></Route>
          <Route path="/ReturnDetails" name="clienttdata" element={<ReturnDetails />}></Route>
          <Route path="/ReceiptDetails" name="clienttdata" element={<ReceiptDetails />}></Route>
          <Route path="/MakeSupplierDetails" name="clienttdata" element={<MakeSupplierDetails />}></Route>
          <Route path="/TradingQuotationDetails" name="clienttdata" element={<TradingQuotationDetails />}></Route>
          <Route path="/ProjectQuotationDetails" name="clienttdata" element={<ProjectQuotationDetails />}></Route>
          <Route path="/ProjectJobOrderDetails" name="clienttdata" element={<ProjectJobOrderDetails />}></Route>
          <Route path="/GoodsDeliveryDetails" name="clienttdata" element={<GoodsDeliveryDetails />}></Route>
          <Route path="/ProjectGoodsDeliveryDetails" name="clienttdata" element={<ProjectGoodsDeliveryDetails />}></Route>
          <Route path="/ProjectEnquiryDetails" name="clienttdata" element={<ProjectEnquiryDetails />}></Route>
          <Route path="/ProductDetails" name="tenderdata" element={<ProductDetailsTable />}></Route>
          <Route path="/ProjectReceiptDetails" name="clienttdata" element={<ProjectReceiptDetails />}></Route>
          <Route path="/ProjectReturnDetails" name="clienttdata" element={<ProjectReturnDetails />}></Route>

          <Route path="/Project" name="projectdata" element={<ProjectTable />}></Route>
          <Route path="/Proposal" name="projectdata" element={<ProposalTable />}></Route>
          <Route path="/Client" name="clienttdata" element={<ClientTable />}></Route>
          <Route path="/Planning" name="clienttdata" element={<Planning />}></Route>
          <Route path="/PriceList" name="clienttdata" element={<PriceList />}></Route>
          <Route path="/SupplierPriceList" name="clienttdata" element={<SupplierPriceList />}></Route>
          <Route path="/LabourRequest" name="clienttdata" element={<LabourRequest />}></Route>
          <Route path="/PurchaseReturn" name="clienttdata" element={<PurchaseReturn />}></Route>
          <Route path="/MaterialRequest" name="clienttdata" element={<MaterialRequest />}></Route>
          <Route path="/MaterialIssue" name="clienttdata" element={<MaterialIssue />}></Route>
          <Route path="/EquipmentRequest" name="clienttdata" element={<EquipmentRequest />}></Route>
          <Route path="/EquipmentIssue" name="clienttdata" element={<EquipmentIssue />}></Route>
          <Route path="/BillOfMaterials/:id" name="clienttdata" element={<BillOfMaterials />}></Route>
          <Route path="/BillOfMaterialsShortage/:id" name="clienttdata" element={<BillOfMaterialsShortage />}></Route>
          <Route path="/PlanningDetails" name="clienttdata" element={<PlanningDetails />}></Route>
          <Route path="/PriceListDetails" name="clienttdata" element={<PriceListDetails />}></Route>
          <Route path="/SupplierPriceListDetails" name="clienttdata" element={<SupplierPriceListDetails />}></Route>
          <Route path="/LabourRequestDetails" name="clienttdata" element={<LabourRequestDetails />}></Route>
          <Route path="/PurchaseReturnDetails" name="clienttdata" element={<PurchaseReturnDetails />}></Route>
          <Route path="/ClientDetails" name="clienttdata" element={<ClientDetailsTable />}></Route>
          <Route path="/MaterialRequestDetails" name="clienttdata" element={<MaterialRequestDetails />}></Route>
          <Route path="/MaterialIssueDetails" name="clienttdata" element={<MaterialIssueDetails />}></Route>
          <Route path="/EquipmentRequestDetails" name="clienttdata" element={<EquipmentRequestDetails />}></Route>
          <Route path="/EquipmentIssueDetails" name="clienttdata" element={<EquipmentIssueDetails />}></Route>
          <Route path="/Booking" name="clienttdata" element={<BookingTable />}></Route>
          <Route path="/GoodsDelivery" name="clienttdata" element={<GoodsDeliveryTable />}></Route>
          <Route path="/ProjectGoodsDelivery" name="clienttdata" element={<ProjectGoodsDelivery />}></Route>
          <Route path="/Quotation" name="clienttdata" element={<TradingQuotationTable />}></Route>
          <Route path="/ProjectQuotation" name="clienttdata" element={<ProjectQuotationTable />}></Route>
          <Route path="/ProjectJobOrder" name="clienttdata" element={<ProjectJobOrderTable />}></Route>
          <Route path="/BookingDetails" name="clienttdata" element={<BookingDetails />}></Route>
          <Route path="/Product" name="clienttdata" element={<ProductTable />}></Route>
          <Route path="/Timesheet" name="clienttdata" element={<TimesheetTable />}></Route>
          <Route path="/PurchaserequestDetails" name="tenderdata" element={<PurchaseRequestDetailsTable />}></Route>
          <Route path="/ProjectTaskDetails" name="tenderdata" element={<ProjectTaskDetailsTable />}></Route>
          <Route path="/GoodsReceiptDetails" name="tenderdata" element={<GoodsReceiptDetailsTable />}></Route>
          <Route path="/ChangeRequestDetails" name="tenderdata" element={<ChangeRequestDetailsTable />}></Route>
          <Route path="/DocumentDetails" name="tenderdata" element={<DocumentDetailsTable />}></Route>
          <Route path="/PurchaseInvoiceDetails" name="tenderdata" element={<PurchaseInvoiceDetailsTable />}></Route>
          <Route path="/ProposalDetails" name="clienttdata" element={<ProposalDetails />}></Route>
          <Route path="/ProjectListDetails" name="clienttdata" element={<ProjectListDetails />}></Route>
          <Route path="/UomDetails" name="clienttdata" element={<UomDetails />}></Route>
          <Route path="/uom" name="projectdata" element={<UomTable />}></Route>
          
          {/* <Route path="/ChangeRequestDetails" name="tenderdata" element={<ChangeRequestDetailsTable />}></Route> */}
          <Route
            path="/TimesheetDetails"
            name="clienttdata"
            element={<TimesheetDetailsTable />}
          ></Route>

          <Route path="/Finance" name="clienttdata" element={<FinanceTable />}></Route>
          <Route path="/Invoice" name="clienttdata" element={<InvoiceTable />}></Route>
          <Route path="/Accounts" name="clienttdata" element={<AccountsTable />}></Route>
          <Route path="/AccountDetails" name="clienttdata" element={<AccountDetails />}></Route>
          <Route path="/ExpenseHead" name="clienttdata" element={<ExpenseHeadTable />}></Route>
          <Route
            path="/ExpenseHeadDetails"
            name="clienttdata"
            element={<ExpenseHeadDetails />}
          ></Route>
          <Route path="/IncomeHead" name="clienttdata" element={<IncomeHeadTable />}></Route>
          <Route
            path="/IncomeHeadDetails"
            name="clienttdata"
            element={<IncomeHeadDetails />}
          ></Route>
          <Route path="/Supplier" name="clienttdata" element={<SupplierTable />}></Route>
          <Route
            path="/SupplierDetails"
            name="clienttdata"
            element={<SupplierDetailsTable />}
          ></Route>
          <Route path="/Subcon" name="clienttdata" element={<SubConTable />}></Route>
          <Route path="/SubConDetails" name="clienttdata" element={<SubConDetailsTable />}></Route>
          <Route path="/Inventory" name="clienttdata" element={<InventoryTable />}></Route>
          <Route path="/Vehicle" name="clienttdata" element={<VehicleTable />}></Route>
          <Route path="/VehicleDetails" name="clienttdata" element={<VehicleDetails />}></Route>
          <Route path="/Leave" name="clienttdata" element={<LeaveTable />}></Route>
          <Route path="/LeaveDetails" name="clienttdata" element={<LeaveDetailsTable />}></Route>
          <Route path="/Loan" name="clienttdata" element={<LoanTable />}></Route>
          <Route path="/LoanDetails" name="clienttdata" element={<LoanDeatilsTable />}></Route>
          <Route
            path="/TrainingDetails"
            name="clienttdata"
            element={<TrainingDetailsTable />}
          ></Route>
          <Route path="/Training" name="clienttdata" element={<TrainingTable />}></Route>
          <Route
            path="/JobInformation"
            name="clienttdata"
            element={<JobInformationTable />}
          ></Route>
          <Route
            path="/JobInformationDetails"
            name="clienttdata"
            element={<JobInformationDetailsTable />}
          ></Route>

          <Route path="/CPFCalculator" name="clienttdata" element={<CPFCalculatorTable />}></Route>
          <Route
            path="/CPFCalculatorDetails"
            name="clienttdata"
            element={<CPFCalculatorDetails />}
          ></Route>
          
          <Route path="/cpfCalculatorEdit/:id" name="cpfEdit" element={<CPFCalculatorEdit />}></Route>
          <Route path="/Staff" name="clienttdata" element={<StaffTable />}></Route>
          <Route path="/StaffDetails" name="clienttdata" element={<StaffDetailsTable />}></Route>
          <Route path="/SubCategory" name="clienttdata" element={<SubCategoryTable />}></Route>
          <Route path="/ProjectReport" name="clienttdata" element={<ProjectReportTable />}></Route>
          <Route
            path="/SubCategoryDetails"
            name="clienttdata"
            element={<SubCategoryDetailsTable />}
          ></Route>

          <Route path="/Valuelist" name="clienttdata" element={<ValuelistTable />}></Route>
          <Route
            path="/ValuelistDetails"
            name="clienttdata"
            element={<ValuelistDetailsTable />}
          ></Route>
          <Route path="/Section" name="clienttdata" element={<Section />}></Route>
          <Route path="/SectionDetails" name="clienttdata" element={<SectionDetails />}></Route>
          <Route path="/Setting" name="clienttdata" element={<SettingTable />}></Route>
          <Route path="/SettingDetails" name="clienttdata" element={<SettingDetails />}></Route>
          <Route path="/Category" name="tenderdata" element={<CategoryTable />}></Route>
          <Route path="/CategoryDetails" name="tenderdata" element={<CategoryDetails />}></Route>
          <Route path="/UserGroup" name="clienttdata" element={<UserGroupTable />}></Route>
          <Route path="/UserGroupDetails" name="clienttdata" element={<UserGroupDetails />}></Route>
          <Route path="/RequestForQuote" name="clienttdata" element={<RequestForQuoteTable />}></Route>
          <Route path="/RequestForQuoteDetails" name="clienttdata" element={<RequestForQuoteDetails />}></Route>
          <Route path="/Employee" name="clienttdata" element={<Employee />}></Route>
          <Route
            path="/EmployeeDetails"
            name="clienttdata"
            element={<EmployeeDetailsTable />}
          ></Route>
          <Route
            path="/EmployeeEdit/:id"
            name="clienttdata"
            element={<EmployeeEdit />}
          ></Route>
          <Route
            path="/PayrollManagement"
            name="clienttdata"
            element={<PayrollManagementTable />}
          ></Route>
          <Route
            path="/PayrollManagementDetails/:id"
            name="clienttdata"
            element={<PayrollManagementDetails />}
          ></Route>
          <Route path="/Content" name="clienttdata" element={<Content />}></Route>
          <Route
            path="/ContentDetails"
            name="clienttdata"
            element={<ContentDetailsTable />}
          ></Route>
          <Route path="/test" name="clienttdata" element={<TestTable />}></Route>
          <Route path="/Support" name="clienttdata" element={<Support />}></Route>
          <Route path="/SupportNew" name="clienttdata" element={<SupportNewTable />}></Route>
          <Route path="/SupportDetails" name="tenderdata" element={<SupportDetails />}></Route>
          <Route path="/PurchaseOrder" name="clienttdata" element={<PurchaseOrderTable />}></Route>
          <Route path="/PurchaseOrderDashboard" name="clienttdata" element={<PurchaseOrderDashboardTable/>}></Route>
          <Route path="/AccountsDashboard" name="clienttdata" element={<AccountsDashboard/>}></Route>
          <Route path="/InventoryDashboard" name="clienttdata" element={<InventoryDashboard/>}></Route>
           <Route
            path="/StatementofAccountsReport"
            name="clienttdata"
            element={<StatementofAccountsReport />}
          ></Route>
          <Route
            path="/NewStatementsOfAcc"
            name="clienttdata"
            element={<NewStatementsOfAcc />}
          ></Route>
          <Route path="/AgingReports" name="clienttdata" element={<AgingReportsTable />}></Route>
        
          <Route path="/InvoiceByMonth" name="clienttdata" element={<InvoiceByMonth />}></Route>
              
          <Route path="/ProfitLossReport" name="clienttdata" element={<ProfitLossReport />}></Route>
          <Route path="/BalanceSheetReport" name="clienttdata" element={<BalanceSheetReport />}></Route>


          <Route
            path="/PurchaseGstReport"
            name="clienttdata"
            element={<PurchaseGstReport />}
          ></Route>

          <Route
            path="/PurchaseOrderDetails"
            name="clienttdata"
            element={<PurchaseOrderDetails />}
          ></Route>

          {/* Account */}
          <Route path="/AccountMap" name="AccountMap" element={<AccountMap />} ></Route>
          <Route path="/ChartOfAccounts" name="ChartOfAccounts" element={<ChartOfAccounts />} ></Route>
          <Route path="/Journal" name="Journal" element={<Journal />} ></Route>
          <Route path="/Ledger" name="Ledger" element={<Ledger />} ></Route>
          <Route path="/CreditNote" name="CreditNote" element={<CreditNote />} ></Route>
          <Route path="/DebitNote" name="DebitNote" element={<DebitNote />} ></Route>
          <Route path="/VATReturn" name="VATReturn" element={<VATReturn />} ></Route>

          <Route path="/ChartOfAccountDetails" name="ChartOfAccountDetails" element={<ChartOfAccountDetails />} ></Route>
          <Route path="/JournalDetails" name="JournalDetails" element={<JournalDetails />} ></Route>
          <Route path="/ChartofACEdit/:id" name="ChartofACEdit" element={<ChartofACEdit />} ></Route>
          <Route path="/JournalEdit/:id" name="JournalEdit" element={<JournalEdit />} ></Route>
       
        </Route>
      </Routes>
    </div>
  );
};

export default Routernew;