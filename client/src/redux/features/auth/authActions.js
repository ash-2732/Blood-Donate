import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/API";
import { toast } from "react-toastify";

export const userLogin = createAsyncThunk(
    'auth/login',
    async ({role , email , password} , {rejectWithValue}) => {
        try {
            const {data} = await API.post(`/auth/login`, {role , email , password});
            //store token in local storage
            if( data.success ){
                localStorage.setItem('token', data.token);
                toast.success(data.message);
                window.location.replace('/');
            }
            return data;
        } catch (error) {
            if(error.response && error.response.data.message){
                return rejectWithValue(error.response.data.message)
            }else{
                return rejectWithValue(error.message)
            }
        }
    }
)

//register user
export const userRegister = createAsyncThunk(
    'auth/register',
    async ({role , email , password , name , organizationName , hospitalName , address , phone , website} , {rejectWithValue}) => {
        try {
            const {data} = await API.post(`/auth/register`, {role , email , password , name , organizationName , hospitalName , address , phone , website});
            //store token in local storage
            if( data.success ){
                toast.success(data.message);
                window.location.replace('/login');
            }
            return data;
        } catch (error) {
            if(error.response && error.response.data.message){
                return rejectWithValue(error.response.data.message)
            }else{
                return rejectWithValue(error.message)
            }
        }
    }
)

//get current user
export const getCurrentUser = createAsyncThunk(
    'auth/getCurrentUser',
    async ({rejectWithValue}) => {
        try {
            const res = await API.get(`/auth/current-user`);     
            if(res.data){
                return res?.data;
            }
            
        } catch (error) {
            console.log(error)
            if(error.response && error.response.data.message){
                return rejectWithValue(error.response.data.message)
            }else{
                return rejectWithValue(error.message)
            }
        }
    }
)