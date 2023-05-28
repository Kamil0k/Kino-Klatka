import { useState } from 'react';
import Button from '../UI/Button';
import { database } from '../../firebase';
import './ChangeInput.css';

const ChangeInput = (props) => {
  const [inputValue, setInputValue] = useState('');

  const handleSave = () => {

    // Sprawdź, czy wartość inputu jest poprawna (np. czy jest liczbą)

    // Zapisz wartość do bazy danych
    database
      .ref(`ticketsPrice/ticket-${props.index}`)
      .set(inputValue)
      .then(() => {
        console.log(`Ticket-${props.index} saved successfully in Firebase!`);
        props.onCancel(); // Wywołanie funkcji onCancel po zapisaniu lub anulowaniu zmian
      })
      .catch((error) => {
        console.error(`Error saving ticket-${props.index} to Firebase:`, error);
      });
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="change-input">
      <input type="number" value={inputValue} onChange={handleInputChange} />
      <div className="change-input__buttons">
        <Button className="change-input__buttons-btn-save" onClick={handleSave}>
          Zapisz
        </Button>
        <Button className="change-input__buttons-btn-cancel" onClick={props.onCancel}>
          Anuluj
        </Button>
      </div>
    </div>
  );
};

export default ChangeInput;
