import { createContext, useReducer } from "react";

const DUMMY_EXPENSES =[
    {
      id: 'e1',
      description: 'A new pair of shoes',
      amount:59.99,
      date:new Date('2021-12-19')
    },
    {
      id: 'e2',
      description: 'A new pair of trousers',
      amount:89.99,
      date:new Date('2022-12-19')
    },
    {
      id: 'e3',
      description: 'Some bananas',
      amount:5.99,
      date:new Date('2021-12-01')
    },
    {
      id: 'e4',
      description: 'A book',
      amount:14.99,
      date:new Date('2022-02-19')
    },
    {
      id: 'e5',
      description: 'Another book',
      amount:18.59,
      date:new Date('2022-02-18')
    },
  ]

export const ExpensesContext = createContext({
  expense: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  update: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
        const id= new Date().toString() + Math.random().toString();
        // return [...state, action.payload]; 
        return [{...action.payload, id:id}, ...state]
    case "UPDATE":
        const updatableExpenseIndex= state.findIndex((expense) => expense.id === action.payload.id);
        const updatableExpense = state[updatableExpenseIndex];
        const updateItem = {...updatableExpense, ...action.payload.data};
        const updatedExpenses = {...state};
        updatedExpenses[updatableExpenseIndex] = updateItem;
        return updatedExpenses;
    case "DELETE":
        return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer,DUMMY_EXPENSES);

  function addExpense({ expenseData }) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id,expenseData){
    dispatch({type:'UPDATE', payload:{id:id, data:expenseData}})
  }
  <ExpensesContext.Provider>{children}</ExpensesContext.Provider>;
}

export default ExpensesContextProvider;
