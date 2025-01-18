import PropTypes from 'prop-types';

import ExpenseItem from './ExpenseItem';

const Table = ({expenses, showBudget = true}) => {

  // Sort the expenses by date
  const sortedExpenses = expenses.sort((a, b) => b.createdAt - a.createdAt).slice(0, 8);

  return (
    <div className='table'>
      <table>
        <thead>
          <tr>
            {
              ["Name", "Amount", "Date", showBudget ? "Budget" : "", ""].map((header, index) => (
                <th key={index}>{header}</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            sortedExpenses.map((expense) => (
              <tr key={expense.id}>
                <ExpenseItem expense={expense} showBudget={showBudget} />
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    createdAt: PropTypes.number.isRequired,
    amount: PropTypes.number.isRequired,
    budgetId: PropTypes.string.isRequired,
  })).isRequired,
  showBudget: PropTypes.bool,
};

export default Table