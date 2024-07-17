import axios from 'axios';

export function storeExpense(expenseData){
    axios.post('https://react-native-expenseapp-77bc8-default-rtdb.europe-west1.firebasedatabase.app/expenses.json',
        expenseData
    );
}