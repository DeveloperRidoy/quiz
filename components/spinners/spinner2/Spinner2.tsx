import styles from './spinner2.module.css';

const Spinner2 = () => {
  return (
    <div className={`${styles['lds-ring']}`}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
};

export default Spinner2;
