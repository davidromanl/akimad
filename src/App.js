import Logo from "./img/logo.png";
import { useState } from "react";
import { Row, Col, Input, Button, Divider } from "antd";
import Users from "./components/Users";
import UserDetails from "./components/UserDetails";
import "./App.css";

function App() {
  //const data = ["uno", "dos", "tres"];

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [search, setSearch] = useState("David");
  const [total, setTotal] = useState(0);

  const onChangeSearch = ({ target }) => {
    setSearch(target.value);
  };

  const getApi = async () => {
    const url = `https://api.github.com/search/users?q=${search}&page=1`;
    const api = await fetch(url);
    const { items, total_count } = await api.json();
    setUsers(items);
    setTotal(total_count);
  };

  return (
    <div className="App">
      <img src={Logo} alt="Logo"/>
      <p>
        Search User API GitHub -<small>by @davidromanl</small>
      </p>
      <Row justify="center">
        <Col span={8}>
          <Input
            value={search}
            onChange={onChangeSearch}
            placeholder="Nombre de usuario"
          />
        </Col>
        <Col>
          <Button disabled={!search.length} onClick={getApi} type="primary">
            Buscar
          </Button>
          <span>  - Total: {total}</span>
        </Col>
      </Row>
      <Divider />
      <Row gutter={[16, 20]} justify="center">
        <Col span={20}>
          <Users setUser={setUser} users={users} />
        </Col>
      </Row>
      <UserDetails setUser={setUser} user={user} />
    </div>
  );
}

export default App;
