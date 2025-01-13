import { Form, NavLink } from 'react-router-dom'
import logomark from '../assets/logomark.svg'
import PropTypes from 'prop-types'
import { TrashIcon } from '@heroicons/react/24/solid'

const Nav = ({userName}) => {
  return (
    <nav>
      <NavLink to="/" aria-label="Home">
        <img src={logomark} height={30} />
        <span>HomeBudget</span>
      </NavLink>
      {
        userName && (
          <div>
            <Form
              method="POST"
              action="/logout"
              onSubmit={e => {
                if(!confirm("Delete user and all Data?")) {
                  e.preventDefault()
                }
              }}
            >
              <button type="submit" className='btn btn--warning'>
                <span>Delete User</span>
                <TrashIcon width={20} />
              </button>
            </Form>
          </div>
        )
      }
    </nav>
  )
}
Nav.propTypes = {
  userName: PropTypes.string.isRequired,
}

export default Nav