import PropTypes from 'prop-types';
import { formatCurrency, formatDate, getAllMatchingBudgets } from '../../helpers';
import { Link, useFetcher } from 'react-router-dom';
import { TrashIcon } from '@heroicons/react/24/solid';

const ExpenseItem = ({ expense, showBudget }) => {
  const fetcher = useFetcher();

  const { id, name, amount,  createdAt} = expense;

  const budget = getAllMatchingBudgets({
    category: "budgets",
    key: "id",
    value: expense.budgetId,
  })[0];

  return (
    <>
      <td>{name}</td>
      <td>{formatCurrency(amount)}</td>
      <td>{formatDate(createdAt)}</td>
      {showBudget && (
        <td>
          <Link to={`/budget/${budget?.id}`} style={{"--accent": budget?.color}}>
            {budget?.name}
          </Link>
        </td>
      )}
      <td>
        <fetcher.Form method="post">
          <input type="hidden" name="_action" value="deleteExpense" />
          <input type="hidden" name="expenseId" value={id} />
          <button 
            type="submit" 
            className="btn btn--warning"
            aria-label={`Delete ${name} expense`}
            title={`Delete ${name}`}
          >
            <TrashIcon width={20} />
          </button>
        </fetcher.Form>
      </td>
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
  showBudget: PropTypes.bool,
};

export default ExpenseItem