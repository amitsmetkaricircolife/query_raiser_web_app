import axiosInstance from "./axiosInstance";

export const AllService = {
  getCustomerDataFilter: async (data) => {
    const response = await axiosInstance.get(`/api/queryApi/${data}`);
    return response.data;
  },

  getCustomerData: async (customerId) => {
    const response = await axiosInstance.get(
      `/api/queryApi/customerData/${customerId}`
    );
    return response.data;
  },

  getDeviceDataFromAddressId: async (addressId) => {
    const response = await axiosInstance.get(
      `/api/queryApi/addressToDeviceData/${addressId}`
    );
    return response.data;
  },

  createNewAddress: async (customerId, data) => {
    const response = await axiosInstance.post(
      `/api/queryApi/addAddressToCustomer/${customerId}`,
      data
    );
    return response.data;
  },

  getQueryById: async (id) => {
    const response = await axiosInstance.get(
      `/api/queryApi/getMyQueries/${id}`
    );
    return response.data;
  },

  createQuery: async (data) => {
    const response = await axiosInstance.post(`/api/queryApi/raiseQuery`, data);
    return response.data;
  },
};
