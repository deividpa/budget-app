import PropTypes from 'prop-types';
import { calculateSpentByBudget, formatCurrency, formatPercentage } from '../../helpers';

const BudgetItem = ({budget}) => {

  const {id, name, amount, color} = budget;
  const spent = calculateSpentByBudget(id);

  return (
    <div 
      className="budget"
      style={{
        "--accent": color
      }}
    >
      <div className="progress-text">
        <h3>{name}</h3>
        <p>{formatCurrency(amount)} Budgeted</p>
      </div>
      <progress max={amount} value={spent}>
        {formatPercentage(spent / amount)}
      </progress>
      <div className="progress-text">
        <small>{formatCurrency(spent)} spent</small>
        <small>{formatCurrency(amount - spent)} remaining</small>
      </div>
    </div>
  )
}

BudgetItem.propTypes = {
  budget: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired
  }).isRequired
};

export default BudgetItem