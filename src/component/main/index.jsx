import { Input, Select, Pagination, Button } from "antd";
import { getAuthor, getLocation, getPaints } from "../../utils/api";
import { useEffect, useState } from "react";
import { PaintContainer } from "./paint-container";
export function MainComp() {
  const [authorlist, setAuthorList] = useState([]);
  const [author, setAuthor] = useState();
  const [locationlist, setLocationList] = useState([]);
  const [location, setLocation] = useState();
  const [name, setName] = useState();
  const [startYear, setStartYear] = useState();
  const [endYear, setEndYear] = useState();
  const [paints, setPaints] = useState([]);
  const [selectedPaints, setSelectedPaints] = useState([]);
  const [page, setPage] = useState(1);
  let lastPage = 0;

  // Подгрузка первычных элементов от api
  useEffect(() => {
    getAuthor().then((data) => {
      data.map((author) => {
        setAuthorList((oldArray) => [
          ...oldArray,
          { value: author.id, label: author.name },
        ]);
      });
      getLocation().then((data) => {
        data.map((location) => {
          setLocationList((oldArray) => [
            ...oldArray,
            { value: location.id, label: location.location },
          ]);
        });
      });
      getPaints("").then((result) => setPaints(result));
    });
  }, []);
  useEffect(() => {
    let params = {};
    let selected = params;
    if (author) {
      params.authorId = author;
    }
    if (location) {
      params.locationId = location;
    }
    if (name) {
      params.q = name;
    }
    if (startYear) {
      selected._gte = startYear;
    }
    if (endYear) {
      selected._lte = endYear;
    }
    getPaints(params).then((result) => setPaints(result));

    if (page) {
      params._page = page;
    }
    getPaints(selected).then((result) => setSelectedPaints(result));
  }, [author, location, name, page, startYear, endYear]);

  return (
    <main>
      <div>
        <Input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Select
          defaultValue=""
          style={{ width: 120 }}
          options={authorlist}
          onChange={(id) => {
            setAuthor(id);
          }}
        />
        <Select
          defaultValue=""
          style={{ width: 120 }}
          options={locationlist}
          onChange={(id) => {
            setLocation(id);
          }}
        />
        <Select
          defaultValue=""
          style={{ width: 120 }}
          dropdownRender={(menu) => (
            <>
              <Input
                value={startYear}
                onChange={(e) => {
                  setStartYear(e.target.value);
                }}
              />
              -
              <Input
                value={endYear}
                onChange={(e) => {
                  setEndYear(e.target.value);
                }}
              />
            </>
          )}
        />
      </div>
      <PaintContainer data={selectedPaints} />
      <div>
        <Button
          disabled={page === 1}
          type="text"
          onClick={() => {
            setPage(1);
          }}
        >
          {"<<"}
        </Button>
        <Pagination
          current={page}
          total={paints?.length}
          pageSize={12}
          onChange={(page) => {
            setPage(page);
          }}
        />
        <Button
          disabled={page === Math.ceil(paints?.length / 12)}
          type="text"
          onClick={() => {
            setPage(Math.ceil(paints?.length / 12));
          }}
        >
          {">>"}
        </Button>
      </div>
    </main>
  );
}
