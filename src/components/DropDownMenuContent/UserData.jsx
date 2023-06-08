import React, { useEffect, useState } from 'react';

import Button from '../UI/Button';
import SectionTitle from '../UI/SectionTitle';
import ChangePassword from './ChangePassword';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase';

import './UserData.css';

const UserData = () => {
  const { currentUser, isEmployee } = useAuth();
  const [employeeId, setEmployeeId] = useState('');
  const [showChangePassword, setShowChangePassword] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser && isEmployee) {
        try {
          const userRef = db.collection('users').doc(currentUser.email);
          const doc = await userRef.get();
          if (doc.exists) {
            const userData = doc.data();
            setEmployeeId(userData.idOfEmployee);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [currentUser, isEmployee]);

  const handleShowChangePassword = () => {
    setShowChangePassword(true);
  };

  return (
    currentUser && (
      <div className='section'>
        <SectionTitle title='Ustawienia konta' />
        <div className='user-data'>
          <i className='fa-regular fa-user user-data__icon'></i>
          <h3 className='user-data__title'>{isEmployee ? 'Pracownik Kina Klatka' : 'Koneser Kina Klatka'}</h3>
          <div className='user-data__box'>
            <p className='user-data__box-title'>Imię:</p>
            <p className='user-data__box-value'>{currentUser.displayName.split(' ')[0]}</p>
          </div>
          <div className='user-data__box'>
            <p className='user-data__box-title'>Nazwisko:</p>
            <p className='user-data__box-value'>{currentUser.displayName.split(' ')[1]}</p>
          </div>
          <div className='user-data__box'>
            <p className='user-data__box-title'>Email:</p>
            <p className='user-data__box-value'>{currentUser.email}</p>
          </div>
          {isEmployee && employeeId && (
            <div className='user-data__box'>
              <p className='user-data__box-title'>Identyfikator pracownika:</p>
              <p className='user-data__box-value'>{employeeId}</p>
            </div>
          )}
          {!showChangePassword && (
            <Button className='user-data__button' onClick={handleShowChangePassword}>
              Zmień hasło
            </Button>
          )}
          {showChangePassword && <ChangePassword />}
        </div>
      </div>
    )
  );
};

export default UserData;
