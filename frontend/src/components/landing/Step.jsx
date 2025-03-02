function Step({ number, title, desc }) {
  return (
    <div className='text-center w-64'>
      <div className='text-5xl font-bold text-blue-600'>{number}</div>
      <h3 className='text-2xl font-semibold mt-2'>{title}</h3>
      <p className='text-gray-600 mt-2'>{desc}</p>
    </div>
  );
}
export default Step;
