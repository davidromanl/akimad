import { Row, Col, Tabs, Modal, List } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { useEffect, useState } from "react";

const { TabPane } = Tabs;

export default function Users(props) {
  const [visible, setVisible] = useState(false);
  const [details, setDetails] = useState({});
  const [repos, setRepos] = useState([]);
  const [organ, setOrgan] = useState([]);

  const handleCancel = () => {
    props.setUser({});
    setVisible(false);
  };

  const handleOk = () => {
    props.setUser({});
    setVisible(false);
  };

  const onChangeTab = (e) => {
      console.log(e)
    if (e == 1) getApiDetails(user.url);
    if (e == 2) getApiRepos(user.repos_url);
    if (e == 3) getApiOrgan(user.organizations_url);
  };

  const { user } = props;

  const getApiDetails = async (url) => {
    const api = await fetch(url);
    const details = await api.json();
    setDetails(details);
  };

  const getApiRepos = async (url) => {
    const api = await fetch(url);
    const repos = await api.json();
    setRepos(repos);
  };

  const getApiOrgan = async (url) => {
    const api = await fetch(url);
    const organ = await api.json();
    setOrgan(organ);
  };

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      setVisible(true);
    }
  });

  return (
    <>
      <Modal
        title="Info Usuario"
        visible={visible}
        onCancel={handleCancel}
        onOk={handleOk}
        width="850px"
      >
        <Row gutter={15}>
          <Col>
            <h2>Usuario: @{user.login}</h2>
            <img src={user.avatar_url} alt="avatar" className="Avatar" />
          </Col>
          <Col span={16}>
            <Tabs defaultActiveKey="0" onChange={onChangeTab}>
              <TabPane tab="Info" key="0">
                <div>
                  <p>
                    <strong>Usuario</strong> {user.login}
                  </p>
                  <p>
                    <strong>Enlace</strong>{" "}
                    <a target="_blank" rel="noreferrer" href={user.html_url}>
                      Url GitHub
                    </a>
                  </p>
                </div>
              </TabPane>
              <TabPane tab="Detalles Usuario" key="1">
                <div>
                  <p><strong>Nombre</strong> {details.name}</p>
                  <p><strong>Biografia</strong> {details.bio}</p>
                  <p><strong>Tipo</strong> {details.type}</p>
                  <p><strong>Compañia</strong> {details.company}</p>
                  <p><strong>Blog</strong> {details.blog}</p>
                  <p><strong>Ubicación</strong> {details.location}</p>
                  <p><strong>Seguidores</strong> {details.followers} - <strong>Siguiendo</strong> {details.following}</p>
                </div>
              </TabPane>
              <TabPane tab="Repositorios" key="2">
                <List dataSource={repos} renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            title={item.name}
                            description={item.description}
                        />
                    </List.Item>
                )}></List>
              </TabPane>
              <TabPane tab="Compañias" key="3">
              <List dataSource={organ} renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={item.avatar_url} />}
                            title={item.login}
                            description={item.description}
                        />
                    </List.Item>
                )}></List>
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </Modal>
    </>
  );
}
