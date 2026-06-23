import Paragraph from '../../typography/paragraph/Paragraph';

const stats = [
  {
    value: '15+',
    label: (
      <>
        Years of <span className='block'>Experience</span>
      </>
    ),
  },
  {
    value: '200+',
    label: (
      <>
        Projects Completed <span className='block'>in 30+ Countries</span>
      </>
    ),
  },
];

const StatsGrid = () => {
  return (
    <div className='grid grid-cols-[max-content_max-content] gap-8'>
      {stats.map((stat) => (
        <div key={stat.value} className='flex w-max flex-col gap-2'>
          <span className='text-5xl font-light text-primary'>{stat.value}</span>
          <Paragraph className='text-sm uppercase text-title'>
            {stat.label}
          </Paragraph>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
