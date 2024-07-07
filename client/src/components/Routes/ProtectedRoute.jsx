import {useDispatch} from 'react-redux'
import { useEffect } from 'react';
import API from '../../services/API';
import { getCurrentUser } from '../../redux/features/auth/authActions';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({children}) {

    const dispatch = useDispatch();

    //get current user
    const getUser = async () => {
        try {
            const {data} = await API.get('/auth/current-user');
            if(data?.success){
                dispatch(getCurrentUser(data))
            }
        } catch (error) {
            localStorage.clear();
            console.log(error)
        }
    }

    useEffect(() => {
        getUser()
        // eslint-disable-next-line
    },[])

  if( localStorage.getItem('token')){
    return children       //if user is logged in then show the children means HomePage
  }else{
    return <Navigate to="/login" />
  }
}

export default ProtectedRoute
