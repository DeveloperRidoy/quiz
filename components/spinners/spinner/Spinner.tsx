import styles from './spinner.module.css';

const Spinner: React.FC<{ className?: string }> = ({ className }) => {
  const childs: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  
  const childClass = (n: number): string => `${styles['sk-cube']} ${styles[`sk-cube${n}`]}`;
  return (
    <div className={className}>
      <div className={styles['sk-cube-grid']}>
        {childs.map(child => <div key={child} className={childClass(child)}></div> )}
      </div>
  </div>
  )
};

export default Spinner;
