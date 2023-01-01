import React from 'react';
import PropTypes from 'prop-types';
import css from './ContactItem.module.css';

const ContactItem = ({ item, onDeleteClick }) => (
  <div className={css.contactItem}>
    {item.name}: <span>{item.number}</span>
    <button
      className={css.button}
      type="button"
      onClick={() => onDeleteClick(item.id)}
    >
      Delete
    </button>
  </div>
);

export default ContactItem;

ContactItem.propTypes = {
  item: PropTypes.object.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};
