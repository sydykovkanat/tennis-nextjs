export const CardInfoRow = ({ label, value }: { label: string; value: string | number }) => (
  <div className='flex gap-3'>
    <span>{label}</span>
    <span className='text-black'>{value}</span>
  </div>
);
