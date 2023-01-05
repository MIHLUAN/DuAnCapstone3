//rxslice
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { history } from '../../index';
import { ACCESS_TOKEN, getStore, getStoreJson, http, saveStore, saveStoreJson, USER_LOGIN } from '../../util/config';

const initialState = {
    userLogin: getStoreJson(USER_LOGIN),
    userProfile: {},
    userRegister:null,
    userUpdateProfile:{}
}

const userReducer = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {
        loginAction: (state, action) => {
            state.userLogin = action.payload;
        },
        getProfileAction: (state,action) => {
            state.userProfile = action.payload
        },
        registerAction:(state,action)=>{
            state.userRegister=action.payload
        },
        updateProfileAction:(state,action)=>{
            state.userUpdateProfile=action.payload
        }
    }
});

export const { loginAction,getProfileAction,registerAction,updateProfileAction } = userReducer.actions

export default userReducer.reducer

/* async action */
//userLogin = {email,password}
export const loginApi = (userLogin) => {
    return async dispatch => {
        const result = await http.post('/api/Users/signin',userLogin);
        console.log('obDangNhap', result.data.content);
        //Cập nhật cho reducer
        const action = loginAction(result.data.content);
        dispatch(action);
        //Lưu localstorage
        saveStoreJson(USER_LOGIN, result.data.content);
        saveStore(ACCESS_TOKEN, result.data.content.accessToken);
        //Gọi axios lấy dữ liệu api từ token  
        //Gọi api getprofile
        const actionGetProfile = getProfileAction();
        dispatch(actionGetProfile);
        alert('Dang nhap thanh cong!')
        history.push('/profile');
    }
}

export const registerApi=(userRegister)=>{
    return async dispatch=>{
        const result=await http.post('/api/Users/signup',userRegister)
        console.log('obDangKy', result.data);
        const action = registerAction(result.data.content);
        dispatch(action);
        alert('Dang ki thanh cong!')
        history.push('/login');
    }
}
export const updateProfileApi=(userRegister)=>{
    return async dispatch=>{
        const result=await http.post('/api/Users/updateProfile',userRegister)
        console.log('obUpdateProfile', result.data);
        const action = updateProfileAction(result.data.content);
        dispatch(action);
        alert('Update thanh cong!')
        history.push('/profile');
    }
}
export const getProfileApi = () => {
    return async dispatch => {
        const result = await http.post('/api/Users/getProfile')
        //Sau khi lấy dữ liệu từ api về đưa lên reducer qua action creator 
        const action = getProfileAction(result.data.content);
        dispatch(action);


    }
}