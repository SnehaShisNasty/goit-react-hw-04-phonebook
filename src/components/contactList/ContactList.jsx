import css from './ContactList.module.css';
export const ContactList = ({ data, onDeleteContact }) => {
  return (
    <ul className={css.list}>
      {data.map(({ name, id, number }) => (
        <li key={id} className={css.item}>
          {name}: {number}
          <button onClick={() => onDeleteContact(id)} className={css.delete}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};
