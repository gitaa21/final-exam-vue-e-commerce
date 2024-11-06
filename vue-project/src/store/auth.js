import axios from "axios";
import Cookies from "js-cookie";
export default {
    namespaced: true,
    state() {
        return {
            token: null,
            tokenExpirationDate: null,
            userLogin: {},
            isLogin: false,
        }
    },
    mutations: {
        setToken(state, { idToken, expiresIn }) {
            state.token = idToken;
            state.tokenExpirationDate = expiresIn;
            Cookies.set("tokenExpirationDate", expiresIn);
            Cookies.set("jwt", idToken);
        },

        setUserLogin(state, { userData, loginStatus }) {
            state.userLogin = userData;
            state.isLogin = loginStatus;
        },

        setUserLogout(state) {
            state.token = null
            state.userLogin = {}
            state.isLogin = false
            state.tokenExpirationDate = null
            Cookies.remove("jwt");
            Cookies.remove("tokenExpirationDate");
            Cookies.remove("UID");
        },

        updateUserImage(state, newImage) {
            state.userLogin.imageLink = newImage;
          },
          
          updateUserProfile(state, updatedData) {
            state.userLogin.fullname = updatedData.fullname;
            state.userLogin.username = updatedData.username;
            state.userLogin.email = updatedData.email;
          },
    },
    actions: {
        async getRegisterData({ commit, dispatch }, payload) {
            const { email, password, fullname, username, imageLink } = payload;
            if (!email || !password || !fullname || !username) {
                throw new Error("Semua field harus diisi.");
            }
        
            const APIkey = "AIzaSyDXEk5ABsLIfhsZWzqCtDTKCbGGhAOu9SA";
            const authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
            try {
                const { data } = await axios.post(authUrl + APIkey, {
                    email: payload.email,
                    password: payload.password,
                    returnSecureToken: true,
                });
        
                commit("setToken", {
                    idToken: data.idToken,
                    expiresIn: new Date().getTime() + Number.parseInt(data.expiresIn) * 1000
                });
        
                const newUserData = {
                    userId: data.localId, 
                    fullname: payload.fullname, 
                    username: payload.username,
                    email: payload.email, 
                    imageLink: payload.imageLink,
                };
        
                Cookies.set("UID", newUserData.userId);
                await dispatch("addNewUser", newUserData);
        
                return data;
            } catch (err) {
                throw new Error("Pendaftaran gagal: ");
            }
        },
        

        async addNewUser({ commit, state }, payload) {
            try {
                const { data } = await axios.put(
                    `https://e-commerce-89ceb-default-rtdb.firebaseio.com/users/${payload.userId}.json?auth=${state.token}`, payload
                );
                commit("setUserLogin", {userData: payload, loginStatus: true})
            } catch (err) {
                console.log(err);
            }
        },

        async getLoginData({ commit, dispatch }, payload) {
            const { email, password } = payload;
            if (!email || !password) {
                throw new Error("Email dan Password Harus Diisi.");
            }
        
            const APIkey = "AIzaSyDXEk5ABsLIfhsZWzqCtDTKCbGGhAOu9SA";
            const authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
            try {
                const { data } = await axios.post(authUrl + APIkey, {
                    email: payload.email,
                    password: payload.password,
                    returnSecureToken: true,
                });
        
                commit("setToken", {
                    idToken: data.idToken,
                    expiresIn: new Date().getTime() + Number.parseInt(data.expiresIn) * 1000
                });
        
                await dispatch("getUser", data.localId);
        
                return data;
            } catch (err) {
                throw new Error( "Email atau Password Anda Salah");
            }
        },
        

        async getUser({ commit }, payload) {
            try {
                const { data } = await axios.get(
                    `https://e-commerce-89ceb-default-rtdb.firebaseio.com/users.json`
                )
                for (let key in data) {
                    if (data[key].userId === payload) {
                        Cookies.set("UID", data[key].userId)
                        commit("setUserLogin", { userData: data[key], loginStatus: true })
                    }
                }
            
            } catch (err) {
                console.log(err);
            }
        },

        async updateUserEmail({ state, dispatch }, payload) {
            const APIkey = "AIzaSyDXEk5ABsLIfhsZWzqCtDTKCbGGhAOu9SA";
            const authUrl =
              'https://identitytoolkit.googleapis.com/v1/accounts:update?key='
      
            try {
              const { data } = await axios.post(authUrl + APIkey, {
                idToken: state.token,
                email: payload.email,
                returnSecureToken: true,
              })

              const newUpdateData = {
                userId: data.localId,
                fullname: payload.fullname,
                username: payload.username,
                email: payload.email,
                imageLink:
                  payload.imageLink
              }
      
              await dispatch('updateUser', { newUpdateData })
            } catch (err) {
              console.log('Error updating email:', err)
            }
          },
          async updateUser({ dispatch, rootState }, { newUpdateData }) {
            try {
              const { data } = await axios.put(
                `https://e-commerce-89ceb-default-rtdb.firebaseio.com/users/${newUpdateData.userId}.json?auth=${rootState.auth.token}`, newUpdateData
              )
      
              await dispatch('getUser', data.userId)
            } catch (err) {
              console.log(err)
            }
        },
            async updatePassword({ state }, { oldPassword, newPassword }) {
              const APIkey = "AIzaSyDXEk5ABsLIfhsZWzqCtDTKCbGGhAOu9SA"; 
              const authUrl =
                "https://identitytoolkit.googleapis.com/v1/accounts:update?key=";
        
              try {
                const { data } = await axios.post(authUrl + APIkey, {
                  idToken: state.token,
                  password: newPassword,
                  returnSecureToken: true,
                });
                console.log("Password updated successfully");
                return data;
              } catch (err) {
                console.error("Error updating password:");
              }
            },
          },
    }