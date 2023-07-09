import { CSSProperties, ReactNode, forwardRef, useState } from "react";

interface Props {
  children: ReactNode;
  style: CSSProperties;
}
type Ref = HTMLDivElement;

const CustomSquareRenderer = forwardRef<Ref, Props>((props, ref) => {
  const { children, style } = props;
  const [clicked, setclicked] = useState(false);
  const [mouseDown, setmouseDown] = useState(false);

  return (
    <div
      ref={ref}
      style={style}
      className={clicked ? "custom-square--active" : "custom-square"}
      onContextMenu={() => {
        if (mouseDown) {
          setclicked(!clicked);
          setmouseDown(false);
        }
      }}
      onMouseDown={() => setmouseDown(true)}
      onMouseLeave={() => setmouseDown(false)}
    >
      {children}
    </div>
  );
});

export default CustomSquareRenderer;
