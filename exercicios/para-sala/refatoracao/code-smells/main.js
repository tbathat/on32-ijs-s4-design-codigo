function validCard (brand, cardNumbers, installments, dateValidate, cvv,) {
  const [m, y] = dateValidate.split('/');
  const date = new Date();
  const mCurrent = date.getMonth() + 1;
  const yCurrent = date.getFullYear() % 100;
  
  if (brand === 'visa' || brand === 'mastercard' || brand === 'amex') {
    if (brand === 'amex') {
      if (!/^3[47][0-9]{13}$/.test(cardNumbers)) {
        throw new Error('Invalid card number from amex');
      } else if (!/^\d{4}$/.test(cvv)) {
        throw new Error('CVV invalid for Amex');
      }
    } else {
      if (brand === 'visa') {
        if (!/^4[0-9]{15}$/.test(cardNumbers)) {
          throw new Error('Invalid card number from visa');
        } else if (!/^\d{3}$/.test(cvv)) {
          throw new Error('CVV invalid for Visa');
        }
      } else {
        if (brand === 'mastercard') {
          if (!/^5[1-5][0-9]{14}$/.test(cardNumbers)) {
            throw new Error('Invalid card number from mastercard');
          } else if (!/^\d{3}$/.test(cvv)) {
            throw new Error('CVV invalid for Master Card');
          }
        }
      }
    }
    if (installments < 1 || installments > 12) {
      throw new Error('Invalid installment count');
    } else if (parseInt(y) < yCurrent || (parseInt(y) === yCurrent && parseInt(m) < mCurrent)) {
      throw new Error('Expired card');
    }

    return true;
  } else {
    throw new Error('Invalid card brand');
  }
}

function checkErrorMessage(error, desireMessage) {
  if (error.message === desireMessage) {
    console.log('Teste passou');
  } else {
    console.error('Teste falhou', error.message);
  }
}

function testToBe(func, valorEsperado) {
  if (func === valorEsperado) {
    console.log('Teste passou');
  } else {
    console.error('Teste falhou');
  }
}

function testCardValidate() {
  // Throws expcetion when card date year is less than current year
  try {
    validCard('visa', '4111 1111 1111 111', '4111111111111111', 3, '12/22', '123')
  } catch (error) {
    checkErrorMessage(error, 'Expired card');
  }

  // Throws expcetion when card date month is less than current month
  try {
    validCard('visa', '4111 1111 1111 111', '4111111111111111', 3, '05/24', '123')
  } catch (error) {
    checkErrorMessage(error, 'Expired card');
  }
}

function testCardNumber() {
  // Throws exception when the AMEX CVV number is not 4 digits
  try {
    validCard('amex', '3415 717697 04121', '341571769704121', 3, '12/22', '123')
  } catch (error) {
    checkErrorMessage(error, 'CVV invalid for Amex');
  }

  // Throws exception when the Visa CVV number is not 3 digits
  try {
    validCard('visa', '4111 1111 1111 111', '4111111111111111', 3, '12/22', '1233')
  } catch (error) {
    checkErrorMessage(error, 'CVV invalid for Visa');
  }

  // Throws exception when the Master card CVV number is not 3 digits
  try {
    validCard('mastercard', '5264 4544 7891 3451', '5264454478913451', 3, '12/24', '12332')
  } catch (error) {
    checkErrorMessage(error, 'CVV invalid for Master Card');
  }

  // Throws exception whe Amex card not start with 3
  try {
    validCard('amex', '4415 717697 04121', '441571769704121', 3, '12/24', '123')
  } catch (error) {
    checkErrorMessage(error, 'Invalid card number from amex');
  }

  // Throws exception whe Visa card not start with 4
  try {
    validCard('visa', '5111111111111111', '5111111111111111', 3, '12/24', '1231')
  } catch (error) {
    checkErrorMessage(error, 'Invalid card number from visa');
  }

  // Throws exception whe Master card not start with 5
  try {
    validCard('mastercard', '6264 4544 7891 3451', '6264454478913451', 3, '12/24', '1231')
  } catch (error) {
    checkErrorMessage(error, 'Invalid card number from mastercard');
  }
}

function testCardBrand() {
  // throws an exception when card brand is invalid
  try {
    validCard('senff', '4111 1111 1111 111', '4111111111111111', 3, '12/24', '123')
  } catch (error) {
    checkErrorMessage(error, 'Invalid card brand');
  }
}

function testInstalmments() {
  // throws an exception when installments is less than 1
  try {
    validCard('visa', '4111 1111 1111 111', '4111111111111111', 0, '12/24', '123')
  } catch (error) {
    checkErrorMessage(error, 'Invalid installment count');
  }

   // throws an exception when installments is greater than 12
   try {
    validCard('visa', '4111 1111 1111 111', '4111111111111111', 13, '12/24', '123')
  } catch (error) {
    checkErrorMessage(error, 'Invalid installment count');
  }
}

testToBe(validCard('visa', '4111 1111 1111 111', '4111111111111111', 3, '12/24', '123'), true);
testToBe(validCard('mastercard', '5264 4544 7891 3451', '5264454478913451', 3, '12/24', '123'), true);
testToBe(validCard('amex', '3415 717697 04121', '341571769704121', 3, '12/24', '1234'), true);
testCardValidate();
testCardBrand();
testCardNumber();
testInstalmments();