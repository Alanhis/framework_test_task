import "./paint-container.css";

export function PaintContainer(props) {
  console.log(props);

  return (
    <section className="grid-container">
      {props.data.map((paint, index) => {
        console.log(index);
        console.log(paint.name);
        return (
          <div className={"grid-" + ((index % 3) + 1)} key={index}>
            <img
              className="image"
              src={"https://test-front.framework.team" + paint.imageUrl}
              alt={paint.name}
            ></img>
            <p className="image-text">{paint.name}</p>
          </div>
        );
      })}
    </section>
  );
}
