import { HttpProps } from "@/utils/api";
export const pageSizeDefault = 10;

export const apiConfig = {
  auth: {
    getTradingRoom: {
      method: "get",
      endPoint: `/trade/rooms`,
    } as HttpProps,
    loginAuth: {
      method: "post",
      endPoint: `/login`,
    } as HttpProps,
    registerAuth: {
      method: "post",
      endPoint: `/signup`,
    } as HttpProps,
    loginKakao: {
      method: "post",
      endPoint: `/auth/kakao`,
    } as HttpProps,
    loginNaver: {
      method: "post",
      endPoint: `/auth/naver`,
    } as HttpProps,
    registerOthers: {
      method: "post",
      endPoint: `/auth/register`,
    } as HttpProps,
    forgotPass: {
      method: "post",
      endPoint: `/me/password/reset`,
    } as HttpProps,
    fetchOtp: {
      method: "post",
      endPoint: `/me/send-code-register`,
    } as HttpProps,
    verifyOtp: {
      method: "post",
      endPoint: `/me/verify-code-register`,
    } as HttpProps,
    sendFindIdCode: {
      method: "post",
      endPoint: `/me/send-code-sms`,
    } as HttpProps,
    verifyFindIdCode: {
      method: "post",
      endPoint: `/me/verify-code-mobile`,
    } as HttpProps,
    sendFindPasswordCode: {
      method: "post",
      endPoint: `/me/send-code-forgot-password`,
    } as HttpProps,
    verifyFindPasswordCode: {
      method: "post",
      endPoint: `/me/verify-code-forgot-password`,
    } as HttpProps,
    changePasswordCode: {
      method: "post",
      endPoint: `/me/password/reset`,
    } as HttpProps,
    updatePassword: {
      method: "post",
      endPoint: `/me/password/edit`,
    } as HttpProps,
    updateInfo: {
      method: "post",
      endPoint: `/me/update-info`,
    } as HttpProps,
    sendChangePasswodCode: {
      method: "post",
      endPoint: `/me/send-code-change-mobile`,
    } as HttpProps,
    verifyChangePasswordCode: {
      method: "post",
      endPoint: `/me/verify-code-change-mobile`,
    } as HttpProps,
  },
  my: {
    getMyInfo: {
      method: "get",
      endPoint: `/me`,
    } as HttpProps,
    getPoint: {
      method: "get",
      endPoint: `/point`,
    } as HttpProps,
    changeQr: {
      method: "post",
      endPoint: `/me/change-qr`,
    } as HttpProps,
    question: {
      method: "post",
      endPoint: `/qnas`,
    } as HttpProps,
    announcement: {
      method: "get",
      endPoint: `/announcement`,
    } as HttpProps,
    getWashingMachineHistory: {
      method: "get",
      // endPoint: `/orders/history/washing-machine`,
    } as HttpProps,
    getDryCleaningHistory: {
      method: "get",
      // endPoint: `/orders/history/dry-cleaning`,
    } as HttpProps,
    getNearbyPlaceHistory: {
      method: "get",
      // endPoint: `/orders/history/nearby-place`,
    } as HttpProps,
    // GetDetailOrderMachineHistory: {
    //   method: "get",
    //   // endPoint: `/orders/history/nearby-place`,
    // } as HttpProps,
  },
  store: {
    getStoreList: {
      method: "get",
      endPoint: `/stores/getAll`,
    } as HttpProps,
    getStoreInfo: {
      method: "get",
      endPoint: `/stores`,
    } as HttpProps,
    getStoreLastUsed: {
      method: "get",
      endPoint: `/stores/get-store-last-used`,
    } as HttpProps,
    calculatorPriceMachine: {
      method: "post",
      endPoint: `/orders/calculator-price-machine`,
    } as HttpProps,
    openDoorStore: {
      method: "post",
      endPoint: `/stores/open-door-store`,
    } as HttpProps,
    reviews: {
      method: "post",
      // endPoint: `/stores/2/reviews`,
    } as HttpProps,
  },
  order: {
    createOrder: {
      method: "post",
      endPoint: `/orders`,
    } as HttpProps,
    timeOrderLinedUp: {
      method: "post",
      endPoint: `/orders/time-order-lined-up`,
    } as HttpProps,
    listCoupon: {
      method: "get",
      endPoint: `/coupon-box/list`,
    } as HttpProps,
    listCouponCanUse: {
      method: "post",
      endPoint: `/coupon-box/list-user-can-be-use`,
    } as HttpProps,
    checkCoupon: {
      method: "post",
      endPoint: `/coupon-box/check`,
    } as HttpProps,
    checkCouponDryCleaning: {
      method: "post",
      endPoint: `/coupon-box/check-dry-cleaning`,
    } as HttpProps,
    paymentInfoOrder: {
      method: "post",
      endPoint: `/orders/payment-info`,
    } as HttpProps,
    totalPoint: {
      method: "get",
      endPoint: `/point/total`,
    } as HttpProps,
    totalCash: {
      method: "get",
      endPoint: `/cash/total`,
    } as HttpProps,
    createPayment: {
      method: "post",
      endPoint: `/orders/create-payment`,
    } as HttpProps,
    getListDryCleaning: {
      method: "get",
      endPoint: `/dry-cleaning`,
    } as HttpProps,
    getOptionDryCleaning: {
      method: "get",
      endPoint: `/dry-cleaning/store`,
    } as HttpProps,
    postDryCleaning: {
      method: "post",
      endPoint: `/dry-cleaning`,
    } as HttpProps,
    getDetailDryCleaning: {
      method: "get",
      endPoint: `/dry-cleaning/order`,
    } as HttpProps,
    calculateDiscountDry: {
      method: "post",
      endPoint: `/dry-cleaning/calculate-discount`,
    } as HttpProps,
    updateOrderDryCleaning: {
      method: "post",
      endPoint: `/dry-cleaning/update`,
    } as HttpProps,
    paymentReady: {
      method: "post",
      endPoint: `/payment/ready`,
    } as HttpProps,
    paymentReadyKakao: {
      method: "post",
      endPoint: `/payment/kakao/ready`,
    } as HttpProps,
    paymentReadyNaver: {
      method: "post",
      endPoint: `/payment/naver/ready`,
    } as HttpProps,
    requestMethodPayment: {
      method: "post",
      endPoint: `/payment/inno`,
    } as HttpProps,
    orderByLaundry: {
      method: "get",
      endPoint: `/orders/laundry`,
    } as HttpProps,
    cancelOrder: {
      method: "post",
      endPoint: `/orders/cancel-order`,
    } as HttpProps,
    cancelOrderDryclearning: {
      method: "post",
      endPoint: `/dry-cleaning/order/cancel`,
    } as HttpProps,
    startMachineOrderApp: {
      method: "post",
      endPoint: `/orders/start-machine-order-app`,
    } as HttpProps,
    reStartMachineByUser: {
      method: "post",
      endPoint: `/orders/re-start-machine-by-user`,
    } as HttpProps,
    orderById: {
      method: "get",
      endPoint: `/orders/get`,
    } as HttpProps,
    orderByOid: {
      method: "get",
      endPoint: `/orders/get-by-oid`,
    } as HttpProps,
  },
  notices: {
    getNotices: {
      method: "get",
      endPoint: `/notices`,
    } as HttpProps,
    readAllNotice: {
      method: "post",
      endPoint: `/notice/read-all`,
    } as HttpProps,
  },
  places: {
    getListPlace: {
      method: "get",
      endPoint: `/place`,
    } as HttpProps,
    getMenuList: {
      method: "get",
      endPoint: `/menu-list/1`,
    } as HttpProps,
    getReview: {
      method: "get",
      endPoint: `/review-list/1`,
    } as HttpProps,
    toggleFavorite: {
      method: "post",
    } as HttpProps,
    reviews: {
      method: "post",
      // endPoint: `/place/2/reviews`,
    } as HttpProps,
  },
  getCategories: { method: "get", endPoint: `/categories` } as HttpProps,
  uploadFile: { method: "post", endPoint: `/file` } as HttpProps,
};
