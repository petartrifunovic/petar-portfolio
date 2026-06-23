type CopyrightProps = {
  className?: string;
};

const Copyright = ({ className = '' }: CopyrightProps) => {
  const year = new Date().getFullYear();

  return (
    <span className={`text-muted text-sm ${className}`}>
      © {year} Petar Trifunovic. All Rights Reserved
    </span>
  );
};

export default Copyright;
