import "./paint-container.scss";

export function PaintContainer(props) {
  return (
    <section className="grid-container">
      {props.data.map((paint, index) => {
        var author;
        var location;
        props.authors.forEach((element) => {
          if (element.value === paint.authorId) {
            author = element.label;
          }
        });
        props.locations.forEach((element) => {
          if (element.value === paint.locationId) {
            location = element.label;
          }
        });
        return (
          <div className={"grid"} key={index}>
            <img
              className="image"
              src={"https://test-front.framework.team" + paint.imageUrl}
              alt={paint.name}
            ></img>
            <div className="text-container">
              <p className="image-text">{paint.name}</p>
              <span className="image-text ">
                <span className="image-text-title">Author:</span>
                <span className="image-text-main">{author}</span>
              </span>
              <p className="image-text image-text-title">
                Created:
                <span className="image-text-main">{paint.created}</span>
              </p>
              <p className="image-text image-text-title">
                Location:
                <span className="image-text-main">{location}</span>
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
}
