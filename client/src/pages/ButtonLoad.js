import React, { useContext, useState, useTransition, Link, useEffect } from 'react'
import {Button, Card, Container, Form, Row} from 'react-bootstrap';
import { NavLink,useLocation, useNavigate, useParams } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, START_ROUTE } from '../utils/consts';
import { login, registration } from '../http/userAPI';
import { Context } from '..';
import {observer} from 'mobx-react-lite'
import { fetchOneFile } from '../http/fileAPI';
import axios from 'axios';
const ButtonLoad = ({unicId,children}) => {
    
    const [src, setSrc] = useState('');
    const [self, setSelf] = useState(null);
    useEffect(() =>{
        const getData = async () => {
            const response=await axios.get('http://localhost:5000/api/file/2')
            setSrc(`http://localhost:5000/api/${response.data.file}`);
            setSelf(document.getElementById(unicId));
          }
          getData();
    },[])
    
    const handleClickDownload = (e) => {
        e.preventDefault();
          self?.dispatchEvent(new MouseEvent('click'));
    };
    return (
        <>
            <Button 
            className='mb-2 rounded-5' variant={'warning'} 
            onClick={handleClickDownload}>{children}</Button>
                <a
                    download={`loginom_cource_file_${new Date()}.xlsx`}
                    href={src}
                    id={`${unicId}`}
                />
        
        </>
    );
};
export default ButtonLoad