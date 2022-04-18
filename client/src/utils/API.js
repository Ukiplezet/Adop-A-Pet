/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const BASE_URL = "http://localhost:5500";

export default {
  getAllPets: async () => {
    const response = await axios.get(`${BASE_URL}/pet`);
    return response.data;
  },

  getPetById: async (petId, token) => {
    const response = await axios.get(`${BASE_URL}/pet/:id`, { petId, token });
    return response;
  },

  postPet: async (petData) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${BASE_URL}/pet`,
      { petData, token: token },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  },

  deletePet: async (userId, pet) => {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${BASE_URL}/pet/${pet._id}/save`, {
      data: { token: token, userId: userId, pet: pet },
    });
    return response;
  },

  returnPet: async (user, pet) => {
    const userId = user._id;
    const token = localStorage.getItem("token");
    await axios.post(`${BASE_URL}/pet/${pet._id}/return`, {
      token,
      userId,
      pet,
    });
  },

  deletePetFromDB: async (user, pet) => {
    const token = localStorage.getItem("token");
    const petId = pet._id;
    const role = user.role;
    const response = await axios.put(
      `${BASE_URL}/pet/${pet._id}/delete`,
      {
        token: token,
        petId,
        role,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  },

  editPet: async (petData, user) => {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${BASE_URL}/pet/${petData.id}`,
      { petData, token: token, admin: user.role },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  },

  getPetByCriteria: async (petData) => {
    const response = await axios.get(`${BASE_URL}/pet/${petData}`, { petData });
    return response;
  },

  adoptOrFosterPet: async (status, pet, user) => {
    const userId = user._id;
    const token = localStorage.getItem("token");
    const response = await axios.post(`${BASE_URL}/pet/${pet._id}/adopt`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      pet,
      token,
      userId,
      status,
    });
    return response;
  },

  savePet: async (petData, user) => {
    const userId = user._id;
    const token = localStorage.getItem("token");
    const response = await axios.post(`${BASE_URL}/pet/${petData._id}/save`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      token,
      userId,
      petData,
    });
    return response;
  },

  getPetByUserId: async (userId) => {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${BASE_URL}/pet/user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      { token: { token } }
    );
    return response.data;
  },
  getAllUsers: async (role) => {
    return axios.post(`${BASE_URL}/user`, { role: role });
  },

  getUserById: async (userId) => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}/user/${userId}`, {
      userId,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  updateUserData: async ({
    firstName,
    lastName,
    email,
    password,
    bio,
    phoneNumber,
    userId,
  }) => {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${BASE_URL}/user/${userId}`,
      {
        firstName,
        lastName,
        email,
        password,
        bio,
        phoneNumber,
        token,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },

  loginUser: async ({ email, password }) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      return alert(error.response.data);
    }
  },

  signUpUser: async ({ firstName, lastName, email, password, phoneNumber }) => {
    try {
      const response = await axios.post(`${BASE_URL}/signup`, {
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
      });

      return response.data;
    } catch (error) {
      return alert(error.response.data);
    }
  },
};
