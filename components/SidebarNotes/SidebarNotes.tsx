import Link from 'next/link';
import css from './SidebarNotes.module.css';

const tags: string[] = [
  'All notes',
  'Todo',
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
];

const SidebarNotes = () => {
  return (
    <ul className={css.menuList}>
      {tags.map((item, index) => {
        return (
          <li key={index} className={css.menuItem}>
            <Link href={`/notes/filter/${item}`} className={css.menuLink}>
              {item}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default SidebarNotes;
