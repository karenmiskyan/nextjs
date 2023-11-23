import { createReducer } from '@reduxjs/toolkit';

const initailValue = {
    modal: false,
    data: '',
    offset: false,
    overlay: false,
    firstModal: false,
    addToCartModal: false,
    addedCartData: '',
    sizeModal: false,
    catergoryResponsive: false,
    profileModal: false,
    paymentCardsModal: false,
    saveAddressModal: false,
    notificationAlert: false,
    notificationData: [],
    youTubeModal: false,
    isDashboard: false,
    isDelete: false,
    ConfirmDelete: false,
    TopMenuToggle: false,
    configToggle: false,
    ProductFilter: false
};
export const ModalReducer = createReducer(initailValue, {
    'IS_MODAL': (state, action) => {
        state.modal = !state.modal;
        state.data = action.payload;
    },
    'IS_OFFSET': (state) => {
        state.offset = !state.offset;
    },
    'OVERLAY': (state,action) => {
        state.overlay = action.payload;
    },
    'CLOSEOVERLAY': (state) => {
        state.overlay = false;
    },
    'RESETOVERLAY': (state) => {
        state.catergoryResponsive = false;
        state.TopMenuToggle = false;
        state.isDashboard = false;
        state.ProductFilter = false;
    },
    'TOPMENUTOGGLE': (state, action) => {
        state.TopMenuToggle = action.payload;
    },
    'STARTMODAL': (state) => {
        state.firstModal = !state.firstModal;
    },
    'ISCARTADD': (state, action) => {
        state.addToCartModal = !state.addToCartModal;
        state.addedCartData = action.elem;
    },
    'SIZEMODAL': (state) => {
        state.sizeModal = !state.sizeModal;
    },
    'CATEGORYRESPONSIVE': (state) => {
        state.catergoryResponsive = !state.catergoryResponsive;
    },
    'ISPROFILEMODAL': (state) => {
        state.profileModal = !state.profileModal;
    },
    'PAYMENTCARDMODAL': (state) => {
        state.paymentCardsModal = !state.paymentCardsModal;
    },
    'SAVEADDRESSMODAL': (state) => {
        state.saveAddressModal = !state.saveAddressModal;
    },
    'NOTIFICATIONALTER': (state, action) => {
        state.notificationAlert = action.value;
        state.notificationData = action.payload;
    },
    'YOUTUBEMODAL': (state) => {
        state.youTubeModal = !state.youTubeModal;
    },
    'ISDASHBOARD': (state) => {
        state.isDashboard = !state.isDashboard;
    },
    'OPENDELETEMODAL': (state) => {
        state.isDelete = !state.isDelete;
    },
    'CONFIRMDELETE': (state) => {
        state.ConfirmDelete = !state.ConfirmDelete;
    },
    'CONFIGMODAL': (state) => {
        state.configToggle = !state.configToggle;
    },
    'PRODUCTPAGEFILTER': (state) => {
        state.ProductFilter = !state.ProductFilter;
    }

});