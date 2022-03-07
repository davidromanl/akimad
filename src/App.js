import Logo from "./img/logo.png";
import { useState } from "react";
import { Row, Col, Input, Button, Divider, Progress } from "antd";
import Users from "./components/Users";
import UserDetails from "./components/UserDetails";
import "./App.css";

// Este es la App DEV - comit pruba

function App() {
  //const data = ["uno", "dos", "tres"];

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [search, setSearch] = useState("David");
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [percent, setPercent] = useState(0);

  const onChangeSearch = ({ target }) => {
    setSearch(target.value);
  };

  const getSearch = ({ key }) => {
    if (key === "Enter" && search.length) getApi();
  };

  const getApi = async () => {
    setPercent(100);
    const url = `https://api.github.com/search/users?q=${search}&page=${page}`;
    const api = await fetch(url);
    const { items, total_count } = await api.json();
    setPercent(0);
    setUsers(items);
    setTotal(total_count);
  };

  return (
    <div className="App">
      <img src={Logo} alt="Logo" />
      <p>
        Search User API GitHub -<small>by @davidromanl</small>
      </p>
      <Row justify="center">
        <Col span={8}>
          <Input
            onKeyPress={getSearch}
            value={search}
            onChange={onChangeSearch}
            placeholder="Nombre de usuario"
          />
        </Col>
        <Col>
          <Button disabled={!search.length} onClick={getApi} type="primary">
            Buscar
          </Button>
          <span> - Total: {total}</span>
        </Col>
      </Row>
      <Progress percent={percent} status="active" showInfo={false} />
      <Divider />
      <Row gutter={[16, 20]} justify="center">
        <Col span={20}>
          <Users setUser={setUser} users={users} />
        </Col>
      </Row>
      <Row gutter={[16, 20]} justify="center">
        <Col>
          <Button
            onClick={() => {
              setPage(page - 1);
              getApi();
            }}
            disabled={page <= 1}
          >
            Anterior
          </Button>
          <Divider type="vertical" />
          <strong>Página:</strong> {page}
          <Divider type="vertical" />
          <Button
            onClick={() => {
              setPage(page + 1);
              getApi();
            }}
          >
            Siguiente
          </Button>
        </Col>
      </Row>
      <UserDetails setUser={setUser} user={user} />
    </div>
  );
}

export default App;
