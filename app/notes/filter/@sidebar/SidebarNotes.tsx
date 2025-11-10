import css from './SidebarNotes.module.css';

export default async function SidebarNotes() {
  const tags = ['Work', 'Personal', 'Meeting', 'Shopping', 'Todo'];
  return (
    <div>
      <ul className={css.menuList}>
        <li className={css.menuItem}>
          <a href={`/notes/filter/all`} className={css.menuLink}>
            All notes
          </a>
        </li>
        {tags.map((tag) => (
          <li key={tag} className={css.menuItem}>
            <a href={`/notes/filter/${tag}`} className={css.menuLink}>
              {tag}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
