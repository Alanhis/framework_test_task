import { Responsive as ResponsiveGridLayout } from "react-grid-layout";

export function PaintContainer(props) {
  return (
    <section>
      <ResponsiveGridLayout
        className="layout"
        //   layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      ></ResponsiveGridLayout>
    </section>
  );
}
