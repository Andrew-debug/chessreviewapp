const GameIcon = ({
  icon,
  size,
  alt,
}: {
  icon: string;
  size: number;
  alt: string;
}) => {
  return (
    <div style={{ width: size, height: size }}>
      <img
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
        src={icon}
        alt={alt}
      />
    </div>
  );
};

export default GameIcon;
