import PropTypes from 'prop-types';

import ExpenseItem from './ExpenseItem';

const Table = ({expenses}) => {

  // Sort the expenses by date
  const sortedExpenses = expenses.sort((a, b) => b.createdAt - a.createdAt).slice(0, 8);

  return (
    <div className='table'>
      <table>
        <thead>
          <tr>
            {
              ["Name", "Amount", "Date"].map((header, index) => (
                <th key={index}>{header}</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            sortedExpenses.map((expense) => (
              <tr key={expense.id}>
                <ExpenseItem expense={expense} />
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
};

export default Table