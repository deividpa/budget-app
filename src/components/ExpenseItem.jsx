import PropTypes from 'prop-types';
import { formatCurrency, formatDate, getAllMatchingBudgets } from '../../helpers';
import { Link } from 'react-router-dom';

const ExpenseItem = ({expense}) => {

  const { name, amount,  createdAt} = expense;

  const budget = getAllMatchingBudgets({
    category: "budgets",
    key: "id",
    value: expense.budgetId,
  })[0];

  console.log("Budget: ", budget)

  return (
    <>
      <td>{name}</td>
      <td>{formatCurrency(amount)}</td>
      <td>{formatDate(createdAt)}</td>
      <td><Link to={`/budget/${budget.id}`} style={{"--accent": budget.color}}>{budget.name}</Link></td>
    </>
  )
}

ExpenseItem.propTypes = {
  expense: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    createdAt: PropTypes.number.isRequired,
    amount: PropTypes.number.isRequired,
    budgetId: PropTypes.string.isRequired,
  }).isRequired,
};

export default ExpenseItem