import PropTypes from 'prop-types';
import { formatCurrency, formatDate } from '../../helpers';

const ExpenseItem = ({expense}) => {

  const {name, amount, createdAt} = expense;

  return (
    <>
      <td>{name}</td>
      <td>{formatCurrency(amount)}</td>
      <td>{formatDate(createdAt)}</td>
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