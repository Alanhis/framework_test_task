import { Input, Select, Pagination, Button } from "antd";
import { getAuthor, getLocation, getPaints } from "../../utils/api";
import React, { useEffect, useState } from "react";
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

  // Подгрузка первычных элементов от api
  useEffect(() => {
    //Загрузка списка авторов
    getAuthor().then((data) => {
      data.forEach((author) => {
        setAuthorList((oldArray) => [
          ...oldArray,
          { value: author.id, label: author.name },
        ]);
      });
      //Загрузка списка музеев (?)
      getLocation().then((data) => {
        data.forEach((location) => {
          setLocationList((oldArray) => [
            ...oldArray,
            { value: location.id, label: location.location },
          ]);
        });
      });
      //Самые начальные картины
      getPaints("").then((result) => setPaints(result));
    });
  }, []);
  // Подгрузка картин с использованием фильтрации
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
      selected.created_gte = startYear;
    }
    if (endYear) {
      selected.created_lte = endYear;
    }
    getPaints(params).then((result) => setPaints(result));

    if (page) {
      params._page = page;
    }
    getPaints(selected).then((result) => setSelectedPaints(result));
  }, [author, location, name, page, startYear, endYear]);

  return (
    <main>
      {/* Компонент фильтрации */}
      <div className="filter-container">
        <Input
          placeholder="Name"
          className="selector"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setPage(1);
          }}
        />
        <Select
          allowClear
          placeholder="Author"
          className="selector"
          options={authorlist}
          onChange={(id) => {
            setAuthor(id);
            setPage(1);
          }}
        />
        <Select
          allowClear
          placeholder="Location"
          className="selector"
          options={locationlist}
          onChange={(id) => {
            setLocation(id);
            setPage(1);
          }}
        />
        <Select
          className="selector"
          placeholder="Created"
          dropdownRender={() => (
            <div className="year-container">
              <Input
                placeholder="from"
                className="select-year"
                value={startYear}
                onChange={(e) => {
                  setStartYear(e.target.value);
                  setPage(1);
                }}
              />
              <hr className="line" />
              <Input
                placeholder="before"
                className="select-year"
                value={endYear}
                onChange={(e) => {
                  setEndYear(e.target.value);
                  setPage(1);
                }}
              />
            </div>
          )}
        />
      </div>
      {/* Сам список картин */}
      <PaintContainer
        data={selectedPaints}
        authors={authorlist}
        locations={locationlist}
      />
      {/* Переключатель между страницами */}
      <div className="select-button">
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
